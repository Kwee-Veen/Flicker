import React, { useContext, useEffect } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries, UseQueryResult } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromMustWatchMovies from "../components/cardIcons/removeFromMustWatchMovies";
import WriteReview from "../components/cardIcons/writeReview";
import { supabase } from "../supabaseClient";
import { getMustWatchMovieIDs } from "../api/supabase-db";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatchMovieIDs, setMustWatchMovieIDs } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering( [titleFiltering, genreFiltering] );
  document.title = `Must Watch Movies`

 // Function that queries the DB for IDs of movieFavourites and assigns the results to movieFavouriteIDs (in movieContext) 
 const loadMustWatchMovies = () => {
  getMustWatchMovieIDs().then(x => {
    let temp: number[] = [];
    x.forEach(x => temp.push(x))
    setMustWatchMovieIDs(temp);
  })
}

// loads initial must watch movies (once only)
useEffect(() => { loadMustWatchMovies(); }, []);

// subscribes to the movieFavourites db channel and re-loads must watch movies if there's any db change
supabase.channel('table_db_changes_must_watch_movies').on('postgres_changes', 
  { event: '*', schema: 'public', table: 'mustWatchMovies' }, 
  () => { loadMustWatchMovies(); }).subscribe();

// Create an array of queries and run them in parallel.
let mustWatchMovieQueries: UseQueryResult<any, unknown>[] = [];
if (mustWatchMovieIDs) {
  mustWatchMovieQueries = useQueries(mustWatchMovieIDs.map((movieId: any) => {
    return {
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    };
  })
  );
}

  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatchMovies = mustWatchMovieQueries.map((q) => q.data);
  const displayedMovies = allMustWatchMovies
    .sort((a, b) => a.title.localeCompare(b.title))
    ? filterFunction(allMustWatchMovies)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

    return (
    <>
      <PageTemplate
        title="Must Watch Movies"
        movies={displayedMovies}
        increment={() => {}}
        decrement={() => {}}
        action={(movie) => {
          return (
            <>
              <RemoveFromMustWatchMovies {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
        showSearch={false}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default MustWatchMoviesPage;
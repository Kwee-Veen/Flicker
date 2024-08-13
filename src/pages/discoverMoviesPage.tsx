import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getContent } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { PagesContext } from "../contexts/pagesContext";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovieFavouriteIDs } from "../api/supabase-db";
import { supabase } from "../supabaseClient";
// import Auth from '../auth'
// import Account from '../account'

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

const DiscoverMoviesPage: React.FC = () => {
//   const [session, setSession] = useState<any>(null)

// useEffect(() => {
//   supabase.auth.getSession().then(({ data: { session } }) => {
//     setSession(session)
//   })

//   supabase.auth.onAuthStateChange((_event, session) => {
//     setSession(session)
//   })
// }, [])

const { setMovieFavouriteIDs } = useContext(MoviesContext);
  document.title = `Favourite Movies`

  // Function that queries the DB for IDs of movieFavourites and assigns the results to movieFavouriteIDs (in movieContext) 
  const loadFavourites = () => {
    getMovieFavouriteIDs().then(x => {
      let temp: number[] = [];
      x.forEach(x => temp.push(x))
      setMovieFavouriteIDs(temp);
    })
  }

  // loads initial favourites (once only)
  useEffect(() => { loadFavourites(); }, []);

  // subscribes to the movieFavourites db channel and re-loads favourites if there's any db change
  supabase.channel('table_db_changes').on('postgres_changes', 
    { event: '*', schema: 'public', table: 'movieFavourites' }, 
    () => { loadFavourites(); }).subscribe();

  const { moviesSearchPageCount, incrementMoviesSearchPageCount, decrementMoviesSearchPageCount } = useContext(PagesContext);
  const { genreId, genreLabel, voteAverage, sortBy, sortByLabel} = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering( [titleFiltering, genreFiltering] );
  document.title = `Movies Page ${moviesSearchPageCount}`

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    `Movie of genre: ${genreLabel}, average vote: ${voteAverage}, sorted by ${sortByLabel}, page: ${moviesSearchPageCount}`, 
    () => getContent("movie", moviesSearchPageCount, voteAverage, genreId, sortBy)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      {/* <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div> */}
      <PageTemplate
        title={document.title}
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
        increment={incrementMoviesSearchPageCount}
        decrement={decrementMoviesSearchPageCount}
        showSearch={true}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default DiscoverMoviesPage;
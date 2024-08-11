import React, { useContext, useState } from "react"
import PageTemplate from "../components/templateMovieListPage";
// import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { getMovieFavouriteIDs } from "../api/supabase-db";

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

const FavouriteMoviesPage: React.FC = () => {
  // const { favourites, addToFavourites } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  document.title = `Favourite Movies`

  // Get the list of favourite movie IDs in Supabase:
  // convert Promise<number[]> from db into a number array, then save that array as movieFavouriteIDs
  const [ movieFavouriteIDs, setMovieFavouriteIDs ] = useState<number[]>([]);
  getMovieFavouriteIDs().then(x => {
    let temp: number[] = [];
    x.forEach(x => temp.push(x))
    setMovieFavouriteIDs(temp);
  })  

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieFavouriteIDs.map((movieId: any) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = allFavourites
    .sort((a, b) => a.title.localeCompare(b.title))
    ? filterFunction(allFavourites)
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
        title="Favourite Movies"
        movies={displayedMovies}
        increment={() => {}}
        decrement={() => {}}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
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

export default FavouriteMoviesPage;
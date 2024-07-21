import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getContentWithGenre } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
// import { PagesContext } from "../contexts/pagesContext";
import { useLocation } from "react-router-dom";
import { PagesContext } from "../contexts/pagesContext";

const MoviesByGenrePage: React.FC = () => {
  
  const location = useLocation();
  const { genreId } = location.state;

  const { moviesByGenrePageCount } = useContext(PagesContext);
  const { incrementMoviesByGenrePageCount } = useContext(PagesContext);
  const { decrementMoviesByGenrePageCount } = useContext(PagesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(`discover movies genre ${genreId} page ${moviesByGenrePageCount}`, () => getContentWithGenre("movie", moviesByGenrePageCount, genreId));

  document.title = "Movies by Genre - TMDB Client"

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title={document.title}
        movies={movies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
        increment={incrementMoviesByGenrePageCount}
        decrement={decrementMoviesByGenrePageCount}
        showGenreSearch={true}
      />
    </>
  );
};
export default MoviesByGenrePage;
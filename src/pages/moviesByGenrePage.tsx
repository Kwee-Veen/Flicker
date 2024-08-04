import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getContent } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
// import { useLocation } from "react-router-dom";
import { PagesContext } from "../contexts/pagesContext";

const MoviesByGenrePage: React.FC = () => {

  // TODO: refactor out, useContext instead
  // const location = useLocation();
  // const { genreId, voteAverage } = location.state;

  const { moviesByGenrePageCount, incrementMoviesByGenrePageCount, decrementMoviesByGenrePageCount } = useContext(PagesContext);
  // const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(`discover movies genre ${genreId} page ${moviesByGenrePageCount}`, () => getContent("movie", moviesByGenrePageCount, voteAverage, genreId));
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(`discover movies genre page ${moviesByGenrePageCount}`, () => getContent("movie", moviesByGenrePageCount));

  document.title = "Movie Search"

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
        showSearch={true}
      />
    </>
  );
};
export default MoviesByGenrePage;
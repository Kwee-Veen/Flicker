import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getContent } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { PagesContext } from "../contexts/pagesContext";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";

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

const MovieSearchResultsPage: React.FC = () => {

  const { genreId, genreLabel, voteAverage, sortBy, sortByLabel, moviesSearchPageCount, incrementMoviesSearchPageCount, decrementMoviesSearchPageCount } = useContext(PagesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering( [titleFiltering, genreFiltering] );
  document.title = `Movie Search Page ${moviesSearchPageCount}`

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
export default MovieSearchResultsPage;
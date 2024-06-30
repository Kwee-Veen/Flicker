import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchList from '../components/cardIcons/addToMustWatchList'
import { PagesContext } from "../contexts/pagesContext";


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

const UpcomingMoviesPage: React.FC = () => {
  const { upcomingMoviesPageCount } = useContext(PagesContext);
  const { incrementUpcomingMoviesPageCount } = useContext(PagesContext);
  const { decrementUpcomingMoviesPageCount } = useContext(PagesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(`upcoming${upcomingMoviesPageCount}`, () => getUpcomingMovies(upcomingMoviesPageCount));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  document.title = `Upcoming Movies - TMDB Client`

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


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
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToMustWatchList {...movie} />
        }}
        increment={
          incrementUpcomingMoviesPageCount
        }
        decrement={
          decrementUpcomingMoviesPageCount
        }
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default UpcomingMoviesPage;
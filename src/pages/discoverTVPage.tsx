import React, { useContext } from "react";
import { getTV } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvFilterUI";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { PagesContext } from "../contexts/pagesContext";
import TVListPageTemplate from "../components/templateTVListPage";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";


const nameFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const DisocoverTVPage: React.FC = () => {
  // const { moviesPageCount } = useContext(PagesContext);
  // const { incrementMoviesPageCount } = useContext(PagesContext);
  // const { decrementMoviesPageCount } = useContext(PagesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`discover`, () => getTV());
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering, genreFiltering]
  );

  document.title = "Discover TV - TMDB Client"

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tv = data ? data.results : [];
  const displayedTV = filterFunction(tv);

  return (
    <>
      <TVListPageTemplate
        name="Discover TV"
        tv={displayedTV}
        increment={
          () => {console.log("placeholder")}
        }
        decrement={
          () => {console.log("placeholder")}
        }
        action={(tv: BaseTVProps) => {
          return <AddToTVFavouritesIcon {...tv} />
        }}
        // increment={
        //   incrementMoviesPageCount
        // }
        // decrement={
        //   decrementMoviesPageCount
        // }
      />
      <TVFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default DisocoverTVPage;
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
  const { tvPageCount } = useContext(PagesContext);
  const { incrementTVPageCount } = useContext(PagesContext);
  const { decrementTVPageCount } = useContext(PagesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`discoverTV ${tvPageCount}`, () => getTV(tvPageCount));
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
        action={(tv: BaseTVProps) => {
          return <AddToTVFavouritesIcon {...tv} />
        }}
        increment={
          incrementTVPageCount
        }
        decrement={
          decrementTVPageCount
        }
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
import React, { useContext } from "react";
import PageTemplate from "../components/templateTVListPage";
import { getTrendingTV } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvFilterUI";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { PagesContext } from "../contexts/pagesContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";

const titleFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TrendingTVPage: React.FC = () => {
  const { trendingTVPageCount } = useContext(PagesContext);
  const { incrementTrendingTVPageCount } = useContext(PagesContext);
  const { decrementTrendingTVPageCount } = useContext(PagesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`trending${trendingTVPageCount}`, () => getTrendingTV(trendingTVPageCount));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  document.title = `Trending TV`

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
      <PageTemplate
        name="Trending TV"
        tv={displayedTV}
        action={(tv: BaseTVProps) => {
          return <AddToTVFavouritesIcon {...tv} />
        }}
        increment={
          incrementTrendingTVPageCount
        }
        decrement={
          decrementTrendingTVPageCount
        }
        showSearch={false}
      />
      <TVFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default TrendingTVPage;
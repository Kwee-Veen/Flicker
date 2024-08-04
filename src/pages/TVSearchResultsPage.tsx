import React, { useContext } from "react";
import PageTemplate from "../components/templateTVListPage";
import { getContent } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { PagesContext } from "../contexts/pagesContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";
import TVFilterUI, { genreFilter, nameFilter } from "../components/tvFilterUI";
import useFiltering from "../hooks/useFiltering";

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

const TVSearchResultsPage: React.FC = () => {

  const { filterValues, setFilterValues, filterFunction } = useFiltering( [nameFiltering, genreFiltering] );
  const { genreId, genreLabel, voteAverage, sortBy, sortByLabel, tvSearchPageCount: tvByGenrePageCount, incrementTVSearchPageCount: incrementTVByGenrePageCount, decrementTVSearchPageCount: decrementTVByGenrePageCount } = useContext(PagesContext);
  document.title = `TV Search pg.${tvByGenrePageCount}`

  let genreString: string = ''; 
  if (genreLabel) genreString = `${genreLabel} `;
  let voteString: string = ''; 
  if (voteAverage) voteString = ` Rated ≥ ${voteAverage}`;
  let sortString: string = ''; 
  if (sortByLabel) sortString = `, sorted by ${sortByLabel} `;
  
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`TV of genre: ${genreLabel}, average vote: ${voteAverage}, sorted by ${sortByLabel}, page: ${tvByGenrePageCount}`, () => getContent("tv", tvByGenrePageCount, voteAverage, genreId, sortBy));

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

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
        name={document.title}
        tv={displayedTV}
        action={(tv: BaseTVProps) => {
          return <AddToTVFavouritesIcon {...tv} />
        }}
        increment={incrementTVByGenrePageCount}
        decrement={decrementTVByGenrePageCount}
        showSearch={true}
      />
      <TVFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default TVSearchResultsPage;
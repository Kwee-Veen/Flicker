import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateTVListPage";
import { getContent } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { PagesContext } from "../contexts/pagesContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";
import TVFilterUI, { genreFilter, nameFilter } from "../components/tvFilterUI";
import useFiltering from "../hooks/useFiltering";
import { TVContext } from "../contexts/tvContext";
import { supabase } from "../supabaseClient";
import { getTVFavouriteIDs } from "../api/supabase-db";

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

const DiscoverTVPage: React.FC = () => {

const { genreId, genreLabel, voteAverage, sortBy, sortByLabel, setTVFavouriteIDs} = useContext(TVContext);

// Function that queries the DB for IDs of tvFavourites and assigns the results to tvFavouriteIDs (in TVContext) 
const loadFavourites = () => {
  getTVFavouriteIDs().then(x => {
    let temp: number[] = [];
    x.forEach(x => temp.push(x))
    setTVFavouriteIDs(temp);
  })
}

// loads initial favourites (once only)
useEffect(() => { loadFavourites(); }, []);

// subscribes to the movieFavourites db channel and re-loads favourites if there's any db change
supabase.channel('table_db_changes_tvFavourites').on('postgres_changes', 
  { event: '*', schema: 'public', table: 'tvFavourites' }, 
  () => { loadFavourites(); }).subscribe();

  const { filterValues, setFilterValues, filterFunction } = useFiltering([nameFiltering, genreFiltering]);
  const { tvSearchPageCount, incrementTVSearchPageCount, decrementTVSearchPageCount } = useContext(PagesContext);

  document.title = `Flicker - TV`
  
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(
    `TV of genre: ${genreLabel}, average vote: ${voteAverage}, sorted by ${sortByLabel}, page: ${tvSearchPageCount}`, 
    () => getContent("tv", tvSearchPageCount, voteAverage, genreId, sortBy)
  );

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
        name={`TV Page ${tvSearchPageCount}`}
        tv={displayedTV}
        action={(tv: BaseTVProps) => {
          return <AddToTVFavouritesIcon {...tv} />
        }}
        increment={incrementTVSearchPageCount}
        decrement={decrementTVSearchPageCount}
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
export default DiscoverTVPage;
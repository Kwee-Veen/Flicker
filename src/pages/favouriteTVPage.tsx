import React, { useContext, useEffect } from "react"
import PageTemplate from "../components/templateTVListPage";
import { TVContext } from "../contexts/tvContext";
import { useQueries, UseQueryResult } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvFilterUI";
import RemoveFromTVFavourites from "../components/cardIcons/removeFromTVFavourites";
import WriteTVReview from "../components/cardIcons/writeTVReview";
import { supabase } from "../supabaseClient";
import { getTVFavouriteIDs } from "../api/supabase-db";

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

const FavouriteTVPage: React.FC = () => {
  const { tvFavouriteIDs, setTVFavouriteIDs } = useContext(TVContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering( [titleFiltering, genreFiltering] );
  document.title = `Favourite TV`

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

// Create an array of queries and run them in parallel.
let favouriteTVQueries: UseQueryResult<any, unknown>[] = [];
if (tvFavouriteIDs) {
  favouriteTVQueries = useQueries(
    tvFavouriteIDs.map((tvId) => {
      return {
        queryKey: ["tv", tvId],
        queryFn: () => getTVSeries(tvId.toString()),
      };
    })
  );
}

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTVQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTVQueries.map((q) => q.data);
  const displayedTV = allFavourites
    .sort((a, b) => a.name.localeCompare(b.name))
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
        name="Favourite TV"
        tv={displayedTV}
        increment={() => {}}
        decrement={() => {}}
        action={(tv) => {
          return (
            <>
              <RemoveFromTVFavourites {...tv} />
              <WriteTVReview {...tv} />
            </>
          );
        }}
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

export default FavouriteTVPage;
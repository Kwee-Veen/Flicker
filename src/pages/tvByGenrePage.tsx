import React, { useContext } from "react";
import PageTemplate from "../components/templateTVListPage";
import { getContent } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { PagesContext } from "../contexts/pagesContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";

const TVSearchResultsPage: React.FC = () => {

  const { genreId, genreLabel, voteAverage, sortBy, sortByLabel, tvByGenrePageCount, incrementTVByGenrePageCount, decrementTVByGenrePageCount } = useContext(PagesContext);
  let genreString: string = ''; 
  if (genreLabel) genreString = `${genreLabel} `;

  let voteString: string = ''; 
  if (voteAverage) voteString = ` Rated ≥ ${voteAverage}`;

  let sortString: string = ''; 
  if (sortByLabel) sortString = `, sorted by ${sortByLabel} `;

  document.title = `Page ${tvByGenrePageCount}`
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`TV of genre: ${genreLabel}, average vote: ${voteAverage}, sorted by ${sortByLabel}, page: ${tvByGenrePageCount}`, () => getContent("tv", tvByGenrePageCount, voteAverage, genreId, sortBy));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tv = data ? data.results : [];

  return (
    <>
      <PageTemplate
        name={document.title}
        tv={tv}
        action={(tv: BaseTVProps) => {
          return <AddToTVFavouritesIcon {...tv} />
        }}
        increment={incrementTVByGenrePageCount}
        decrement={decrementTVByGenrePageCount}
        showSearch={true}
      />
    </>
  );
};
export default TVSearchResultsPage;
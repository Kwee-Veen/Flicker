import React, { useContext } from "react";
import PageTemplate from "../components/templateTVListPage";
import { getContent } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { PagesContext } from "../contexts/pagesContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";

const TVByGenrePage: React.FC = () => {

  const { genreId, genreLabel, voteAverage ,tvByGenrePageCount, incrementTVByGenrePageCount, decrementTVByGenrePageCount } = useContext(PagesContext);
  let genreString: string = ''; 
  let voteString: string = ''; 
  if (genreLabel) genreString = `${genreLabel} `;
  if (voteAverage) voteString = ` Rated ≥ ${voteAverage}`;
  document.title = `Page ${tvByGenrePageCount} of ${genreString}TV${voteString}`
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`TV of genre: ${genreLabel}, average vote: ${voteAverage}, page: ${tvByGenrePageCount}`, () => getContent("tv", tvByGenrePageCount, voteAverage, genreId));

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
        showGenreSearch={true}
      />
    </>
  );
};
export default TVByGenrePage;
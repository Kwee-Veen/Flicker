import React, { useContext } from "react";
import PageTemplate from "../components/templateTVListPage";
import { getContent } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
// import { PagesContext } from "../contexts/pagesContext";
import { useLocation } from "react-router-dom";
import { PagesContext } from "../contexts/pagesContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";

const TVByGenrePage: React.FC = () => {
  
  const location = useLocation();
  const { genreId } = location.state;
  const { voteAverage } = location.state;

  const { tvByGenrePageCount } = useContext(PagesContext);
  const { incrementTVByGenrePageCount } = useContext(PagesContext);
  const { decrementTVByGenrePageCount } = useContext(PagesContext);
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(`discover tv genre ${genreId} page ${tvByGenrePageCount}`, () => getContent("tv", tvByGenrePageCount, voteAverage, genreId));


  document.title = "TV by Genre - TMDB Client"

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
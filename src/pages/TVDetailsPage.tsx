import React from "react"; 
import { useParams } from "react-router-dom";
import TVDetails from "../components/tvDetails";
import PageTemplate from "../components/templateTVPage";
import { getTVSeries } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TVDetailsProps } from "../types/interfaces";

const TVDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: tv, error, isLoading, isError } = useQuery<TVDetailsProps, Error>(
    ["tv", id],
    ()=> getTVSeries(id||"")
  );

  if (tv) document.title = `${tv.name} - TMDB Client`

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tv ? (
        <>
        <PageTemplate tv={tv}> 
          <TVDetails {...tv} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for tv details</p>
    )}
    </>
  );
};

export default TVDetailsPage;
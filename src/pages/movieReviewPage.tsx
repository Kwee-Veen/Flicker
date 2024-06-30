import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage: React.FC = () => {
  const { state : {movie, review } } = useLocation()
  if (movie) document.title = `Reviews of ${movie.title} - TMDB Client`
  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
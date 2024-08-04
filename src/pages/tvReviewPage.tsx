import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTVPage";
import TVReview from "../components/tvReview";

const TVReviewPage: React.FC = () => {
  const { state : {tv, review } } = useLocation()
  if (tv) document.title = `Reviews of ${tv.name}`
  return (
    <PageTemplate tv={tv}>
      <TVReview {...review} />
    </PageTemplate>
  );
};

export default TVReviewPage;
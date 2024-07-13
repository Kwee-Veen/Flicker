import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseTVProps} from "../../types/interfaces"
import { Link } from "react-router-dom";

const WriteTVReviewIcon:React.FC<BaseTVProps> = (tv) => {
  return (
    <Link
    to={'/tvReviews/form'}
    state={{
        series_id: tv.id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteTVReviewIcon;
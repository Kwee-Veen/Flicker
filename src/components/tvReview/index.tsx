import React from "react";
import { TVReview } from "../../types/interfaces";

const TVReviewComponent: React.FC<TVReview> =  (props) => {
  return (
    <>
      <p>Review By: {props.author} </p>
      <p>{props.content} </p>
    </>
  );
};
export default TVReviewComponent

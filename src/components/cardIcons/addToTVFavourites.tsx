import React, {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseMovieProps, BaseTVProps} from "../../types/interfaces"

const AddToTVFavouritesIcon: React.FC<BaseTVProps> = (tv) => {
  // const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // context.addToFavourites(tv);
    // TODO:
    console.log("Placeholder for TV being added to context, which hasn't yet been implemented");
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVFavouritesIcon;
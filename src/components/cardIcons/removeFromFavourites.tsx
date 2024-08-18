import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {BaseMovieProps} from "../../types/interfaces";
import { removeFromFavourites } from "../../api/supabase-db";

const RemoveFromFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
  const { movieFavouriteIDs, setMovieFavouriteIDs} = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var temp = movieFavouriteIDs;
    temp?.splice(movie.id)
    setMovieFavouriteIDs(temp);
    removeFromFavourites(movie.id);
  };

  return (
    <>
      <IconButton
        aria-label="remove from favorites"
        onClick={onUserRequest}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
      &nbsp;&nbsp;
    </>
  );
};

export default RemoveFromFavouritesIcon;
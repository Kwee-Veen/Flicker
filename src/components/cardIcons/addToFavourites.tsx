import React, {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseMovieProps} from "../../types/interfaces"
import { addToFavourites } from "../../api/supabase-db";

const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
  const { movieFavouriteIDs, setMovieFavouriteIDs} = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var temp = movieFavouriteIDs;
    temp?.push(movie.id)
    setMovieFavouriteIDs(temp);
    addToFavourites(movie.id);
  };
  
  return (
    <>
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </>
  );
};

export default AddToFavouritesIcon;
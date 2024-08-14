import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {BaseMovieProps} from "../../types/interfaces";
import { removeFromMustWatchMovies } from "../../api/supabase-db";

const RemoveFromMustWatchMoviesIcon: React.FC<BaseMovieProps> = (movie) => {
  const { mustWatchMovieIDs, setMustWatchMovieIDs} = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var temp = mustWatchMovieIDs;
    temp?.splice(movie.id)
    setMustWatchMovieIDs(temp);
    removeFromMustWatchMovies(movie.id);
  };

return (
  <IconButton
    aria-label="remove from must watch movies"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromMustWatchMoviesIcon;
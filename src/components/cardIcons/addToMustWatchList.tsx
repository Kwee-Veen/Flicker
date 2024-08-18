import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces"
import { addToMustWatchMovies } from "../../api/supabase-db";

const AddToMustWatchListIcon: React.FC<BaseMovieProps> = (movie) => {
  const { mustWatchMovieIDs, setMustWatchMovieIDs} = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var temp = mustWatchMovieIDs;
    temp?.push(movie.id)
    setMustWatchMovieIDs(temp);
    addToMustWatchMovies(movie.id);
  };

  return (
    <>
      <IconButton aria-label="add to must watch list" onClick={onUserSelect}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </>
  );
};

export default AddToMustWatchListIcon;
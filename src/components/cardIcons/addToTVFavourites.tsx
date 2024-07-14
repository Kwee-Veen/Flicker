import React, {MouseEvent, useContext} from "react";
import { TVContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTVProps} from "../../types/interfaces"

const AddToTVFavouritesIcon: React.FC<BaseTVProps> = (tv) => {
  const context = useContext(TVContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToTVFavourites(tv);
  };
  return (
    <IconButton aria-label="add to tv favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVFavouritesIcon;
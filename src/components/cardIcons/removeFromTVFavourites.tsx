import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVContext } from "../../contexts/tvContext";
import { BaseTVProps} from "../../types/interfaces";

const RemoveFromTVFavouritesIcon: React.FC<BaseTVProps> = (tv) => {
  const context = useContext(TVContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromTVFavourites(tv);
  };

return (
  <IconButton
    aria-label="remove from tv favorites"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromTVFavouritesIcon;
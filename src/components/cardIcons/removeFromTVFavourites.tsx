import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVContext } from "../../contexts/tvContext";
import { BaseTVProps} from "../../types/interfaces";
import { removeFromTVFavourites } from "../../api/supabase-db";

const RemoveFromTVFavouritesIcon: React.FC<BaseTVProps> = (tv) => {
  const { tvFavouriteIDs, setTVFavouriteIDs} = useContext(TVContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var temp = tvFavouriteIDs;
    temp?.push(tv.id)
    setTVFavouriteIDs(temp);
    removeFromTVFavourites(tv.id);
  };

  return (
    <>
      <IconButton
        aria-label="remove from tv favorites"
        onClick={onUserRequest}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
      &nbsp;&nbsp;
    </>
  );
};

export default RemoveFromTVFavouritesIcon;
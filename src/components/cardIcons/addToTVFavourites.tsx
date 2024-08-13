import React, {MouseEvent, useContext} from "react";
import { TVContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTVProps} from "../../types/interfaces"
import { addToTVFavourites } from "../../api/supabase-db";

const AddToTVFavouritesIcon: React.FC<BaseTVProps> = (tv) => {
  const { tvFavouriteIDs, setTVFavouriteIDs} = useContext(TVContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var temp = tvFavouriteIDs;
    temp?.push(tv.id)
    setTVFavouriteIDs(temp);
    addToTVFavourites(tv.id);
  };

  return (
    <IconButton aria-label="add to tv favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVFavouritesIcon;
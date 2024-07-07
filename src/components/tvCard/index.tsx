import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseTVProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TVCardProps {
  tv: BaseTVProps;
  action: (m: BaseTVProps) => React.ReactNode;
}

const TVCard: React.FC<TVCardProps> = ({ tv, action }) => {
  // TODO: Favourites implementation for TV
  const { favourites } = useContext(MoviesContext);

  const isFavourite = favourites.find((id) => id === tv.id) ? true : false;

  const { mustWatchList } = useContext(MoviesContext);

  const isInMustWatchList = mustWatchList.find((id) => id === tv.id) ? true : false;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : (isInMustWatchList ? (
            <Avatar sx={styles.avatar}>
              <PlaylistAddIcon />
            </Avatar>
          ) : null)
        }
        title={
          <Typography variant="h5" component="p">
            {tv.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tv.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tv.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(tv)}
        <Link to={`/tv/${tv.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default TVCard;
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
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const styles = {
  card: { maxWidth: 345, borderRadius: 10, outline: 5, outlineColor: "white" },
  cardHeader: {minHeight: 60},
  media: { height: 500, borderRadius: 8},
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {

  const { movieFavouriteIDs, mustWatchMovieIDs } = useContext(MoviesContext);
  const { token } = useContext(AuthContext) || {};
  let isFavourite, isInMustWatchList: boolean = false;

  // Both favourite icons will only be flagged and displayed if logged in
  if (token) {
    isFavourite = movieFavouriteIDs?.find((id) => id === movie.id) ? true : false;
    isInMustWatchList = mustWatchMovieIDs?.find((id) => id === movie.id) ? true : false;
  }

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
          <Typography variant="h5" component="p" align="right">
            {movie.title}&nbsp;
          </Typography>
        }
        sx={styles.cardHeader}
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
        <Grid item xs={6} style={{ display:'flex', justifyContent:'center' }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              &nbsp;{movie.vote_average}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ display:'flex', justifyContent:'center' }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              &nbsp;{movie.release_date}&nbsp;&nbsp;&nbsp;
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing sx={{ marginTop: -2}} style={{justifyContent: 'center'}}>
        {/* Displays the add to favourites / must-watch buttons only if logged in */}
        {token ? (action(movie)) : null}
        <Link to={`/movies/${movie.id}`} >
          <Button variant="contained" size="medium" color="error" style={{justifyContent: 'center'}}>
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
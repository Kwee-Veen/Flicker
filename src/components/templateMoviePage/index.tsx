import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 500,
    height: '100vh',
  },
};

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", movie.id],
    () => getImages(movie.id, "movie")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error

    ).message}</h1>;
  }

  const images = data as MovieImage[];

  return (
    <>
      <MovieHeader {...movie} />
      <Grid item xs={9} style={{ margin: " 20px 150px" }}>
        {children}
      </Grid>
      <Grid container style={{ padding: "0px, 50px" }} justifyContent="center">
        <Grid item >
          <span>
            <ImageList>
              {images.map((image: MovieImage) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={'Image alternative'}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </span>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
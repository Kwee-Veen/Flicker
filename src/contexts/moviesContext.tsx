import React, { useState, useCallback } from "react";
import { BaseMovieProps, MenuOptions, Review } from "../types/interfaces";

interface MovieContextInterface {
  addReview: ((movie: BaseMovieProps, review: Review) => void);
  mustWatchList: number[];
  addToMustWatchList: ((movie: BaseMovieProps) => void);
  removeFromMustWatchList: ((movie: BaseMovieProps) => void);
  movieGenres: MenuOptions[];
  sortOptions: MenuOptions[];
  voteAverage: number | undefined;
  setVoteAverage: ((number: number | undefined) => void);
  tempVoteAverage: number | undefined;
  setTempVoteAverage: ((number: number | undefined) => void);
  genreId: number | string | undefined;
  setGenreId: ((number: number | string | undefined) => void);
  genreLabel: string | undefined;
  setGenreLabel: ((label: string | undefined) => void);
  sortBy: string | undefined;
  setSortBy: ((label: string | undefined) => void);
  sortByLabel: string | undefined;
  setSortByLabel: ((label: string | undefined) => void);
  movieFavouriteIDs: number[] | undefined;
  setMovieFavouriteIDs: ((number: number[] | undefined) => void);
}

const initialContextState: MovieContextInterface = {
  addReview: (movie, review) => { movie.id, review },
  mustWatchList: [],
  addToMustWatchList: () => { },
  removeFromMustWatchList: () => { },
  movieGenres: [],
  sortOptions: [],
  voteAverage: undefined,
  setVoteAverage: () => { },
  tempVoteAverage: undefined,
  setTempVoteAverage: () => { },
  genreId: undefined,
  setGenreId: () => { },
  genreLabel: undefined,
  setGenreLabel: () => { },
  sortBy: undefined,
  setSortBy: () => { },
  sortByLabel: undefined,
  setSortByLabel: () => { },
  movieFavouriteIDs: [],
  setMovieFavouriteIDs: () => { },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  const [mustWatchList, setMustWatchList] = useState<number[]>([]);

  const addToMustWatchList = useCallback((movie: BaseMovieProps) => {
    setMustWatchList((prevMustWatchList) => {
      if (!prevMustWatchList.includes(movie.id)) {
        console.log(`Added movie ${movie.title} to Must Watch List`);
        return [...prevMustWatchList, movie.id];
      }
      console.log(`Did not add movie ${movie.title} to Must Watch List - already present`);
      return prevMustWatchList;
    });
  }, []);

  const removeFromMustWatchList = useCallback((movie: BaseMovieProps) => {
    setMustWatchList((prevMustWatchList) => prevMustWatchList.filter((mId) => mId !== movie.id));
  }, []);

  const [movieGenres] = useState<MenuOptions[]>([
    { label: "Pick a genre", path: "" },
    { label: "Action", path: "28" },
    { label: "Adventure", path: "12" },
    { label: "Animation", path: "16" },
    { label: "Comedy", path: "35" },
    { label: "Crime", path: "80" },
    { label: "Documentary", path: "99" },
    { label: "Drama", path: "18" },
    { label: "Family", path: "10751" },
    { label: "Fantasy", path: "14" },
    { label: "History", path: "36" },
    { label: "Horror", path: "27" },
    { label: "Music", path: "10402" },
    { label: "Mystery", path: "9648" },
    { label: "Romance", path: "10749" },
    { label: "Science Fiction", path: "878" },
    { label: "TV Movie", path: "10770" },
    { label: "Thriller", path: "53" },
    { label: "War", path: "10752" },
    { label: "Western", path: "37" },
  ])

  const [sortOptions] = useState<MenuOptions[]>([
    { label: "Title (A-Z)", path: "original_title.asc" },
    { label: "Title (Z-A)", path: "original_title.desc" },
    { label: "Popularity (high-low)", path: "popularity.desc" },
    { label: "Popularity (low-high)", path: "popularity.asc" },
    { label: "Rating Average (high-low)", path: "vote_average.desc" },
    { label: "Rating Average (low-high)", path: "vote_average.asc" },
    { label: "Release Date (high-low)", path: "primary_release_date.desc" },
    { label: "Release Date (low-high)", path: "primary_release_date.asc" },
  ])
  
  const [voteAverage, setVoteAverage] = React.useState<number | undefined>(undefined);
  const [tempVoteAverage, setTempVoteAverage] = React.useState<number | undefined>(undefined);
  const [genreId, setGenreId] = React.useState<number | string | undefined>(undefined);
  const [genreLabel, setGenreLabel] = React.useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = React.useState<string | undefined>(undefined);
  const [sortByLabel, setSortByLabel] = React.useState<string | undefined>(undefined);
  const [movieFavouriteIDs, setMovieFavouriteIDs ] = useState<number[] | undefined>([]);

  return (
    <MoviesContext.Provider
      value={{
        addReview,
        mustWatchList,
        addToMustWatchList,
        removeFromMustWatchList,
        movieGenres,
        sortOptions,
        voteAverage,
        setVoteAverage,
        genreId,
        setGenreId,
        genreLabel,
        setGenreLabel,
        tempVoteAverage,
        setTempVoteAverage,
        sortBy,
        setSortBy,
        sortByLabel,
        setSortByLabel,
        movieFavouriteIDs,
        setMovieFavouriteIDs,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
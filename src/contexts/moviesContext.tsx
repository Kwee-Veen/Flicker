import React, { useState, useCallback } from "react";
import { BaseMovieProps, MenuOptions, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: ((movie: BaseMovieProps) => void);
  removeFromFavourites: ((movie: BaseMovieProps) => void);
  addReview: ((movie: BaseMovieProps, review: Review) => void);
  mustWatchList: number[];
  addToMustWatchList: ((movie: BaseMovieProps) => void);
  removeFromMustWatchList: ((movie: BaseMovieProps) => void);
  movieGenres: MenuOptions[];
  sortOptions: MenuOptions[];
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => { },
  removeFromFavourites: () => { },
  addReview: (movie, review) => { movie.id, review },
  mustWatchList: [],
  addToMustWatchList: () => { },
  removeFromMustWatchList: () => { },
  movieGenres: [],
  sortOptions: [],
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

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

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatchList,
        addToMustWatchList,
        removeFromMustWatchList,
        movieGenres,
        sortOptions,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
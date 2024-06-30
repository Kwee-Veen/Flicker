import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: ((movie: BaseMovieProps) => void);
  removeFromFavourites: ((movie: BaseMovieProps) => void);
  addReview: ((movie: BaseMovieProps, review: Review) => void);
  mustWatchList: number[];
  addToMustWatchList: ((movie: BaseMovieProps) => void);
  removeFromMustWatchList: ((movie: BaseMovieProps) => void);
  popularMoviesPageCount: number;
  incrementPopularMoviesPageCount: (() => void);
  decrementPopularMoviesPageCount: (() => void);
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => { },
  removeFromFavourites: () => { },
  addReview: (movie, review) => { movie.id, review },
  mustWatchList: [],
  addToMustWatchList: () => { },
  removeFromMustWatchList: () => { },
  popularMoviesPageCount: 1,
  incrementPopularMoviesPageCount: () => { },
  decrementPopularMoviesPageCount: () => { },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [popularMoviesPageCount, setPopularMoviesPageCount] = useState<number>(1);

  const incrementPopularMoviesPageCount = useCallback(() => {
    setPopularMoviesPageCount((popularMoviesPageCount) => (popularMoviesPageCount + 1));
  }, []);

  const decrementPopularMoviesPageCount = useCallback(() => {
    setPopularMoviesPageCount((popularMoviesPageCount) => (popularMoviesPageCount - 1));
  }, []);

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

  const addReview = (movie: BaseMovieProps, review: Review) => {   // NEW
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
        popularMoviesPageCount,
        incrementPopularMoviesPageCount,
        decrementPopularMoviesPageCount,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
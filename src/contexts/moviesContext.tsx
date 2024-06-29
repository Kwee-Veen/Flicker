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
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => { },
  removeFromFavourites: () => { },
  addReview: (movie, review) => { movie.id, review },
  mustWatchList: [],
  addToMustWatchList: () => { },
  removeFromMustWatchList: () => { },
};

// interface UpcomingMovieContextInterface {

// }
// const initialMustWatchListContextState: UpcomingMovieContextInterface = {

// };

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);
// export const UpcomingMoviesContext = React.createContext<UpcomingMovieContextInterface>(initialMustWatchListContextState);

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
        removeFromMustWatchList
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
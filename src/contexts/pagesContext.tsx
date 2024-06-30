import React, { useState, useCallback } from "react";

interface MovieContextInterface {
  popularMoviesPageCount: number;
  incrementPopularMoviesPageCount: (() => void);
  decrementPopularMoviesPageCount: (() => void);
  upcomingMoviesPageCount: number;
  incrementUpcomingMoviesPageCount: (() => void);
  decrementUpcomingMoviesPageCount: (() => void);
  moviesPageCount: number;
  incrementMoviesPageCount: (() => void);
  decrementMoviesPageCount: (() => void);
}
const initialContextState: MovieContextInterface = {
  popularMoviesPageCount: 1,
  incrementPopularMoviesPageCount: () => { },
  decrementPopularMoviesPageCount: () => { },
  upcomingMoviesPageCount: 1,
  incrementUpcomingMoviesPageCount: () => { },
  decrementUpcomingMoviesPageCount: () => { },
  moviesPageCount: 1,
  incrementMoviesPageCount: () => { },
  decrementMoviesPageCount: () => { },
};

export const PagesContext = React.createContext<MovieContextInterface>(initialContextState);

const PagesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [popularMoviesPageCount, setPopularMoviesPageCount] = useState<number>(1);

  const incrementPopularMoviesPageCount = useCallback(() => {
    setPopularMoviesPageCount((popularMoviesPageCount) => (popularMoviesPageCount + 1));
  }, []);

  const decrementPopularMoviesPageCount = useCallback(() => {
    setPopularMoviesPageCount((popularMoviesPageCount) => (popularMoviesPageCount - 1));
  }, []);

  const [upcomingMoviesPageCount, setUpcomingMoviesPageCount] = useState<number>(1);

  const incrementUpcomingMoviesPageCount = useCallback(() => {
    setUpcomingMoviesPageCount((upcomingMoviesPageCount) => (upcomingMoviesPageCount + 1));
  }, []);

  const decrementUpcomingMoviesPageCount = useCallback(() => {
    setUpcomingMoviesPageCount((upcomingMoviesPageCount) => (upcomingMoviesPageCount - 1));
  }, []);

  const [moviesPageCount, setMoviesPageCount] = useState<number>(1);

  const incrementMoviesPageCount = useCallback(() => {
    setMoviesPageCount((moviesPageCount) => (moviesPageCount + 1));
  }, []);

  const decrementMoviesPageCount = useCallback(() => {
    setMoviesPageCount((moviesPageCount) => (moviesPageCount - 1));
  }, []);

  return (
    <PagesContext.Provider
      value={{
        popularMoviesPageCount,
        incrementPopularMoviesPageCount,
        decrementPopularMoviesPageCount,
        upcomingMoviesPageCount,
        incrementUpcomingMoviesPageCount,
        decrementUpcomingMoviesPageCount,
        moviesPageCount,
        incrementMoviesPageCount,
        decrementMoviesPageCount,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

export default PagesContextProvider;
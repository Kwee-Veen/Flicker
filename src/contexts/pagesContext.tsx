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
  tvPageCount: number;
  incrementTVPageCount: (() => void);
  decrementTVPageCount: (() => void);
  trendingTVPageCount: number;
  incrementTrendingTVPageCount: (() => void);
  decrementTrendingTVPageCount: (() => void);
  moviesByGenrePageCount: number;
  setMoviesByGenrePageCount: ((number: number) => void);
  incrementMoviesByGenrePageCount: (() => void);
  decrementMoviesByGenrePageCount: (() => void);
  tvByGenrePageCount: number;
  setTVByGenrePageCount: ((number: number) => void);
  incrementTVByGenrePageCount: (() => void);
  decrementTVByGenrePageCount: (() => void);
  voteAverage: number | undefined;
  setVoteAverage: ((number: number | undefined) => void);
  genreId: number | string |undefined;
  setGenreId: ((number: number | string | undefined) => void);
  genreLabel: string |undefined;
  setGenreLabel: ((label: string | undefined) => void);
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
  tvPageCount: 1,
  incrementTVPageCount: () => { },
  decrementTVPageCount: () => { },
  trendingTVPageCount: 1,
  incrementTrendingTVPageCount: () => { },
  decrementTrendingTVPageCount: () => { },
  moviesByGenrePageCount: 1,
  setMoviesByGenrePageCount: () => { },
  incrementMoviesByGenrePageCount: () => { },
  decrementMoviesByGenrePageCount: () => { },
  tvByGenrePageCount: 1,
  setTVByGenrePageCount: () => { },
  incrementTVByGenrePageCount: () => { },
  decrementTVByGenrePageCount: () => { },
  voteAverage: undefined,
  setVoteAverage: () => { },
  genreId: undefined,
  setGenreId: () => { },
  genreLabel: undefined,
  setGenreLabel: () => { },
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

  const [moviesByGenrePageCount, setMoviesByGenrePageCount] = useState<number>(1);

  const incrementMoviesByGenrePageCount = useCallback(() => {
    setMoviesByGenrePageCount((moviesByGenrePageCount) => (moviesByGenrePageCount + 1));
  }, []);

  const decrementMoviesByGenrePageCount = useCallback(() => {
    setMoviesByGenrePageCount((moviesByGenrePageCount) => (moviesByGenrePageCount - 1));
  }, []);

  const [tvPageCount, setTVPageCount] = useState<number>(1);

  const incrementTVPageCount = useCallback(() => {
    setTVPageCount((tvPageCount) => (tvPageCount + 1));
  }, []);

  const decrementTVPageCount = useCallback(() => {
    setTVPageCount((tvPageCount) => (tvPageCount - 1));
  }, []);

  const [trendingTVPageCount, setTrendingTVPageCount] = useState<number>(1);

  const incrementTrendingTVPageCount = useCallback(() => {
    setTrendingTVPageCount((trendingTVPageCount) => (trendingTVPageCount + 1));
  }, []);

  const decrementTrendingTVPageCount = useCallback(() => {
    setTrendingTVPageCount((trendingTVPageCount) => (trendingTVPageCount - 1));
  }, []);

  const [tvByGenrePageCount, setTVByGenrePageCount] = useState<number>(1);

  const incrementTVByGenrePageCount = useCallback(() => {
    setTVByGenrePageCount((tvByGenrePageCount) => (tvByGenrePageCount + 1));
  }, []);

  const decrementTVByGenrePageCount = useCallback(() => {
    setTVByGenrePageCount((tvByGenrePageCount) => (tvByGenrePageCount - 1));
  }, []);

  const [voteAverage, setVoteAverage] = React.useState<number | undefined>(undefined);
  const [genreId, setGenreId] = React.useState<number | string | undefined>(undefined);
  const [genreLabel, setGenreLabel] = React.useState<string | undefined>(undefined);


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
        tvPageCount,
        incrementTVPageCount,
        decrementTVPageCount,
        trendingTVPageCount,
        incrementTrendingTVPageCount,
        decrementTrendingTVPageCount,
        moviesByGenrePageCount,
        setMoviesByGenrePageCount,
        incrementMoviesByGenrePageCount,
        decrementMoviesByGenrePageCount,
        tvByGenrePageCount,
        setTVByGenrePageCount,
        incrementTVByGenrePageCount,
        decrementTVByGenrePageCount,
        voteAverage,
        setVoteAverage,
        genreId,
        setGenreId,
        genreLabel,
        setGenreLabel,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

export default PagesContextProvider;
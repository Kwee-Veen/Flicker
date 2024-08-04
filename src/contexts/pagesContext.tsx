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
  moviesSearchPageCount: number;
  setMoviesSearchPageCount: ((number: number) => void);
  incrementMoviesSearchPageCount: (() => void);
  decrementMoviesSearchPageCount: (() => void);
  tvSearchPageCount: number;
  setTVSearchPageCount: ((number: number) => void);
  incrementTVSearchPageCount: (() => void);
  decrementTVSearchPageCount: (() => void);
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
  moviesSearchPageCount: 1,
  setMoviesSearchPageCount: () => { },
  incrementMoviesSearchPageCount: () => { },
  decrementMoviesSearchPageCount: () => { },
  tvSearchPageCount: 1,
  setTVSearchPageCount: () => { },
  incrementTVSearchPageCount: () => { },
  decrementTVSearchPageCount: () => { },
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

  const [moviesSearchPageCount, setMoviesSearchPageCount] = useState<number>(1);

  const incrementMoviesSearchPageCount = useCallback(() => {
    setMoviesSearchPageCount((moviesSearchPageCount) => (moviesSearchPageCount + 1));
  }, []);

  const decrementMoviesSearchPageCount = useCallback(() => {
    setMoviesSearchPageCount((moviesSearchPageCount) => (moviesSearchPageCount - 1));
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

  const [tvSearchPageCount, setTVSearchPageCount] = useState<number>(1);

  const incrementTVSearchPageCount = useCallback(() => {
    setTVSearchPageCount((tvSearchPageCount) => (tvSearchPageCount + 1));
  }, []);

  const decrementTVSearchPageCount = useCallback(() => {
    setTVSearchPageCount((tvSearchPageCount) => (tvSearchPageCount - 1));
  }, []);

  const [voteAverage, setVoteAverage] = React.useState<number | undefined>(undefined);
  const [tempVoteAverage, setTempVoteAverage] = React.useState<number | undefined>(undefined);
  const [genreId, setGenreId] = React.useState<number | string | undefined>(undefined);
  const [genreLabel, setGenreLabel] = React.useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = React.useState<string | undefined>(undefined);
  const [sortByLabel, setSortByLabel] = React.useState<string | undefined>(undefined);

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
        moviesSearchPageCount,
        setMoviesSearchPageCount,
        incrementMoviesSearchPageCount,
        decrementMoviesSearchPageCount,
        tvSearchPageCount,
        setTVSearchPageCount,
        incrementTVSearchPageCount,
        decrementTVSearchPageCount,
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
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

export default PagesContextProvider;
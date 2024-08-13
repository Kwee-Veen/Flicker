import React, { useState, useCallback } from "react";
import { BaseTVProps, MenuOptions, TVReview } from "../types/interfaces";

interface TVContextInterface {
  addTVReview: ((tvShow: BaseTVProps, review: TVReview) => void);
  tvGenres: MenuOptions[];
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
  tvFavouriteIDs: number[] | undefined;
  setTVFavouriteIDs: ((number: number[] | undefined) => void);
}
const initialContextState: TVContextInterface = {
  addTVReview: (tvShow, review) => { tvShow.id, review },
  tvGenres: [],
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
  tvFavouriteIDs: [],
  setTVFavouriteIDs: () => { },
};

export const TVContext = React.createContext<TVContextInterface>(initialContextState);

const TVContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [myReviews, setMyReviews] = useState<TVReview[]>([]);

  const addTVReview = (tvShow: BaseTVProps, review: TVReview) => {
    setMyReviews({ ...myReviews, [tvShow.id]: review })
  };

    const [tvGenres] = useState<MenuOptions[]> ([
    { label: "Action & Adventure", path: 10759 },
    { label: "Animation", path: 16 },
    { label: "Comedy", path: 35 },
    { label: "Crime", path: 80 },
    { label: "Documentary", path: 99 },
    { label: "Drama", path: 18 },
    { label: "Family", path: 10751 },
    { label: "Kids", path: 10762 },
    { label: "Mystery", path: 9648 },
    { label: "News", path: 10763 },
    { label: "Reality", path: 10764 },
    { label: "Sci-Fi & Fantasy", path: 10765 },
    { label: "Soap", path: 10766 },
    { label: "Talk", path: 10767 },
    { label: "War & Politics", path: 10768 },
    { label: "Western", path: 37 },
  ])
  
  const [sortOptions] = useState<MenuOptions[]> ([
    { label: "Name (A-Z)", path: "original_name.asc" },
    { label: "Name (Z-A)", path: "original_name.desc" },
    { label: "Popularity (high-low)", path: "popularity.desc" },
    { label: "Popularity (low-high)", path: "popularity.asc" },
    { label: "Rating Average (high-low)", path: "vote_average.desc" },
    { label: "Rating Average (low-high)", path: "vote_average.asc" },
    { label: "Release Date (high-low)", path: "first_air_date.desc" },
    { label: "Release Date (low-high)", path: "first_air_date.asc" },
  ])

  const [voteAverage, setVoteAverage] = React.useState<number | undefined>(undefined);
  const [tempVoteAverage, setTempVoteAverage] = React.useState<number | undefined>(undefined);
  const [genreId, setGenreId] = React.useState<number | string | undefined>(undefined);
  const [genreLabel, setGenreLabel] = React.useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = React.useState<string | undefined>(undefined);
  const [sortByLabel, setSortByLabel] = React.useState<string | undefined>(undefined);
  const [tvFavouriteIDs, setTVFavouriteIDs ] = useState<number[] | undefined>([]);


  return (
    <TVContext.Provider
      value={{
        addTVReview,
        tvGenres,
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
        tvFavouriteIDs, 
        setTVFavouriteIDs
      }}
    >
      {children}
    </TVContext.Provider>
  );
}

export default TVContextProvider;
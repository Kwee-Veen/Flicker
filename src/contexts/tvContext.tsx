import React, { useState, useCallback } from "react";
import { BaseTVProps, MenuOptions, TVReview } from "../types/interfaces";

interface TVContextInterface {
  tvFavourites: number[];
  addToTVFavourites: ((tvShow: BaseTVProps) => void);
  removeFromTVFavourites: ((tvShow: BaseTVProps) => void);
  addTVReview: ((tvShow: BaseTVProps, review: TVReview) => void);
  tvMustWatchList: number[];
  addToTVMustWatchList: ((tvShow: BaseTVProps) => void);
  removeFromTVMustWatchList: ((tvShow: BaseTVProps) => void);
  tvGenres: MenuOptions[];
}
const initialContextState: TVContextInterface = {
  tvFavourites: [],
  addToTVFavourites: () => { },
  removeFromTVFavourites: () => { },
  addTVReview: (tvShow, review) => { tvShow.id, review },
  tvMustWatchList: [],
  addToTVMustWatchList: () => { },
  removeFromTVMustWatchList: () => { },
  tvGenres: [],
};

export const TVContext = React.createContext<TVContextInterface>(initialContextState);

const TVContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [myReviews, setMyReviews] = useState<TVReview[]>([]);
  const [tvFavourites, setTVFavourites] = useState<number[]>([]);

  const addToTVFavourites = useCallback((tvShow: BaseTVProps) => {
    setTVFavourites((prevTVFavourites) => {
      if (!prevTVFavourites.includes(tvShow.id)) {
        console.log(`Added tv show ${tvShow.name} to TV Favourites`);
        return [...prevTVFavourites, tvShow.id];
      }
      console.log(`Did not add tv show ${tvShow.name} to TV Favourites - already present`);
      return prevTVFavourites;
    });
  }, []);

  const removeFromTVFavourites = useCallback((tvShow: BaseTVProps) => {
    setTVFavourites((prevTVFavourites) => prevTVFavourites.filter((tId) => tId !== tvShow.id));
  }, []);

  const addTVReview = (tvShow: BaseTVProps, review: TVReview) => {
    setMyReviews({ ...myReviews, [tvShow.id]: review })
  };

  const [tvMustWatchList, setTVMustWatchList] = useState<number[]>([]);

  const addToTVMustWatchList = useCallback((tvShow: BaseTVProps) => {
    setTVMustWatchList((prevTVMustWatchList) => {
          if (!prevTVMustWatchList.includes(tvShow.id)) {
              console.log(`Added tv show ${tvShow.name} to Must Watch List`);
              return [...prevTVMustWatchList, tvShow.id];
          }
          console.log(`Did not add tv show ${tvShow.name} to TV Must Watch List - already present`);
          return prevTVMustWatchList;
      });
  }, []);

  const removeFromTVMustWatchList = useCallback((tvShow: BaseTVProps) => {
      setTVMustWatchList((prevTVMustWatchList) => prevTVMustWatchList.filter((mId) => mId !== tvShow.id));
  }, []);

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

  return (
    <TVContext.Provider
      value={{
        tvFavourites,
        addToTVFavourites,
        removeFromTVFavourites,
        addTVReview,
        tvMustWatchList,
        addToTVMustWatchList,
        removeFromTVMustWatchList,
        tvGenres,
      }}
    >
      {children}
    </TVContext.Provider>
  );
}

export default TVContextProvider;
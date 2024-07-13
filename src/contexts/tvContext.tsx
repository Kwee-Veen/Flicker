import React, { useState, useCallback } from "react";
import { BaseTVProps, TVReview } from "../types/interfaces";

interface TVContextInterface {
  tvFavourites: number[];
  addToTVFavourites: ((tvShow: BaseTVProps) => void);
  removeFromTVFavourites: ((tvShow: BaseTVProps) => void);
  addTVReview: ((tvShow: BaseTVProps, review: TVReview) => void);
  tvMustWatchList: number[];
  addToTVMustWatchList: ((tvShow: BaseTVProps) => void);
  removeFromTVMustWatchList: ((tvShow: BaseTVProps) => void);
}
const initialContextState: TVContextInterface = {
  tvFavourites: [],
  addToTVFavourites: () => { },
  removeFromTVFavourites: () => { },
  addTVReview: (tvShow, review) => { tvShow.id, review },
  tvMustWatchList: [],
  addToTVMustWatchList: () => { },
  removeFromTVMustWatchList: () => { },
};

export const TVContext = React.createContext<TVContextInterface>(initialContextState);

const TVContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [myReviews, setMyReviews] = useState<TVReview[]>([]);
  const [tvFavourites, setTVFavourites] = useState<number[]>([]);

  const addToTVFavourites = useCallback((tvShow: BaseTVProps) => {
    console.log(`reached TVContext`);
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
      }}
    >
      {children}
    </TVContext.Provider>
  );
}

export default TVContextProvider;
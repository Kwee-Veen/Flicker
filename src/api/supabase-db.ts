import { supabase } from "../supabaseClient";

export const getMovieFavouriteIDs = async () => {
  const { data: movieFavourites, error } = await supabase.from('movieFavourites').select('movieId')
  if (movieFavourites) {
    let ret: number[] = [];
    movieFavourites.forEach(x => { ret.push(x.movieId); })
    console.log(ret);
    return ret;
  
  } else
    throw new Error(`Unable to fetch movieFavourites from Supabase. Error: ${error}`);
};

export const addToFavourites = async (newFavouriteMovieId: number) => {
  const { error } = await supabase
    .from('movieFavourites')
    .insert([ { movieId: newFavouriteMovieId, userId: 1 } ])
    .select('movieId');

  if (error?.message) throw new Error(`Unable to add movie to db favourites. Error: ${error?.message}`);
  else console.log(`Added movie to db favourites. Id: ${newFavouriteMovieId}`); ;
};

export const removeFromFavourites = async (removeFavouriteMovieId: number) => {
  const { error } = await supabase
    .from('movieFavourites')
    .delete()
    .eq('movieId', removeFavouriteMovieId)

  if (error?.message) throw new Error(`Unable to remove movie from db favourites. Error: ${error?.message}`);
  else console.log(`Removed movie from db favourites. Id: ${removeFavouriteMovieId}`); 
};

export const getTVFavouriteIDs = async () => {
  const { data: tvFavourites, error } = await supabase.from('tvFavourites').select('tvId')
  if (tvFavourites) {
    let ret: number[] = [];
    tvFavourites.forEach(x => { ret.push(x.tvId); })
    console.log(ret);
    return ret;
  
  } else
    throw new Error(`Unable to fetch tvFavourites from Supabase. Error: ${error}`);
};

export const addToTVFavourites = async (newFavouriteTVId: number) => {
  const { error } = await supabase
    .from('tvFavourites')
    .insert([ { tvId: newFavouriteTVId, userId: 1 } ])
    .select('tvId');

  if (error?.message) throw new Error(`Unable to add tv series to db favourites. Error: ${error?.message}`);
  else console.log(`Added tv to db favourites. Id: ${newFavouriteTVId}`); ;
};

export const removeFromTVFavourites = async (removeFavouriteTVId: number) => {
  const { error } = await supabase
    .from('tvFavourites')
    .delete()
    .eq('tvId', removeFavouriteTVId)

  if (error?.message) throw new Error(`Unable to remove tv series from db favourites. Error: ${error?.message}`);
  else console.log(`Removed tv from db favourites. Id: ${removeFavouriteTVId}`); 
};

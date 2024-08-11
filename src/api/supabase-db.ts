import { supabase } from "../supabaseClient";

export const getTestUsers = async () => {
  const { data } = await supabase.from("users").select();
  if (data) console.log(data);
};

export const getMovieFavouriteIDs = async () => {
  const { data: movieFavourites, error } = await supabase.from('movieFavourites').select('movieId')

  if (movieFavourites) {
    let ret: number[] = [];
    movieFavourites.forEach(x => {
      ret.push(x.movieId);
    })
    console.log(ret);
    return ret;

  } else
    throw new Error(`Unable to fetch movieFavourites from Supabase. Error: ${error}`);
};

export const addToFavourites = async (newFavouriteMovieId: number) => {
  const { data, error } = await supabase
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

  if (error?.message) throw new Error(`Unable to remove movie to db favourites. Error: ${error?.message}`);
  else console.log(`Removed movie from db favourites. Id: ${removeFavouriteMovieId}`); 
};

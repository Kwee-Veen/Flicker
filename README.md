# React App Assignment
###### Full Stack Development 2, HDip in Computer Science

![Flicker-2](https://github.com/user-attachments/assets/181b7a98-3768-4963-b796-8c0d74f94c94)

__Name:__ Caoimhín Arnott

__Video Demo:__ https://youtu.be/lvw022D30Io

This repository contains an implementation of the Movie Fans Web Application using the React library, named Flicker.

![Flicker-3](https://github.com/user-attachments/assets/4ee71fde-0913-4f25-9b5a-d1cafb91a235)

### Features

+ Update - Extensive UI Overhaul: buttons, icons, layout, colour scheme
+ New - Movies: Trending page
+ New - TV: Discover, Trending & Favourites pages. List views, Detail views, Reviews, Filtering
+ New - Toggle button for movies or TV mode (also modifies the Flicker title's home page link). Instant, no page loading
+ New - Custom search for Movies & TV, including genres, ratings and x8 sorting options
+ New - UI number select box for ratings: saves input between TV vs Movies, limited to 0-10, only numbers possible, has usable buttons
+ New - Pagination, tracked independently for (movies): 1. discover 2. trending 3. upcoming and (TV): 4. discover 5. trending pages. I.e., remembers active page for all of these separately, along with search params
+ New - Google OAuth sign-in & sessions
+ New - Supabase persistence Favourites, Must-Watch & TV Favourites lists.
+ New - Protected Routes for Favourites, Must-Watch & TV Favourites lists.
+ Update - Designated favourites / Must-Watch / TV Favourites only visible and modifiable upon login, even in Discover pages (which are not protected routes)
+ Update - Caching for all pages, including custom searches for Movies or TV
+ New - Deployed to Vercel

![Flicker-4](https://github.com/user-attachments/assets/84c4156d-38cb-4175-b298-f36ab8bdcaac)

### Setup requirements.

Setup a .env file with the following:
1. VITE_TMDB_KEY
2. VITE_SUPABASE_URL
3. VITE_SUPABASE_ANON_KEY
4. VITE_GOOGLE_OAUTH_CLIENT_ID
5. VITE_GOOGLE_OAUTH_CLIENT_SECRET

For these you will need to:
1. Sign up to TMDB, Supabase, and create a new Google project on https://console.cloud.google.com/ 
2. Supabase: Create tables movieFavourites, mustWatchMovies, tvFavourites 
3. Supabase: turn on Realtime for all of these tables, allowing subscription, and configure access policies

### API endpoints

+ getContent: `https://api.themoviedb.org/3/discover/${medium}?api_key=${import.meta.env.VITE_TMDB_KEY}&  language=en-US&include_adult=false&include_video=false&page=${page}${sortBy}${voteAverage}${genre}`
  - {medium}: Movie or TV
  - {page}: Pagination
  - {voteAverageParam?}: Optional rating
  - {genreId?}: Optional genre (different for movies vs TV)
  - {sortByParam?}: Optional sorting schema
  * See api functions for full implementation

+ getTVSeries: `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
+ getGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US`
+ getTVReviews: = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
+ getPopularMovies = `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
+ getTrendingTV = `https://api.themoviedb.org/3/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`


### Routing

+ {index} ->   DiscoverMoviesPage **Default, Movie discover & search page**
+ /login ->   LoginPage **Login**
+ /movies/popular ->    PopularMoviesPage **Popular movies page**
+ /tv ->    DiscoverTVPage **TV discover & search page**
+ /tv/:id ->    TVDetailsPage **TV Details Page**
+ /tv/trending ->   TrendingTVPage **Popular TV page**
+ /tvreviews/:id ->   TVReviewPage **TV Reviews**
+ /tvreviews/form ->    AddTVReviewPage **Add TV Review**

+ /movies/favourites ->   FavouriteMoviesPage **Protected route: favourite movies list**
+ /movies/mustWatch ->  MustWatchMoviesPage **Protected route: must-watch movies list**
+ /tv/favourites ->   FavouriteTVPage **Protected route: must-watch movies list**
                
+ "*" ->    "/" replace **Reroutes to index page & replaces history**

### Third Party Components/Integration

+ React Components: **Freaking lots of them. The most difficult to work with was probably '@mui/base/Unstable_NumberInput', which provides the number input box that won't allow letters or numbers beyond 0-10, and has usable buttons. Has it's own component: *numberInputBox*. More difficult to work with as it's labelled 'Preview' on Material UI, meaning it's not fully implemented yet, and finicky.**
+ Persistence: **Supabase**
+ Third party/custom APIs: **Supabase**
+ Authentication: **Google OAuth**


### Independent learning (If relevant)

1. Material UI, used extensively, especially the sx prop, Grid, Typography & Button pages: **https://mui.com/material-ui/    https://mui.com/base-ui/react-number-input/**
2. Vercel deployment: **https://medium.com/@abdulmuizzayo6/how-to-host-your-react-app-on-vercel-effectively-7ae35b259044**
3. Google OAuth *(brilliant short guide btw)*: **https://www.youtube.com/watch?v=r5ff1_3WrPM**
4. TMDB: Discover API, both Movie and TV, and several others: **https://developer.themoviedb.org/reference/discover-movie**
5. Icon source, before removing the background (transparent) and re-colouring it: **https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQKHSWZiKmHMs6rS8UXog3BYtJdRdD3jxFfQ&s**
6. Supabase integration: **https://supabase.com/docs/guides/getting-started/quickstarts/reactjs**

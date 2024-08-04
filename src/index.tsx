import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import PagesContextProvider from "./contexts/pagesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import TVDetailsPage from "./pages/TVDetailsPage";
import TVContextProvider from "./contexts/tvContext";
import FavouriteTVPage from "./pages/favouriteTVPage";
import TVReviewPage from "./pages/tvReviewPage";
import AddTVReviewPage from "./pages/addTVReviewPage";
import TrendingTVPage from "./pages/trendingTVPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import DiscoverMoviesPage from "./pages/discoverMoviesPage";
import DiscoverTVPage from "./pages/discoverTVPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <PagesContextProvider>
          <MoviesContextProvider>
            <TVContextProvider>
              <Routes>
                <Route path="/" element={<DiscoverMoviesPage />} />
                <Route path="*" element={<DiscoverMoviesPage />} />

                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/mustWatch" element={<MustWatchMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />

                <Route path="/tv" element={<DiscoverTVPage />} />
                <Route path="/tv/:id" element={<TVDetailsPage />} />
                <Route path="/tv/favourites" element={<FavouriteTVPage />} />
                <Route path="/tv/trending" element={<TrendingTVPage />} />
                <Route path="/tvreviews/:id" element={<TVReviewPage />} />
                <Route path="/tvreviews/form" element={<AddTVReviewPage />} />
              </Routes>
            </TVContextProvider>
          </MoviesContextProvider>
        </PagesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
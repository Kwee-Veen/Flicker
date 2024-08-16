import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "./protectedRoute";
import AuthProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";

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
      <AuthProvider>
        <SiteHeader />
        <PagesContextProvider>
          <MoviesContextProvider>
            <TVContextProvider>
              <Routes>
                <Route index element={<DiscoverMoviesPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/favourites" element={
                  <ProtectedRoute>
                    <FavouriteMoviesPage />
                  </ProtectedRoute>
                } />
                <Route path="/movies/mustWatch" element={
                  <ProtectedRoute>
                    <MustWatchMoviesPage />
                  </ProtectedRoute>
                } />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />

                <Route path="/tv" element={<DiscoverTVPage />} />
                <Route path="/tv/:id" element={<TVDetailsPage />} />
                <Route path="/tv/favourites" element={
                  <ProtectedRoute>
                    <FavouriteTVPage />
                  </ProtectedRoute>
                } />
                <Route path="/tv/trending" element={<TrendingTVPage />} />
                <Route path="/tvreviews/:id" element={<TVReviewPage />} />
                <Route path="/tvreviews/form" element={<AddTVReviewPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>
            </TVContextProvider>
          </MoviesContextProvider>
        </PagesContextProvider>
        </AuthProvider>
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
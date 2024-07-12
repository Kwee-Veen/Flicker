export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
  increment: Function;
  decrement: Function;
}

export interface TVListPageTemplateProps extends BaseTVListProps {
  name: string;
  increment: Function;
  decrement: Function;
}

export type FilterOption = "title" | "name" | "genre";

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface BaseTVListProps {
  tv: BaseTVProps[];
  action: (m: BaseTVProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export interface Review{
  id: string;
  content: string
  author: string
}

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface DiscoverTV {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseTVProps[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
}

export interface BaseTVProps {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  first_air_date: string,
  name: string,
  vote_average: number,
  vote_count: number,
  homepage: string,
  favourite?: boolean;
  
}

export interface TVDetailsProps extends BaseTVProps{
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  adult: false,
  backdrop_path: string,
  created_by: string[],
  episode_run_time: number[],
  homepage: string,
  languages: [
    string
  ],
  last_air_date: string | Date,
  last_episode_to_air: {
    id: string,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: number | Date,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: null
  },
  name: string,
  next_episode_to_air: number | string | null,
  networks: [
    {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }
  ],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: [
    string
  ],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: string[],
  seasons: [
    {
      air_date: Date,
      episode_count: number,
      id: string,
      name: string,
      overview: string,
      poster_path: string,
      season_number: number,
      vote_average: number
    }
  ],
  spoken_languages: [
    {
      english_name: string,
      iso_639_1: string,
      name: string
    }
  ],
  status: string,
  tagline: string,
}
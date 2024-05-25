import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "3bcfe7653a506e8a583ed227282d1b5d";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmNmZTc2NTNhNTA2ZThhNTgzZWQyMjcyODJkMWI1ZCIsInN1YiI6IjY2NGNhMGE4YTg3YjJlYTBhMzY2OTE5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Re80sWLaIdBxt3dHmjJBipwxJJgVNU4s31HXcM3RnXY",
  },
};

//* START SEARCH MOVIE
export const getMovies = async (query, page) => {
  const params = {
    params: {
      query,
      page,
      language: "en-US",
      include_adult: false,
      api_key: API_KEY,
    },
  };

  const res = await axios.get("search/movie", params, options);
  return res.data;
};

//* START SEARCH MOVIE ID
export const getMovieById = async (movieId) => {
  const params = {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  };

  const res = await axios.get(`movie/${movieId}`, params, options);
  return res.data;
};

//* START SEARCH MOVIE CASTS
export const getMovieCredits = async (movieId) => {
  const params = {
		params: {
      api_key: API_KEY,
      language: "en-US",
    },
  };

  const res = await axios.get(`movie/${movieId}/credits`, params, options);
  return res.data;
};

//* START SEARCH MOVIE REVIEWS
export const getMovieReviews = async (movieId, page) => {
  const params = {
    params: {
      api_key: API_KEY,
      page,
      total_pages: 1,
    },
  };

  const res = await axios.get(`movie/${movieId}/reviews`, params, options);
  return res.data;
};

//* START SEARCH TRENDING MOVIE
export const getTrendingMovie = async (page) => {
  const params = {
		params: {
			page,
      api_key: API_KEY,
      language: "en-US",
    },
  };

  const res = await axios.get(`trending/movie/day`, params, options);
  return res.data;
};

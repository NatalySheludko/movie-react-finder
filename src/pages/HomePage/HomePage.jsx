import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { getTrendingMovie } from "../../components/Api/movieApi";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trendMovie, setTrendMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!trendMovie) {
      setIsError(true);
      return;
    }
    async function fetchTrendingMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getTrendingMovie();
        setTrendMovie(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {trendMovie.length > 0 && <MovieList trendMovie={trendMovie} />}
    </div>
  );
}

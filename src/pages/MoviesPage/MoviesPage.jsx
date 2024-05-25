import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "../../components/Api/movieApi.js";
import SearchMovie from "../../components/SearchMovie/SearchMovie.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query" ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSubmit = (movie) => {
    setSearchParams({ query: movie });
    setMovies([]);
  };

  useEffect(() => {
    if (query === "") {
      setIsError(true);
      return;
    }
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovies(query, page);
        if (data.results.length === 0) {
          setIsError(true);
        } else {
          setMovies((prevMovies) => {
            const movieIds = new Set(prevMovies.map((movie) => movie.id));
            const newMovies = data.results.filter(
              (movie) => !movieIds.has(movie.id)
            );
            return [...prevMovies, ...newMovies];
          });
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchMovie onSearch={handleSubmit} />
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}

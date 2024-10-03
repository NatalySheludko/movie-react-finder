import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { getMovieReviews } from "../Api/movieApi";
import css from "../MovieReviews/MovieReviews.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!movieId) {
      setIsError(true);
      return;
    }

    async function fetchMoviesReviews() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieReviews(movieId, page);
        setReviews((prevMovies) => {
          const movieIds = new Set(prevMovies.map((movie) => movie.id));
          const newMovies = data.results.filter(
            (movie) => !movieIds.has(movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesReviews();
  }, [movieId, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={css.wrap}>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {reviews.length === 0 && <p>We don`t have any reviews for this movie</p>}
      {reviews.length > 0 && (
        <ul className={css.menuList}>
          {reviews.map((review) => (
            <li className={css.list} key={review.id}>
              <h2 className={css.title}>Author: {review.author}</h2>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}


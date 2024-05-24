import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { getMovieReviews } from "../Api/movieApi";
import css from "../MovieReviews/MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setReviews(data.results);
        setPage(1);
        console.log(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesReviews();
  }, [movieId, page]);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {reviews.length === 0 && <p>We don`t have any reviews for this movie</p>}
      {reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li className={css.wrap} key={review.id}>
              <h2 className={css.title}>Author: {review.author}</h2>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

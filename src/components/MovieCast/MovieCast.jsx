import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { getMovieCredits } from "../Api/movieApi";
import { defaultImg } from "../../defaultImg";
import css from "../MovieCast/MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setIsError(true);
      return;
    }
    async function fetchMoviesCredits() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieCredits(movieId);
        setCredits(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesCredits();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {credits.length > 0 && (
        <ul className={css.wrap}>
          {credits.map((actor) => (
            <li className={css.items} key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : defaultImg
                }
                width={200}
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

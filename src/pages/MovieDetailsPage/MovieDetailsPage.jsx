import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../components/Api/movieApi";
import { NavLink } from "react-router-dom";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { GiClick } from "react-icons/gi";
import { defaultImg } from "../../defaultImg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setIsError(true);
      return;
    }
    async function fetchMoviesId() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesId();
  }, [movieId]);

  return (
		<div className={css.container}>
			
      {isError && <ErrorMessage />}
			{isLoading && <Loading />}
			
      {movie !== null && (
        <div>
          <IconContext.Provider value={{ size: "2em" }}>
            <button className={css.btn}>
              <IoMdArrowRoundBack />
            </button>
          </IconContext.Provider>

          <div className={css.titleInfo}>
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`
                  : defaultImg
              }
              width={200}
              alt={movie.original_title}
						/>
						
            <div>
              <h1>{movie.title}</h1>
              {movie.release_date !== "" && (
                <p>({parseFloat(movie.release_date)})</p>
              )}
              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
						</div>
						
          </div>

          <h2>Overview</h2>
          <p>{movie.overview}</p>
					<h2>Genres</h2>
					
          <ul className={css.genre}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>
                <p>{genre.name}</p>{" "}
              </li>
            ))}
          </ul>

					<h2>Additional information</h2>
					
          <ul className={css.additionalInfo}>
						<li className={css.list}>							
              <NavLink className={css.link} to={`/movies/${movieId}/cast`}>
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <GiClick />
								</IconContext.Provider>
                <p className={css.text}>Cast</p>
              </NavLink>
						</li>
						
            <li className={css.list}>
              <NavLink className={css.link} to={`/movies/${movieId}/reviews`}>
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <GiClick />
                </IconContext.Provider>
                <p className={css.text}>Reviews</p>
              </NavLink>
            </li>
					</ul>
					
					<Outlet />
					
        </div>
			)}
			
    </div>
  );
}

import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { getMovieById } from "../../components/Api/movieApi";
import { NavLink, Link } from "react-router-dom";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { GiClick } from "react-icons/gi";
import { DEFAULT_IMG } from "../../defaultImg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  const navigate = useNavigate();

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
        const currentPath = window.location.pathname;
        if (
          !currentPath.includes(`/movies/${movieId}/cast`) &&
          !currentPath.includes(`/movies/${movieId}/reviews`)
        ) {
          navigate(`/movies/${movieId}/cast`);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesId();
  }, [movieId, navigate]);

  return (
    <div className={css.container}>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}

      {movie !== null && (
        <div className={css.content}>
          <div
            className={css.backgroundWrap}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            }}
          >
            <div className={css.overlay}></div>
            <IconContext.Provider value={{ size: "2em" }}>
              <Link to={backLinkRef.current} className={css.btn}>
                <IoMdArrowRoundBack />
              </Link>
            </IconContext.Provider>

            <div className={css.titleInfo}>
              <img
                className={css.img}
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    : DEFAULT_IMG
                }
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

            <h2 className={css.detailsTitle}>Overview</h2>
            <p>{movie.overview}</p>
            <h2 className={css.detailsTitle}>Genres</h2>

            <ul className={css.genre}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>
                  <p>{genre.name}</p>{" "}
                </li>
              ))}
            </ul>
          </div>

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

          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}


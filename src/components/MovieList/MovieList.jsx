import css from "../MovieList/MoviesList.module.css";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_IMG } from "../../defaultImg";

export default function MovieList({ movies = [], trendMovie = [] }) {
  const location = useLocation();
  return (
    <div className={css.movieList}>
      <div>
        <ul className={css.trendMovieWrap}>
          {trendMovie.map((trend) => (
            <li className={css.items} key={trend.id}>
              <img
                className={css.img}
                src={
                  trend.backdrop_path
                    ? `https://image.tmdb.org/t/p/w200/${trend.backdrop_path}`
                    : DEFAULT_IMG
                }
                width={230}
                alt={trend.original_title}
              />
              <p>
                <Link
                  className={css.title}
                  to={`/movies/${trend.id}`}
                  state={location}
                >
                  {trend.original_title}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className={css.trendMovieWrap}>
          {movies.map((movie) => (
            <li className={css.items} key={movie.id}>
              <img
                className={css.img}
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`
                    : DEFAULT_IMG
                }
                width={230}
                alt={movie.original_title}
              />
              <p>
                <Link
                  className={css.title}
                  to={`/movies/${movie.id}`}
                  state={location}
                >
                  {movie.title}
                </Link>
              </p>
            </li>
          ))}
        </ul>
			</div>
    </div>
  );
}

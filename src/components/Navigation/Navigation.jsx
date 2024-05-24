import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  function getClassActiveLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }

  return (
    <>
      <nav>
        <ul className={css.navWrap}>
          <li>
            <NavLink to="/" className={getClassActiveLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getClassActiveLink}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

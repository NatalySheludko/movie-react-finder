import css from "../SearchMovie/SearchMovie.module.css";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";

export default function SearchMovie({ onSearch }) {
  const notify = () => toast("Error loading!");

  return (
    <Formik
      initialValues={{ movie: "" }}
      onSubmit={(values, actions) => {
        if (!values.movie.trim()) {
          return notify();
        }

        onSearch(values.movie);
        actions.resetForm();
      }}
    >
      <Form className={css.search}>
        <Field
          className={css.input}
          type="text"
          name="movie"
          autoComplete="off"
          autoFocus
          placeholder="Search movies ..."
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}

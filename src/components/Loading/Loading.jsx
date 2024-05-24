import css from "../Loading/Loading.module.css";
import { Grid } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className={css.loader}>
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperClass="grid-wrapper"
      />
    </div>
  );
}

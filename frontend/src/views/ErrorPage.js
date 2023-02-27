import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes["error-container"]}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <button onClick={() => navigate("/")} className={classes.btn}>Take me back home</button>
    </div>
  );
};

export default ErrorPage;

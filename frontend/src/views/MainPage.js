import classes from "./MainPage.module.css"
import LoginForm from "../components/LoginForm";

const MainPage = () => {
  return (
    <div className={classes["main-page"]}>
      <h1>My calendar</h1>

      <LoginForm />
    </div>
  );
};

export default MainPage;

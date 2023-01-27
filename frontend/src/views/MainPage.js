import classes from "./MainPage.module.css"
import LoginForm from "../components/LoginForm";

const MainPage = () => {
  return (
    <div className={classes["main-page"]}>
     

      <LoginForm />
    </div>
  );
};

export default MainPage;

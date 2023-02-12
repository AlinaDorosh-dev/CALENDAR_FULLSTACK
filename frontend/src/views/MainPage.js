import classes from "./MainPage.module.css"
import LoginForm from "../components/LoginForm";

const MainPage = ({setLoggedUser}) => {
  return (
    <div className={classes["main-page"]}>
          <LoginForm  setLoggedUser={setLoggedUser} />
    </div>
  );
};

export default MainPage;

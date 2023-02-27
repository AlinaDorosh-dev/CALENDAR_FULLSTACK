import classes from "./Header.module.css";
import MyProfile from "./myProfile/MyProfile";
import UserUpdateProvider from "../providers/userUpdateProvider";
const Header = ({ loggedUser, setLoggedUser }) => {
  return (
    <header className={classes.header}>
      {loggedUser.name && (
        <UserUpdateProvider>
          <MyProfile loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        </UserUpdateProvider>
      )}
      <h1>MY CALENDAR</h1>
    </header>
  );
};

export default Header;

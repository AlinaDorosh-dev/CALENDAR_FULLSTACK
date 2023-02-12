import classes from "./Header.module.css"
import MyProfile from "./MyProfile"
import UserUpdateProvider from "../providers/userUpdateProvider"
const Header = ({loggedUser}) => {
  return (
    <header className={classes.header}>
      { loggedUser.name &&  <UserUpdateProvider>
       <MyProfile loggedUser={loggedUser}/>
       </UserUpdateProvider>}
        <h1 >MY CALENDAR</h1>
     
    </header>
  )
}

export default Header
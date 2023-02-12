import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useContext } from "react";
import classes from "../Header.module.css";
import ReactDOM from "react-dom";
import ProfileModal from "./ProfileModal";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
const MyProfile = ({ loggedUser ,setLoggedUser}) => {
  const {
    openProfile,
    setOpenProfile,
    setChangeEmail,
    setOpenModal,
    setChangePassword,
    setDeleteUser,
  } = useContext(UserUpdateContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  //Close profile menu when clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  const handleEmail = () => {
    console.log("email");
    setChangeEmail(true);
    setOpenModal(true);
    setOpenProfile(false);
  };

  const handlePassword = () => {
    console.log("password");
    setChangePassword(true);
    setOpenModal(true);
    setOpenProfile(false);
  };
  const handleDelete = () => {
    console.log("delete");
    setDeleteUser(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedUser({});
    navigate("/login");
  };

  return (
    <>
      {ReactDOM.createPortal(
        <ProfileModal loggedUser={loggedUser} />,
        document.querySelector("#modal")
      )}
      <div className={classes["user-menu"]}>
        <div className={classes["header-btns"]}>
          <button
            className={classes["my-profile-btn"]}
            onClick={() => setOpenProfile(!openProfile)}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>{" "}
          <button className={classes.logout} onClick={handleLogout}>
            Log out
          </button>
        </div>
        {openProfile && (
          <div className={classes.container} ref={profileRef}>
            <div className={classes.options}>
              <h4> Hello {loggedUser.name}! </h4>
              <button onClick={handleEmail}>Change email</button>
              <button onClick={handlePassword}>Change password</button>
              <button onClick={handleDelete}>Delete my profile</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProfile;

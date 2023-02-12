import classes from "./ProfileModal.module.css";
import {
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
const ProfileModal = ({ loggedUser }) => {
  // console.log(loggedUser);
  const {handleClose,changeEmail,changePassword, openModal} = useContext(UserUpdateContext);
 
  const USER_URL = `http://localhost:8001/auth/login/${loggedUser.id}`;


  return (
    <>
      <div
        className={`${classes["md-modal"]} 
        ${classes["md-effect-1"]} ${openModal && classes["md-show"]}`}
      >
        <div className={classes["md-content"]}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            role='button'
            onClick={() => handleClose()}
            className={classes.close}
          />
          {/* render form for email changing */}
          {changeEmail && (
            <ChangeEmailForm loggedUser={loggedUser} USER_URL={USER_URL} />
          )}

          {/* render form for password changing */}
          {changePassword && <ChangePasswordForm USER_URL={USER_URL}  />}
        </div>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default ProfileModal;

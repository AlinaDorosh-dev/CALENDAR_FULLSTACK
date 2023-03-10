import classes from "./ProfileModal.module.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import DeleteUser from "./DeleteUser";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { UserUpdateContext } from "../../providers/userUpdateProvider";

const ProfileModal = ({ loggedUser, setLoggedUser }) => {
  const { handleClose, changeEmail, changePassword, openModal, deleteUser } =
    useContext(UserUpdateContext);

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
            <ChangeEmailForm
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
            />
          )}

          {/* render form for password changing */}
          {changePassword && <ChangePasswordForm loggedUser={loggedUser} />}

          {/* render user delete confirmation */}
          {deleteUser && (
            <DeleteUser loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          )}
        </div>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default ProfileModal;

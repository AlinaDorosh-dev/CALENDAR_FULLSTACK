import classes from "./ProfileModal.module.css";
import {
  faCircleXmark,
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import apiRequest from "../utils/apiRequest";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
const ProfileModal = ({
  loggedUser,
  changeEmail,
  setChangeEmail,
  openModal,
  setOpenModal,
  changePassword,
  setChangePassword,
  deleteUser,
  setDeleteUser,
}) => {
  //states for email changing
  const [newEmail, setNewEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  //states for password changing
  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //states for password confirmation
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  console.log(loggedUser);
  useEffect(() => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setValidEmail(regex.test(newEmail));
  }, [newEmail]);

  useEffect(() => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    setValidPassword(regex.test(newPassword));
    const match = newPassword === confirmPassword;
    setPasswordMatch(match);
  }, [newPassword, confirmPassword]);

  const USER_URL = `http://localhost:8001/auth/login/${loggedUser.id}`;

  const patchUsersEmail = async () => {
    try {
      const response = await apiRequest(USER_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "succeeded") {
        setNewEmail("");
        setSuccess(true);
        setTimeout(() => {
          setOpenModal(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const patchUsersPassword = async () => {
    try {
      const response = await apiRequest(USER_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "succeeded") {
        setNewPassword("");
        setConfirmPassword("");
        setSuccess(true);
        setTimeout(() => {
          setOpenModal(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setChangeEmail(false);
    setChangePassword(false);
    setDeleteUser(false);
    setNewPassword("");
    setConfirmPassword("");
    setNewEmail("");
  };

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
          {changeEmail && <ChangeEmailForm />}

          {/* render form for password changing */}
          {changePassword && <ChangePasswordForm />}
        </div>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default ProfileModal;

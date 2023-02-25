import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileModal.module.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DeleteUser = ({ loggedUser, USER_URL, handleClose }) => {
  return <div>
    <h3>Are you sure you want to delete your account?</h3>
    <p className={classes.error}> <FontAwesomeIcon icon={faInfoCircle} /> This action cannot be undone. All your planned events will disappear.</p>
    <div className={classes.btns}> <button className= {classes.cancel}onClick={handleClose}>Cancel</button>
    <button className={classes.confirm}>Confirm</button></div>
  </div>;
};

export default DeleteUser;

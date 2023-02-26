import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
import classes from "./ProfileModal.module.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APIRequest } from "../../utils/apiRequest";

const DeleteUser = ({ loggedUser, setLoggedUser }) => {
  const navigate = useNavigate();

  const { success, setSuccess, setOpenModal, handleClose } =
    useContext(UserUpdateContext);

  const handleDeleteUser = async () => {
    //Check if user has events
    const eventResponse = await APIRequest.getEventsByUser();
    const events = await eventResponse.json();
    const usersEvents = events.events;
    //delete all events
    if (usersEvents.length > 0) {
      usersEvents.forEach(async (event) => {
        const deleteResponse = await APIRequest.deleteEvent(event._id);
        const data = await deleteResponse.json();
      });
    }
    //delete user
    const response = await APIRequest.deleteUser(loggedUser.id);
    console.log(response);
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        setLoggedUser({});
        setOpenModal(false);
        setSuccess(false);
        navigate("/");
      }, 1500);
    }
  };
  return (
    <div>
      <h3>Are you sure you want to delete your account?</h3>
      {!success && (
        <p className={classes.error}>
          {" "}
          <FontAwesomeIcon icon={faInfoCircle} /> This action cannot be undone.
          All your planned events will disappear.
        </p>
      )}
      {success && (
        <p className={classes.success}>
          {" "}
          <FontAwesomeIcon icon={faInfoCircle} /> User {loggedUser.name} deleted
          successfully.
        </p>
      )}
      <div className={classes.btns}>
        {" "}
        <button className={classes.cancel} onClick={() => handleClose()}>
          Cancel
        </button>
        <button className={classes.confirm} onClick={() => handleDeleteUser()}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;

import apiRequest from "../../utils/apiRequest";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
import { useContext, useEffect } from "react";
import classes from "./ProfileModal.module.css";
const ChangeEmailForm = ({ loggedUser, USER_URL }) => {
  const {
    setOpenModal,
    setSuccess,
    newEmail,
    setNewEmail,
    success,
    validEmail,
    setValidEmail,
    handleClose,setChangeEmail
  } = useContext(UserUpdateContext);
  useEffect(() => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setValidEmail(regex.test(newEmail));
  }, [newEmail]);
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
          setChangeEmail(false)
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h2>Change email</h2>
      <p>You logged with email: {loggedUser.email}</p>
      {success && <p className={classes.success}>Email changed successfully</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='newEmail'>
          <h4>New email:</h4>
        </label>
        <input
          type='email'
          name='newEmail'
          id='newEmail'
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <div className={classes.btns}>
          <button
            type='button'
            className={classes.cancel}
            onClick={() => handleClose()}
          >
            Cancel{" "}
          </button>
          <button
            type='submit'
            disabled={!newEmail || !validEmail ? true : false}
            onClick={patchUsersEmail}
            className={newEmail && validEmail ? classes.confirm : "disabled"}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeEmailForm;

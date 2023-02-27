import { APIRequest } from "../../utils/apiRequest";
import { EMAIL_REGEX } from "../../utils/regEx";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./ProfileModal.module.css";
const ChangeEmailForm = ({ loggedUser, setLoggedUser }) => {
  const {
    setOpenModal,
    setSuccess,
    newEmail,
    setNewEmail,
    success,
    validEmail,
    setValidEmail,
    handleClose,
    setChangeEmail,
    errMsg,
    setErrMsg,
  } = useContext(UserUpdateContext);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(newEmail));
  }, [newEmail]);
  const updateUsersEmail = async () => {
    try {
      const response = await APIRequest.updateUser(
        { email: newEmail },
        loggedUser.id
      );

      const data = await response.json();

      if (data.status === "succeeded") {
        setNewEmail("");
        setLoggedUser({ ...loggedUser, email: newEmail });
        setSuccess(true);
        setTimeout(() => {
          setOpenModal(false);
          setChangeEmail(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrMsg("This email is already in use, please try again");
      setNewEmail("");
    }
  };
  return (
    <div>
      <h2>Change email</h2>

      <p>You logged with email: {loggedUser.email}</p>
      {success && <p className={classes.success}>Email changed successfully</p>}
      {errMsg && <p className={classes.error}>{errMsg}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='newEmail'>
          <h4>New email:</h4>
        </label>
        <input
          type='email'
          name='newEmail'
          id='newEmail'
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <p
          className={
            newEmail && !validEmail ? classes.instructions : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please insert valid e-mail
        </p>
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
            onClick={() => updateUsersEmail()}
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

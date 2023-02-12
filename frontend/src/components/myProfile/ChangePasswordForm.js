import apiRequest from "../../utils/apiRequest";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
import { useContext, useEffect } from "react";
import classes from "./ProfileModal.module.css";
const ChangePasswordForm = ({ USER_URL, handleClose }) => {
  const {
    success,
    setSuccess,
    setOpenModal,
    newPassword,
    setNewPassword,
    validPassword,
    setValidPassword,
    pwdFocus,
    setPwdFocus,
    confirmPassword,
    setConfirmPassword,
    passwordMatch,
    setPasswordMatch,
    pwdConfirmFocus,
    setPwdConfirmFocus,
  } = useContext(UserUpdateContext);

  useEffect(() => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    setValidPassword(regex.test(newPassword));
    const match = newPassword === confirmPassword;
    setPasswordMatch(match);
  }, [newPassword, confirmPassword]);

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

  return (
    <div>
      <h2>Change password:</h2>
      {success && (
        <p className={classes.success}>Password changed successfully</p>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='password'>
          <h4>
            New password:
            <span className={validPassword ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validPassword || !newPassword ? classes.hide : classes.invalid
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </h4>
        </label>
        <input
          type='password'
          id='password'
          onChange={(e) => setNewPassword(e.target.value)}
          required
          aria-invalid={validPassword ? "false" : "true"}
          //Accessability(aria described by element with id "pwdnote" for screenreaders)
          aria-describedby='pwdnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          value={newPassword}
        />

        <p
          id='pwdnote'
          className={
            pwdFocus && !validPassword
              ? classes.instructions
              : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character. <br />
          Allowed special characters:
          <span aria-label='exclamation mark'> ! </span>
          <span aria-label='at symbol'> @ </span>
          <span aria-label='hashtag'> # </span>
          <span aria-label='dollarsign'> $ </span>
          <span aria-label='percent'> % </span>
        </p>

        <label htmlFor='confirm_pwd'>
          <h4>
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={
                confirmPassword && passwordMatch ? classes.valid : classes.hide
              }
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                passwordMatch || !confirmPassword
                  ? classes.hide
                  : classes.invalid
              }
            />
          </h4>
        </label>
        <input
          type='password'
          id='confirm_pwd'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          aria-invalid={passwordMatch ? "false" : "true"}
          aria-describedby='confirmnote'
          onFocus={() => setPwdConfirmFocus(true)}
          onBlur={() => setPwdConfirmFocus(false)}
        />
        <p
          id='confirmnote'
          className={
            pwdConfirmFocus && !passwordMatch
              ? classes.instructions
              : classes.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
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
            disabled={
              !newPassword ||
              !validPassword ||
              !confirmPassword ||
              !passwordMatch
                ? true
                : false
            }
            onClick={patchUsersPassword}
            className={
              newPassword && validPassword && confirmPassword && passwordMatch
                ? classes.confirm
                : "disabled"
            }
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;

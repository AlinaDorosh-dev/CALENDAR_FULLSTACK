import { APIRequest } from "../../utils/apiRequest";
import { PWD_REGEX } from "../../utils/regEx";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserUpdateContext } from "../../providers/userUpdateProvider";
import { useContext, useEffect, useState } from "react";
import classes from "./ProfileModal.module.css";
const ChangePasswordForm = ({ loggedUser }) => {
  const [errMsg, setErrMsg] = useState("");

  const {
    success,
    setSuccess,
    setOpenModal,
    oldPassword,
    setOldPassword,
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
    handleClose,
  } = useContext(UserUpdateContext);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(newPassword));
    const match = newPassword === confirmPassword;
    setPasswordMatch(match);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [oldPassword, newPassword, confirmPassword]);

  const changeUsersPassword = async () => {
    //check if old password is correct
    try {
      const response = await APIRequest.login({
        email: loggedUser.email,
        password: oldPassword,
      });
      const data = await response.json();
      console.log(data);
      if (data.error === "Wrong email or password") {
        setErrMsg("Wrong old password, please try again");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrMsg("");
        //update password
        try {
          const response = await APIRequest.updateUser(
            { password: newPassword },
            loggedUser.id
          );

          const data = await response.json();

          if (data.status === "succeeded") {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setErrMsg("");
            setSuccess(true);
            setTimeout(() => {
              setOpenModal(false);
              setSuccess(false);
            }, 2000);
          }
        } catch (error) {
          setErrMsg(error.message);
        }
      }
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div>
      <h2>Change password:</h2>
      {success && (
        <p className={classes.success}>Password changed successfully</p>
      )}
      {errMsg && <p className={classes.error}>{errMsg}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='old_password'>
          <h4>Old password:</h4>
        </label>
        <input
          type='password'
          id='old_password'
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
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
              !oldPassword ||
              !newPassword ||
              !validPassword ||
              !confirmPassword ||
              !passwordMatch
                ? true
                : false
            }
            onClick={changeUsersPassword}
            className={
              oldPassword &&
              newPassword &&
              validPassword &&
              confirmPassword &&
              passwordMatch
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

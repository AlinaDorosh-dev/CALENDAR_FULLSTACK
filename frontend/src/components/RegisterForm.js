import classes from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useReducer } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APIRequest } from "../utils/apiRequest";
import { EMAIL_REGEX, PWD_REGEX, USER_REGEX } from "../utils/regEx";
import {
  initialRegisterState,
  REGISTER,
  registerReducer,
} from "../reducers/registerReducer";

const RegisterForm = () => {
  const nameRef = useRef(); //Set focus in user input when component loads
  const errRef = useRef(); //Set focus if we get error, so screenreader can read it

  const [state, dispatch] = useReducer(registerReducer, initialRegisterState);

  //Put focus in name field
  //Dependency array is empty, so it only happens, when the component loads
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(state.email); //email validation returns boolean
    dispatch({ type: REGISTER.EMAIL_VALIDATION, payload: result });
  }, [state.email]);

  useEffect(() => {
    const result = USER_REGEX.test(state.userName); //name validation returns boolean
    dispatch({ type: REGISTER.USER_NAME_VALIDATION, payload: result });
  }, [state.userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(state.pwd); //Pwd validation returns boolean
    dispatch({ type: REGISTER.PASSWORD_VALIDATION, payload: result });
    const match = state.pwd === state.matchPwd; //Boolean check if pwd in both fields match
    dispatch({ type: REGISTER.PWD_MATCH_VALIDATION, payload: match });
  }, [state.pwd, state.matchPwd]);

  //If we displayed error and after that any value in dependency array changes,
  //we set error to empty string again
  useEffect(() => {
    dispatch({ type: REGISTER.ERROR_MSG, payload: "" });
  }, [state.userName, state.email, state.pwd, state.matchPwd]);

  const navigate = useNavigate();

  //state for successfull registration
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If submition button hacked we can have additional check of regex validation
    const v1 = EMAIL_REGEX.test(state.email); //boolean
    const v2 = PWD_REGEX.test(state.pwd); //boolean
    const v3 = USER_REGEX.test(state.userName); // boolean
    if (!v1 || !v2 || !v3) {
      dispatch({ type: REGISTER.ERROR_MSG, payload: "Invalid Entry" });
      return;
    }

    try {
      const response = await APIRequest.register({
        email: state.email,
        password: state.pwd,
        name: state.userName,
      });
      if (response.ok) {
        dispatch({
          type: REGISTER.RESTORE_STATE,
          payload: initialRegisterState,
        });
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
      //If we try to register a user with an already registered email, we will show an alert with error
      if (response.status === 409) {
        dispatch({
          type: REGISTER.ERROR_MSG,
          payload:
            "This email is already registered, you will be redirected to login form",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      if (response === "Failed to fetch") {
        dispatch({
          type: REGISTER.ERROR_MSG,
          payload: "Conection error. Please reload the app",
        });
      }
    } catch (error) {
      dispatch({
        type: REGISTER.ERROR_MSG,
        payload: error.message,
      });
    }
  };

  return (
    <>
      <section className={classes["register-form"]}>
        {/* Parragraph for display error message.
        If no error we aply class offscreen,which removes it from visible area of screen,
        but it is still awailable for screenreaders(display none is not recomended) */}

        <p
          ref={errRef}
          className={state.errMsg ? classes["errmsg"] : classes["offscreen"]}
          aria-live='assertive'
        >
          <FontAwesomeIcon icon={faInfoCircle} /> {state.errMsg}
        </p>

        <h1>Register</h1>

        {success && (
          <p className={classes["alert-green"]}>
            <FontAwesomeIcon icon={faInfoCircle} /> User created successfully.
            You will be redirected to login form
          </p>
        )}
        {!success && (
          <form onSubmit={handleSubmit}>
            <label htmlFor='userName'>
              <h2>Name:</h2>
              <span className={state.validName ? classes.valid : classes.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  state.validName || !state.userName
                    ? classes.hide
                    : classes.invalid
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='text'
              id='userName'
              autoComplete='off'
              onChange={(e) =>
                dispatch({
                  type: REGISTER.USER_NAME_INPUT,
                  payload: e.target.value,
                })
              }
              required
              aria-invalid={state.validName ? "false" : "true"}
              //Accessability(aria described by element with id "uidnote" for screenreaders)
              aria-describedby='uidnote'
              onFocus={() =>
                dispatch({ type: REGISTER.USER_NAME_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: REGISTER.USER_NAME_FOCUS, payload: false })
              }
              value={state.userName}
              ref={nameRef}
            />
            {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
            <p
              id='uidnote'
              className={
                state.userNameFocus && state.userName && !state.validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Name hast to have at least 4 characters
            </p>

            <label htmlFor='email'>
              <h2>Email:</h2>
              <span className={state.validEmail ? classes.valid : classes.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  state.validEmail || !state.email
                    ? classes.hide
                    : classes.invalid
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='text'
              id='email'
              autoComplete='off'
              onChange={(e) =>
                dispatch({
                  type: REGISTER.EMAIL_INPUT,
                  payload: e.target.value,
                })
              }
              required
              aria-invalid={state.validEmail ? "false" : "true"}
              //Accessability(aria described by element with id "uidnote" for screenreaders)
              aria-describedby='uidnote'
              onFocus={() =>
                dispatch({ type: REGISTER.EMAIL_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: REGISTER.EMAIL_FOCUS, payload: false })
              }
              value={state.email}
            />
            {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
            <p
              id='uidnote'
              className={
                state.emailFocus && state.email && !state.validEmail
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please insert valid e-mail
            </p>

            <label htmlFor='password'>
              <h2>Password:</h2>
              <span className={state.validPwd ? classes.valid : classes.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  state.validPwd || !state.pwd ? classes.hide : classes.invalid
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) =>
                dispatch({
                  type: REGISTER.PASSWORD_INPUT,
                  payload: e.target.value,
                })
              }
              required
              aria-invalid={state.validPwd ? "false" : "true"}
              //Accessability(aria described by element with id "pwdnote" for screenreaders)
              aria-describedby='pwdnote'
              onFocus={() =>
                dispatch({ type: REGISTER.PASSWORD_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: REGISTER.PASSWORD_FOCUS, payload: false })
              }
              value={state.pwd}
            />

            <p
              id='pwdnote'
              className={
                state.pwdFocus && !state.validPwd
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters:
              <span aria-label='exclamation mark'> ! </span>
              <span aria-label='at symbol'> @ </span>
              <span aria-label='hashtag'> # </span>
              <span aria-label='dollarsign'> $ </span>
              <span aria-label='percent'> % </span>
            </p>

            <label htmlFor='confirm_pwd'>
              <h2>Confirm Password:</h2>
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  state.validMatch && state.matchPwd
                    ? classes.valid
                    : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  state.validMatch || !state.matchPwd
                    ? classes.hide
                    : classes.invalid
                }
              />
            </label>
            <input
              type='password'
              id='confirm_pwd'
              onChange={(e) =>
                dispatch({
                  type: REGISTER.PWD_MATCH_INPUT,
                  payload: e.target.value,
                })
              }
              value={state.matchPwd}
              required
              aria-invalid={state.validMatch ? "false" : "true"}
              aria-describedby='confirmnote'
              onFocus={() =>
                dispatch({ type: REGISTER.PWD_MATCH_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: REGISTER.PWD_MATCH_FOCUS, payload: false })
              }
            />
            <p
              id='confirmnote'
              className={
                state.matchFocus && !state.validMatch
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please make sure your passwords match
            </p>
            {/* Dont have to put button type = "submit" if we have only one button in form. 
              Also it creates automatically submit(onclick) event for the form
              The button will stay disabled until all 3 validation passed */}
            <button
              className={classes["submit-btn"]}
              disabled={
                !state.validName ||
                !state.validEmail ||
                !state.validPwd ||
                !state.validMatch
                  ? true
                  : false
              }
            >
              Sign Up
            </button>

            <p className={classes["sign-in"]}>
              Already registered?
              <br />
              <span className='line'>
                <Link to='/login'>SIGN IN</Link>
              </span>
            </p>
          </form>
        )}
      </section>
    </>
  );
};

export default RegisterForm;

import classes from "./RegisterForm.module.css";
//import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiRequest from "../utils/apiRequest";
//Regex for validate name and surname

//Starts with lower or uppercase letter, followed by l/u case letter, number, hyphon(-) or underscore(_) // {from 4 to 24 char}
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//Regex for validate Email

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//Regex for validate password

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const USERS_API = "http://localhost:8001/auth/signup";

const RegisterForm = () => {
  //USEREF!!!!
  //For managing focus, text selection, or media playback.
  //Pesist between renders and doesn´t make component rerender when it is changed
  //Returns object with single property CURRENT
  const nameRef = useRef(); //Set focus in user input when component loads
  const errRef = useRef(); //Set focus if we get error, so screenreader can read it

  //States for name
  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  //States for Email field
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //States for Password field
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //States for Password confirmation field
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // State for error message
  const [errMsg, setErrMsg] = useState("");

  //Put focus in email field
  //Dependency array is empty, so it only happens, when the component loads
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email); //email validation returns boolean
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(userName); //email validation returns boolean
    setValidName(result);
  }, [userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //Pwd validation returns boolean
    setValidPwd(result);
    const match = pwd === matchPwd; //Boolean check if pwd in both fields match
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //If we displayed error and after that any value in dependency array changes,
  //we setErrMsg to empty string again
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);
  const navigate = useNavigate();

  //state for existing email
  const [emailExists, setEmailExists] = useState(false);

  //state for successfull registration

  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If submition button hacked we can have additional check of regex validation
    const v1 = EMAIL_REGEX.test(email); //boolean
    const v2 = PWD_REGEX.test(pwd); //boolean
    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }
    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
        name: userName,
      }),
    };

    try {
      const response = await apiRequest(USERS_API, postOption);
      if (response.ok) {
        setUserName("");
        setPwd("");
        setEmail("");
        setMatchPwd("");
        setSuccess(true)
      }
      //If we try to register a user with an already registered email, we will show an alert with error
      if (response.status === 409) {
        setEmailExists(true);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      navigate("/login");
    }, 3500);
  };

  return (
    <>
      <section className={classes["register-form"]}>
        {/* Parragraph for display error message.
        If no error we aply class offscreen,which removes it from visible area of screen,
        but it is still awailable for screenreaders(display none is not recomended) */}
        <p
          ref={errRef}
          className={errMsg ? classes["errmsg"] : classes["offscreen"]}
          aria-live='assertive'
        >
          {errMsg}
        </p>

        <h1>Register</h1>

        {emailExists && (
          <p className={classes["alert-red"]}>
            <FontAwesomeIcon icon={faInfoCircle} /> This email is already
            registered, you will be redirected to login form
          </p>
        )}

        {success && <p className={classes["alert-green"]}>
            <FontAwesomeIcon icon={faInfoCircle} /> User created successfully. You will be redirected to login form
          </p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor='userName'>
            <h2>Name:</h2>
            <span className={validName ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                validName || !userName ? classes.hide : classes.invalid
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='text'
            id='userName'
            autoComplete='off'
            onChange={(e) => setUserName(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            //Accessability(aria described by element with id "uidnote" for screenreaders)
            aria-describedby='uidnote'
            onFocus={() => setUserNameFocus(true)}
            onBlur={() => setUserNameFocus(false)}
            value={userName}
            ref={nameRef}
          />
          {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
          <p
            id='uidnote'
            className={
              userNameFocus && userName && !validName
                ? classes.instructions
                : classes.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Name hast to have at least 4 characters
          </p>

          <label htmlFor='email'>
            <h2>Email:</h2>
            <span className={validEmail ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={validEmail || !email ? classes.hide : classes.invalid}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='text'
            id='email'
            
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            //Accessability(aria described by element with id "uidnote" for screenreaders)
            aria-describedby='uidnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            value={email}
          />
          {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
          <p
            id='uidnote'
            className={
              emailFocus && email && !validEmail
                ? classes.instructions
                : classes.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Please insert valid e-mail
          </p>

          <label htmlFor='password'>
            <h2>Password:</h2>
            <span className={validPwd ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            //Accessability(aria described by element with id "pwdnote" for screenreaders)
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            value={pwd}
          />

          <p
            id='pwdnote'
            className={
              pwdFocus && !validPwd ? classes.instructions : classes.offscreen
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
            <h2>Confirm Password:</h2>
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? classes.valid : classes.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validMatch || !matchPwd ? classes.hide : classes.invalid
              }
            />
          </label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmnote'
            className={
              matchFocus && !validMatch
                ? classes.instructions
                : classes.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          {/* Dont have to put button type = "submit" if we have only one button in form. 
        Also it creates automatically submit(onclick) event for the form
The button will stay disabled until all 3 validation passed */}
          <button
            className={classes["submit-btn"]}
            disabled={
              !validName || !validEmail || !validPwd || !validMatch
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
              <Link to='/login'>Sign In</Link>
            </span>
          </p>
        </form>
      </section>
    </>
  );
};

export default RegisterForm;

//import "./RegisterForm.css";
//import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Regex for validate userName
//Starts with lower or uppercase letter, followed by l/u case letter, number, hyphon(-) or underscore(_) // {from 4 to 24 char}
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//Regex for validate password

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const USERS_API =
  "https://users-5d04c-default-rtdb.europe-west1.firebasedatabase.app/users.json";

const RegisterForm = () => {
  //USEREF!!!!
  //For managing focus, text selection, or media playback.
  //Pesist between renders and doesn´t make component rerender when it iss changed
  //Returns object with single property CURRENT
  const userRef = useRef(); //Set focus in user input when component loads
  const errRef = useRef(); //Set focus if we get error, so screenreader can read it

  //States for User field
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

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

  // State for successfull submit
  const [success, setSuccess] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  //Put focus in user field
  //Dependency array is empty, so it only happens, when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user); //UserName validation returns boolean
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd); //Pwd validation returns boolean
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd; //Boolean check if pwd in both fields match
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //If we displayed error an after that any value in dependency array changes, we setErrMsg to empty string again
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const addNewUser = async (user, password) => {
    try {
      const response = await fetch(USERS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, password: password }),
      });
      if (!response.ok) throw Error("Please reload the app");
    } catch (err) {
      errMsg = err.message;
    } finally {
      return errMsg;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If submition button hacked we can have additional check of regex validation
    const v1 = USER_REGEX.test(user); //boolean
    const v2 = PWD_REGEX.test(pwd); //boolean
    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }
    console.log(user, pwd);
    setSuccess(true); //just for try to submit without backend
    console.log("Succesfull submit");
    addNewUser(user, pwd);
    setPwd("");
    setUser("");
    setMatchPwd("");
    setOpenModal(true);
  };

  return (
    <>
      {/* {openModal && <LoginModal setOpenModal={setOpenModal} />} */}
      <section>
        {/* Parragraph for display error message.
        If no error we aply class offscreen,which removes it from visible area of screen,
        but it is still awailable for screenreaders(display none is not recomended) */}
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live='assertive'
        >
          {errMsg}
        </p>

        <h1>Register</h1>

        <form onSubmit={handleSubmit} className='register-form'>
          <label htmlFor='username'>
            Username:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            //Accessability(aria described by element with id "uidnote" for screenreaders)
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            value={user}
          />
          {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
          <p
            id='uidnote'
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br />
            Must begin with letter. <br />
            Letters,numbers,underscores,hyphens allowed.
          </p>

          <label htmlFor='password'>
            Password:
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
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
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
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
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
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
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          {/* Dont have to put button type = "submit" if we have only one button in form. 
        Also it creates automatically submit(onclick) event for the form
The button will stay disabled until all 3 validation passed */}
          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </button>

          <p>
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
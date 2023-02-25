import classes from "./LoginForm.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIRequest } from "../utils/apiRequest";
const LoginForm = ({ setLoggedUser }) => {
  const emailRef = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPwd("");
      setEmail("");
      const response = await APIRequest.login({
        email: email,
        password: pwd,
      });
      if (response === "Failed to fetch") {
        setErrMsg("Conection error. Please reload the app");
        setSuccess(false);
      }

      const data = await response.json();
      if (data.error === "Wrong email or password") {
        setErrMsg(data.error);
        setSuccess(false);
      } else {
        setLoggedUser(data.data);
        const { token, refreshToken, id } = data.data;
        // set token to localstorage item
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        //udate users last login date
        try {
          await APIRequest.updateUser(
            {
              lastLogin: new Date(),
            },
            id
          );
        } catch (error) {
          setErrMsg(error.message);
        }

        setSuccess(true);
        setTimeout(() => {
          navigate("/calendar");
        }, 1200);
      }
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div className={classes["login-form"]}>
      <h1> Sign In</h1>
      {errMsg && <p className={classes.errMsg}>{errMsg}</p>}
      {success && <p className={classes.success}>Signed in successfully</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          <h2>Email:</h2>
        </label>
        <input
          type='text'
          id='email'
          ref={emailRef}
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder='Email'
        />
        <label htmlFor='password'>
          <h2>Password:</h2>
        </label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          placeholder='Password'
        />

        <button className={classes["submit-btn"]}>Sign In</button>

        <p className={classes["sign-up"]}>
          Need an account? <br />
          <span>
            <Link to='/signup'>SIGN UP</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

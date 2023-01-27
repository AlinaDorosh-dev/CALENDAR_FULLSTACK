import classes from"./LoginForm.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPostRequest } from "../utils/apiPostRequest";
const LoginForm = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const  LOGIN_URL = "http://localhost:8001/auth/login"
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    setPwd("");
    setEmail("");
   
      const response = await apiPostRequest(LOGIN_URL, email, pwd);
      const data = await response.json();
      const {token,id} = data.data;

      // set token to localstorage item
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      
      console.log("token", data.data.token);
      navigate('/calendar');
  };

  return (
    <div className={classes["login-form"]}>
      <h1> Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <h2>Email:</h2>
        </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder="Email"
        />
        <label htmlFor="password">
          <h2>Password:</h2>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          placeholder="Password"
        />

        <button className={classes["submit-btn"]}>Sign In</button>

        <p className={classes["sign-up"]}>
          Need an account? <br />
          <span>
            <Link to="/signup">SIGN UP</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

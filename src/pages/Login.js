import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import Axios from "axios";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import blackground from "../images/blackground1.png";

import { UserContext } from "../App";

import "./login.css";

const Login = () => {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [regErrorMsg, setRegErrorMsg] = useState("");

  const [mask, setMask] = useState(false);

  const cookies = new Cookies();

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("../Profile", { replace: true });
    }
  }, [user]);

  function PasswordToggle() {
    setMask(!mask);
  }

  const checkLogin = (e) => {
    setRegErrorMsg("");
    e.preventDefault();

    if (!passwordReg) {
      setRegErrorMsg("Password is required.");
    }
    if (!emailReg) {
      setRegErrorMsg("Email Adress is required.");
    }

    if (passwordReg && emailReg) {
      login();
    }
  };

  const login = () => {
    Axios.get(
      `http://localhost:5000/login_accounts/${emailReg}/${passwordReg}`
    ).then((response) => {
      if (response.data == "") {
        setRegErrorMsg("The password or email account is incorrect.");
      } else {
        cookies.set("user", response.data, { path: "/" });
        setUser(response.data);
        navigate("../Profile", { replace: true });
      }
    });
  };

  return (
    <div className="login">
      <NavigationBar />
      <img
        src={blackground}
        alt="loginBlackground"
        className="loginBackground"
      ></img>
      <div className="loginContainer">
        <div className="loginForm">
          <form id="loginform" onSubmit={checkLogin}>
            <div className="loginTitle">Login</div>
            <input
              type="text"
              placeholder="Email Address"
              className="loginEmailField"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />
            <div className="passwordLogin">
              <input
                type={mask ? "text" : "password"}
                placeholder="Password"
                className="loginPasswordField"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
              <span
                className={mask ? "far fa-eye-slash" : "far fa-eye"}
                onClick={PasswordToggle}
              />
            </div>
            <button className="submitLogin" onClick={checkLogin}>
              {" "}
              Login <i className="fa-solid fa-right-to-bracket"></i>
            </button>

            <div className="regErrorMsg">{regErrorMsg ? regErrorMsg : ""}</div>

            <div className="loginFormBottom">
              <a className="goregister" href="/register">
                Create Account
              </a>
              <a className="goforgotpassword" href="/forgotpassword">
                Forgot Password
              </a>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Login;

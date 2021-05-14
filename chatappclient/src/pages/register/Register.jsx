import React, { useRef, useState } from "react";
import "./register.css";
import { Person, Lock } from "@material-ui/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const history = useHistory();
  let login = useRef("");
  let password = useRef("");
  let confirmPassword = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendUser = async () => {
      if (password.current.value !== confirmPassword.current.value) {
        confirmPassword.current.setCustomValidity(`Passwords don't match`);
      }
      try {
        await axios.post(
          "https://chat-app-mernn.herokuapp.com/api/users/register",
          {
            username: login.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
          }
        );
        login.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
        alert("Zarejestrowano pomyślnie!");
        history.push("/login");
      } catch (err) {
        console.log(err);
        setError((prev) => !prev);
        setTimeout(() => {
          setError((prev) => !prev);
        }, 6000);
      }
    };
    sendUser();
  };
  return (
    <div className="loginPage">
      <div className="Loginleft">
        <div>
          <img
            src="https://609d6241cada021bf63ee30b--chat-app-mernn.netlify.app/images/logo.jpg"
            alt=""
          />
          <span>Chat App</span>
          <p className="pLogin">Let's talk with friends!</p>
          <p>made by Kamil Pędziach</p>
        </div>
      </div>
      <div className="Loginright">
        <div className="loginrightwrapper">
          <span>Sign up</span>
          <form onSubmit={handleSubmit} className="formLogin">
            <div className="inputsLogin">
              <Person className="icon" />
              <input
                type="text"
                placeholder="username..."
                ref={login}
                required
                minLength="3"
              />
            </div>
            <div className="inputsLogin">
              <Lock className="icon" />
              <input
                type="password"
                placeholder="password..."
                ref={password}
                required
                minLength="6"
              />
            </div>
            <div className="inputsLogin">
              <Lock className="icon" />
              <input
                type="password"
                placeholder="confirm password..."
                ref={confirmPassword}
                required
                minLength="6"
              />
            </div>
            {error && (
              <div className="errorRegister">Nazwa użytkownika jest zajęta</div>
            )}
            <button type="submit">Create an account</button>
          </form>

          <div className="dontHaveAccount">
            <Link
              to="/login"
              className="LinkLogin"
              style={{ textDecoration: "none" }}
            >
              <span className="dontHaveAccount1">I have an account</span>
              <span className="dontHaveAccount2">Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Person, Lock } from "@material-ui/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../../context/Context";
const Login = () => {
  const history = useHistory();
  let login = useRef("");
  let password = useRef("");
  const [error, setError] = useState(false);
  const { dispatch } = useContext(Context);
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendLoginUser = async () => {
      try {
        dispatch({ type: "LOGIN_START" });
        const res = await axios.post(
          "https://chat-app-mernn.herokuapp.com/api/users/login",
          {
            username: login.current.value,
            password: password.current.value,
          }
        );
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        alert("Zalogowano pomyślnie!");
        history.push("/");
      } catch (err) {
        console.log(err);
        dispatch({ type: "LOGIN_FAILURE" });
        setError((prev) => !prev);
        setTimeout(() => {
          setError((prev) => !prev);
        }, 6000);
      }
    };
    sendLoginUser();
  };
  return (
    <div className="loginPage">
      <div className="Loginleft">
        <div>
          <img src="https://ibb.co/58SSDdy" alt="" />
          <span>Chat App</span>
          <p className="pLogin">Let's talk with friends!</p>
          <p>made by Kamil Pędziach</p>
        </div>
      </div>
      <div className="Loginright">
        <div className="loginrightwrapper">
          <span>Log In</span>
          <form onSubmit={handleSubmit} className="formLogin">
            <div className="inputsLogin">
              <Person className="icon" />
              <input
                type="text"
                placeholder="username..."
                ref={login}
                required
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
            {error && <div className="errorLogin">Podałeś błędne dane!</div>}
            <button type="submit">Start chatting!</button>
          </form>
          <div className="dontHaveAccount">
            <Link
              to="/register"
              className="LinkLogin"
              style={{ textDecoration: "none" }}
            >
              <span className="dontHaveAccount1">Don't have an account?</span>
              <span className="dontHaveAccount2">create new one</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

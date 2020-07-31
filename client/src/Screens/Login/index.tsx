import React, { useState } from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/User/creators";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="container-login">
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(email, password));
        }}
      >
        <fieldset id="login-fieldset">
          <legend id="login-legend"> Minesweeper</legend>
          <label className="login-label">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </label>

          <label className="login-label">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="login-input"
            />
          </label>

          <button className="button-submit">Login</button>
        </fieldset>
        <Link to="/register" id="register-link">
          Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;

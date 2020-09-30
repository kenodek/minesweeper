import React, { useState } from "react";
import "../../global_styles/index.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/User/creators";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/store";

const Login = () => {
  const dispatch = useDispatch();
  const loginError = useTypedSelector((state) => state.user.loginError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-full-screen flex-center pd-10">
      <form
        className="form pd-10"
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
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
          {loginError && <span className="form-error">{loginError}</span>}

          <button className="auto flex-center">Login</button>
        </fieldset>

        <Link to="/register" className="form-link">
          Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;

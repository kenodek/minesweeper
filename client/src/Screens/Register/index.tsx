import React, { useState } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { register } from "../../redux/User/creators";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/store";

const Register = () => {
  const dispatch = useDispatch();
  const registerError = useTypedSelector((state) => state.user.registerError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div id="container-register">
      <form
        id="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(register(email, password, passwordConfirmation));
        }}
      >
        <fieldset id="register-fieldset">
          <legend id="register-legend"> Minesweeper</legend>
          <label className="register-label">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
          </label>

          <label className="register-label">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="register-input"
            />
          </label>

          <label className="register-label">
            Confirm password
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
              className="register-input"
            />
          </label>

          {registerError && <span id="register-error">{registerError}</span>}

          <button className="button-submit-register">Register</button>
        </fieldset>

        <Link to="/" id="login-link">
          Login here
        </Link>
      </form>
    </div>
  );
};

export default Register;

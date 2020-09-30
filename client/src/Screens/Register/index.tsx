import React, { useState } from "react";
import "../../global_styles/index.scss";
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
    <div className="container-full-screen dark-bg flex-center pd-10">
      <form
        className="form pd-10"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(register(email, password, passwordConfirmation));
        }}
      >
        <fieldset>
          <legend> Minesweeper</legend>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </label>

          <label>
            Confirm password
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
            />
          </label>

          {registerError && <span className="form-error">{registerError}</span>}

          <button className="size-auto flex-center">Register</button>
        </fieldset>

        <Link to="/" className="form-link">
          Login here
        </Link>
      </form>
    </div>
  );
};

export default Register;

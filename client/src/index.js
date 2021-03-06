import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Screens/Game";
import Login from "./Screens/Login";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./global_components/PrivateRoute";
import history from "./global_components/History/index.ts";
import Register from "./Screens/Register";
import { IconContext } from "react-icons";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IconContext.Provider
        value={{ color: "blue", className: "global-class-name", size: "2em" }}
      >
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <PrivateRoute path="/game" exact>
              <Game />
            </PrivateRoute>
          </Switch>
        </Router>
      </IconContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

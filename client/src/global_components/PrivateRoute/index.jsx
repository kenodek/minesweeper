import React from "react";
import {useSelector} from "react-redux";
import {
  Route,
  Redirect,
} from "react-router-dom";

const PrivateRoute = ({ component:Component, ...rest }) => {
    //const token = useSelector(state => state.user.token)
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("minesweeper_token") ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;
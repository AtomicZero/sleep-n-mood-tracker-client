import React, { useContext } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";

import { AppContext } from "./App";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Welcome } from "./pages/Welcome";


const UnauthorisedWrapper = (props) => {
  return (
    <div>
      <p>Please login before accessing the welcome page</p>
      {props.children}
    </div>
  );
};

export const Router = () => {
  const appContext = useContext(AppContext);
  const { user } = appContext;

  return (
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/welcome">welcome</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/welcome">
            {user.token ? (
              <Welcome />
            ) : (
                <UnauthorisedWrapper>
                  <Login />
                </UnauthorisedWrapper>
              )}
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};
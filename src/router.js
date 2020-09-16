import React, { useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import UserContext from "./context/UserContext";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Welcome } from "./pages/Welcome";
import { Plan } from "./pages/Plan";

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact>
        {user.token ? <Redirect to="/welcome" /> : <Login />}
      </Route>
      <Route path="/login">
        {user.token ? <Redirect to="/welcome" /> : <Login />}
      </Route>
      <Route path="/register">
        {user.token ? <Redirect to="/welcome" /> : <Register />}
      </Route>
      <Route path="/welcome">
        {user.token ? <Welcome /> : <Redirect to="/login" />}
      </Route>
      <Route path="/plan">
        {user.token ? <Plan /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};

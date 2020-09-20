import React, { useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import UserContext from "./context/UserContext";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import MyPlans from "./pages/MyPlans";
import Dashboard from "./pages/Dashboard";

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact>
        {user.token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        {user.token ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/register">
        {user.token ? <Redirect to="/dashboard" /> : <Register />}
      </Route>
      <Route path="/dashboard">
        {user.token ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route path="/my-plans">
        {user.token ? <MyPlans /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};

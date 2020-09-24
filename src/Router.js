import React, { useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import UserContext from "./context/UserContext";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import MyPlans from "./pages/MyPlans";
import Dashboard from "./pages/Dashboard";
import MyPlan from "./pages/MyPlan";

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact>
        {user.token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {user.token ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route exact path="/register">
        {user.token ? <Redirect to="/dashboard" /> : <Register />}
      </Route>
      <Route exact path="/dashboard">
        {user.token ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/plans">
        {user.token ? <MyPlans /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/plans/:planId">
        {user.token ? <MyPlan /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};

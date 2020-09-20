import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import UserContext from "../context/UserContext";
import ProtectedRoutes from "./ProtectedRoutes";

const NavBar = () => {
  const { user } = useContext(UserContext);

  if (user.token) {
    return <ProtectedRoutes />;
  }
  return (
    <Menu mode="horizontal" style={{ padding: "0px 50px" }}>
      <Menu.Item key="login">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;

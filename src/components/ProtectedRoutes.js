import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import UserContext from "../context/UserContext";

const ProtectedRoutes = () => {
  const { setUser } = useContext(UserContext);

  return (
    <Menu mode="horizontal" style={{ padding: "0px 50px" }}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="plans">
        <Link to="/plans">My Plans</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => setUser({})}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default ProtectedRoutes;

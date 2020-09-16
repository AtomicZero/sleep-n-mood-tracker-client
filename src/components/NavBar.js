import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/UserContext";
import ProtectedRoutes from "./ProtectedRoutes";

const NavBar = () => {
  const { user } = useContext(UserContext);

  if (user.token) {
    return <ProtectedRoutes />;
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

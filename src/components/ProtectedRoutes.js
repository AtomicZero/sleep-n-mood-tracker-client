import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoutes = () => {
  const { setUser } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/welcome">welcome</Link>
        </li>
        <li>
          <Link to="/plan">plan</Link>
        </li>
        <li onClick={() => setUser({})}>logout</li>
      </ul>
    </nav>
  );
};

export default ProtectedRoutes;

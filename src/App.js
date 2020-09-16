import React, { useState, createContext } from "react";
import { HashRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserContext from "./context/UserContext";
import { Router } from "./Router";

export const App = () => {
  const [user, setUser] = useState({});

  return (
    <HashRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Router />
      </UserContext.Provider>
    </HashRouter>
  );
};

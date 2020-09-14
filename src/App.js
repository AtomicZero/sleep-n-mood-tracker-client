import React, { useState, createContext } from "react";
import { Router } from "./router";

export const AppContext = createContext();

export const App = () => {
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router />
    </AppContext.Provider>
  );
};
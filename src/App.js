import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import { Layout } from "antd";

import UserContext from "./context/UserContext";
import NavBar from "./components/NavBar";
import { Router } from "./Router";

const { Header, Content } = Layout;

export const App = () => {
  const [user, setUser] = useState({});

  return (
    <HashRouter>
      <Layout>
        <UserContext.Provider value={{ user, setUser }}>
          <Header style={{ padding: "0px" }}>
            <NavBar />
          </Header>
          <Content>
            <Router />
          </Content>
        </UserContext.Provider>
      </Layout>
    </HashRouter>
  );
};

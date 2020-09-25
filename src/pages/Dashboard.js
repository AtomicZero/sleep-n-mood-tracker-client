import React, { useContext, useEffect, useState } from "react";
import { Spin, Modal, Row } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";
import { BASE_URL } from "../api/constants";
import LogChart from "../components/LogChart";

const Dashboard = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/logs`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLogs(data.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Modal.error({
          title: "Error",
          content: err.message,
          onOk() {
            history.push("/dashboard");
          },
        });
      }
    };

    fetchData();
  }, [history, user.token]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.05)",
          borderRadius: "4px",
          marginBottom: "20px",
          padding: "30px 50px",
          margin: "20px 0",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <Row
        style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
        justify="center"
        align="middle"
        background-color="#d3adf7"
      >
        <LogChart logs={logs} />
      </Row>
    </div>
  );
};

export default Dashboard;

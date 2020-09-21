import React, { useContext, useEffect, useState } from "react";
import { Spin, Modal } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import  PlanSetUp  from "../components/PlanSetUp"


import UserContext from "../context/UserContext";
import { BASE_URL } from "../api/constants";

const MyPlans = () => {

  const history = useHistory();
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/plans`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPlans(data.results);
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

  console.log(plans);
  return (
    <div>
      <PlanSetUp />
    </div>
  );
};

export default MyPlans;

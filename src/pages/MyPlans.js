import React, { useContext, useEffect, useState } from "react";
import { Spin, Modal, Button, Row } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import PlanSetUp from "../components/PlanSetUp";
import UserContext from "../context/UserContext";
import { BASE_URL } from "../api/constants";
import Plans from "../components/Plans";

const MyPlans = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = (e) => {
    setShowModal(false);
  };

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
        >
        <Button
          type="primary"
          onClick={handleShowModal}
          size="large"
          style={{ width: "50%" }}
        >
          <span>
            <PlusOutlined /> Plan
          </span>
        </Button>
      </Row>
      <Modal title="Add New Plan" visible={showModal} footer={null}>
        <PlanSetUp onCancel={handleHideModal} />
      </Modal>
      <Plans plans={plans} />
    </div>
  );
};

export default MyPlans;

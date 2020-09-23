import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Spin, Modal, PageHeader, Button, Descriptions, Card, Row } from "antd";
import axios from "axios";
import { format } from "date-fns";

import { BASE_URL } from "../api/constants";
import UserContext from "../context/UserContext";

const MyPlan = () => {
  const { planId } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/plans/${planId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPlan(data.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Modal.error({
          title: "Error",
          content: err.message,
          onOk() {
            history.push("/plans");
          },
        });
      }
    };

    fetchData();
  }, [history, user.token, planId]);

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

  const renderPlanDetails = () => {
    return (
      <div
        style={{
          padding: "24px",
        }}
      >
        <PageHeader
          ghost={false}
          onBack={() => history.goBack()}
          title={plan.title}
          subTitle={plan.status}
          extra={[
            <Button key="edit" type="primary">
              Edit
            </Button>,
          ]}
        >
          <Descriptions size="small">
            <Descriptions.Item label="Desired Hours">
              {plan.desiredHours} hrs
            </Descriptions.Item>
            <Descriptions.Item label="Week Commencing">
              {format(new Date(plan.weekCommencing), "EEE do MMM yyyy")}
            </Descriptions.Item>
            <Descriptions.Item label="Creation At">
              {format(new Date(plan.weekCommencing), "dd-MM-yyyy")}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    );
  };

  const renderLogCard = (log) => {
    return (
      <Card
        title={log.day}
        extra={<Link to={`/plans/${plan._id}`}>Edit</Link>}
        style={{ width: 300, margin: "20px" }}
        key={log._id}
      >
        <h1 style={{ textAlign: "center" }}>{log.actualSleepHours}</h1>
        <h3 style={{ textAlign: "center" }}>{log.mood.toUpperCase()}</h3>
        <p style={{ textAlign: "center" }}>
          {format(new Date(log.date), "EEE do MMM yyyy")}
        </p>
      </Card>
    );
  };

  const renderLogs = () => {
    const { logs } = plan;

    if (logs.length) {
      return (
        <Row
          style={{ display: "flex", flexWrap: "wrap" }}
          justify="center"
          align="middle"
        >
          {logs.map(renderLogCard)}
        </Row>
      );
    }

    return (
      <Row
        style={{ display: "flex", flexWrap: "wrap" }}
        justify="center"
        align="middle"
      >
        <h3>No logs</h3>
      </Row>
    );
  };

  return (
    <div>
      {renderPlanDetails()}
      {renderLogs()}
    </div>
  );
};

export default MyPlan;

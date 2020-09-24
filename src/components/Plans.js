import React from "react";
import { Card, Row } from "antd";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const renderPlanCard = (plan) => {
  return (
    <Card
      key={plan._id}
      title={
        <span>
          {plan.status === "COMPLETE" ? (
            <CheckOutlined style={{ color: "green", marginRight: "8px" }} />
          ) : (
            <ExclamationCircleOutlined
              style={{ color: "orange", marginRight: "8px" }}
            />
          )}{" "}
          {plan.title}
        </span>
      }
      extra={<Link to={`/plans/${plan._id}`}>View</Link>}
      style={{ width: 300, margin: "20px" }}
    >
      <h3 style={{ textAlign: "center" }}>{plan.desiredHours} hrs</h3>
      <p style={{ textAlign: "center" }}>
        Week starting:{" "}
        {format(new Date(plan.weekCommencing), "EEE do MMM yyyy")}
      </p>
    </Card>
  );
};

const Plans = ({ plans = [] }) => {
  if (plans.length) {
    return (
      <Row
        style={{ display: "flex", flexWrap: "wrap" }}
        justify="center"
        align="middle"
      >
        {plans.map(renderPlanCard)}
      </Row>
    );
  }

  return (
    <Row
      style={{ display: "flex", flexWrap: "wrap" }}
      justify="center"
      align="middle"
    >
      <h3>No plans</h3>
    </Row>
  );
};

export default Plans;

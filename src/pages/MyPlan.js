import React from "react";
import { useParams } from "react-router-dom";

const MyPlan = () => {
  const { planId } = useParams();

  return <div>{planId}</div>;
};

export default MyPlan;

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { format } from "date-fns";

const LogChart = ({ logs }) => {
  console.log(logs);

  const data = logs.map((log) => {
    const date = format(new Date(log.date), "dd-MM-yy");
    return {
      ...log,
      date,
    };
  });

  const totalSleepHours = logs.reduce((acc, log) => {
    acc += log.actualSleepHours;
    return acc;
  }, 0);

  console.log("TOTAL SLEEP HOURS", totalSleepHours);

  let color = "red";

  if (totalSleepHours < 30) {
    color = "green";
  } else {
    color = "blue";
  }

  return (
    <LineChart width={600} height={400} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="actualSleepHours"
        stroke={color}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
};

export default LogChart;

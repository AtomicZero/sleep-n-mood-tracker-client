import React from "react";
import { Progress, Row } from 'antd';


const SleepStat = () => {
  return (
    <div>
    <Row       
    type="flex"
    justify="center"
    align="middle">
    <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
    <Progress type="circle" percent={100} format={() => 'Done'} />
    </Row>
    </div>
  );
}

export default SleepStat;

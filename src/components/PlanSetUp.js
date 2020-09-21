import React from "react";
import { isMobile } from "react-device-detect";
import { Form, Input, Button, Row, Col } from "antd";

const PlanSetUp = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Row       
type="flex"
justify="center"
align="middle"
>
<Col
  span={isMobile ? 24 : 12}
  style={{ border: "solid 1px #8a838a", backgroundColor: "white" }}
>
  <Form
    {...layout}
    name="basic"
    initialValues={{ remember: true }}
    style={{ margin: "50px" }}
  >
    <Form.Item
      label="7-Day Sleep Plan Name"
      name="plan name"
      rules={[{ required: true, message: "Please input the name of your 7 day sleep plan" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Start Date"
      name="start date"
      rules={[{ required: true, message: "Please input the start date for your 7 day sleep plan" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Your sleep goal (total hours)"
      name="sleep goal"
      rules={[{ required: true, message: "Please input your sleep goal totals" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item 
      justify="center"
      align="middle">
      <Button 
      type="primary" 
      htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
</Col>
</Row>

  )
}




export default PlanSetUp;
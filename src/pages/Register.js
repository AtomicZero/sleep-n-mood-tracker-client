import React from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { Form, Input, Button, Row, Col, Modal } from "antd";

import { REGISTER_URL } from "../api/constants";
import Background from "../images/4k-night-forest-material-design-art.jpg";
import { useHistory } from "react-router-dom";

export const Register = () => {
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(REGISTER_URL, values);

      if (data.success) {
        Modal.success({
          content: data.message,
          onOk() {
            history.push("/login");
          },
        });
      } else {
        Modal.error({
          title: "Error",
          content: "Failed to create an account. Please try again later.",
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        minHeight: "700px",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "fit",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Col
        span={isMobile ? 24 : 12}
        style={{ border: "solid 1px #8a838a", backgroundColor: "white" }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ margin: "50px" }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

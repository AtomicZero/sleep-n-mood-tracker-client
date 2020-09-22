import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Modal,
} from "antd";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../api/constants";

const PlanSetUp = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const onFinish = async ({ title, desiredHours, weekCommencing }) => {
    try {
      const payload = {
        title,
        desiredHours,
        weekCommencing: weekCommencing.toDate(),
      };

      const { _id: planId } = await axios.post(`${BASE_URL}/api/plans`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      Modal.success({
        content: "Yeah",
        onOk() {
          history.push(`/plans/${planId}`);
        },
      });
    } catch (err) {
      Modal.error({
        title: "Failed to create a sleep plan",
        content: err.message,
      });
    }
  };

  return (
    <Row type="flex" justify="center" align="middle">
      <Col
        span={isMobile ? 24 : 12}
        style={{ border: "solid 1px #8a838a", backgroundColor: "white" }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          style={{ margin: "50px" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Plan Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input a plan title for your sleep plan",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sleep Goal Hours"
            name="desiredHours"
            rules={[
              {
                required: true,
                message:
                  "Please input your sleep goal hours for your sleep plan",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="For Week Commencing"
            name="weekCommencing"
            rules={[
              {
                required: true,
                message:
                  "Please input the week commencing date for your sleep plan",
              },
            ]}
          >
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item justify="center" align="middle">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default PlanSetUp;

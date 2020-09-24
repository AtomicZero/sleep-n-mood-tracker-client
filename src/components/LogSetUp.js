import React, { useContext } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Modal } from "antd";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../api/constants";

const LogSetUp = ({ onCancel, setPlan }) => {
  const { planId } = useParams();
  const { user } = useContext(UserContext);

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const onFinish = async (values) => {
    try {
      const { data: plan } = await axios.post(
        `${BASE_URL}/api/plans/${planId}/logs`,
        values,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      Modal.success({
        content: "Thank you for adding your log.",
        onOk() {
          setPlan(plan);
          onCancel();
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
    <div justify="center" align="middle">
      <Form
        {...layout}
        name="addLogForm"
        initialValues={{ remember: true }}
        style={{ margin: "50px" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Sleep Hours"
          name="actualSleepHours"
          rules={[
            {
              required: true,
              message: "Please input your sleep hours for your log",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the date for your log",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Mood"
          name="mood"
          rules={[
            {
              required: true,
              message: "Please input a mood for your log",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item justify="center" align="middle">
          <Button
            type="default"
            htmlType="button"
            onClick={onCancel}
            style={{ marginRight: "8px" }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogSetUp;

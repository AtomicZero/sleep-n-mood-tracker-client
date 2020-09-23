import React, { useContext } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Modal } from "antd";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../api/constants";

const PlanSetUp = ({ onCancel }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const onFinish = async ({ title, desiredHours, weekCommencing }) => {
    try {
      const payload = {
        title,
        desiredHours,
        weekCommencing: weekCommencing.toDate(),
      };

      const {
        data: { _id: planId },
      } = await axios.post(`${BASE_URL}/api/plans`, payload, {
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
    <div justify="center" align="middle">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        style={{ margin: "50px" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
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
          label="Sleep Hours"
          name="desiredHours"
          rules={[
            {
              required: true,
              message: "Please input your sleep goal hours for your sleep plan",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Week Commencing"
          name="weekCommencing"
          rules={[
            {
              required: true,
              message:
                "Please input the week commencing date for your sleep plan",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
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

export default PlanSetUp;

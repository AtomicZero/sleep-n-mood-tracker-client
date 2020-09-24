import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Spin,
  Modal,
  PageHeader,
  Button,
  Descriptions,
  Card,
  Row,
  InputNumber,
  Input,
  DatePicker,
  Form,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { format } from "date-fns";
import moment from "moment";

import { BASE_URL } from "../api/constants";
import UserContext from "../context/UserContext";
import LogSetUp from "../components/LogSetUp";

const MyPlan = () => {
  const { planId } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleClickEdit = () => {
    setEditMode(!editMode);
  };

  const handleClickAdd = () => {
    setShowModal(true);
  };

  const handleHideModal = (e) => {
    setShowModal(false);
  };

  const handleLogUpdate = async ({
    logId,
    date,
    mood,
    actualSleepHours,
  }) => {
    try {
      const { data: log } = await axios.put(
        `${BASE_URL}/api/logs/${logId}`,
        { date, mood, actualSleepHours },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      Modal.success({
        content: "Your log has been successfully updated",
        onOk() {
          const filteredLogs = plan.logs.filter(each => each._id !== logId)
          const newLogs = [...filteredLogs, log];

          setPlan({
            ...plan,
            logs: newLogs.sort((a, b) => b.date - a.date),
          })

          setEditMode(false);
        },
      });
    } catch (err) {
      Modal.error({
        title: "Failed to update log",
        content: err.message,
      });
    }
  };

  const handleLogDelete = (event) => {
    console.log("delete", event.currentTarget.id);
  };

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
            <Button key="edit" type="primary" onClick={handleClickEdit}>
              {editMode ? "Edit Mode" : "Edit"}
            </Button>,
            editMode ? null : (
              <Button key="add" type="primary" onClick={handleClickAdd}>
                Add Log
              </Button>
            ),
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
    if (editMode) {
      return (
        <Card
          title={log.day}
          extra={
            <CloseCircleOutlined
              style={{ color: "red" }}
              onClick={handleLogDelete}
              id={log._id}
            />
          }
          style={{ width: 300, margin: "20px" }}
          key={log._id}
        >
          <Form
            name="editLog"
            initialValues={{
              logId: log._id,
              actualSleepHours: log.actualSleepHours,
              mood: log.mood,
              date: moment(log.date),
            }}
            onFinish={handleLogUpdate}
          >
            <Form.Item
              name="actualSleepHours"
              rules={[
                {
                  required: true,
                  message:
                    "Please input your sleep goal hours for your sleep plan",
                },
              ]}
              style={{ textAlign: "center", marginBottom: "8px" }}
            >
              <InputNumber size="large" min={0} max={24} />
            </Form.Item>
            <Form.Item
              name="mood"
              rules={[
                {
                  required: true,
                  message: "Please input your mood",
                },
              ]}
              style={{ textAlign: "center", marginBottom: "8px" }}
            >
              <Input size="large" placeholder="Your mood..." />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input log date",
                },
              ]}
              style={{ textAlign: "center", marginBottom: "8px" }}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              name="logId"
              hidden
            >
              <Input value={log._id} />
            </Form.Item>
            <Form.Item
              justify="center"
              align="middle"
              style={{ textAlign: "center", marginBottom: "8px" }}
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Card>
      );
    }
    return (
      <Card
        title={log.day}
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
      <Modal title="Add New Log" visible={showModal} footer={null}>
        <LogSetUp onCancel={handleHideModal} setPlan={setPlan} />
      </Modal>
    </div>
  );
};

export default MyPlan;

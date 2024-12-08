/* eslint-disable no-unused-vars */
// src/pages/LoginPage.jsx
import { Form, Input, Button, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../services/AuthContext";
import { createRequest } from "../services/api";

const { Title } = Typography;

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = async (values) => {
    const { username, password } = values;
    if (password.length < 8 || password.length > 10) {
      setError("Password must be between 8 and 10 characters.");
      return;
    }
    try {
      const response = await createRequest("/auth/authenticate", {
        username,
        password,
      });
      const { token, role } = response;
      login(token, role);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <Title level={3} className="text-center mb-4">
        Login
      </Title>
      {error && (
        <Alert message={error} type="error" showIcon className="mb-4" />
      )}
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password." }]}
          extra="8-10 characters"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block className="mt-2">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;

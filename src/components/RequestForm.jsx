/* eslint-disable no-unused-vars */
// src/pages/RequestService.jsx
import { useState } from "react";
import { Form, Input, Button, Typography, DatePicker, Alert } from "antd";
import { createRequest } from "../services/api";
import dayjs from "dayjs";

const { Title } = Typography;

const RequestService = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    const data = {
      clientName: values.clientName,
      address: values.address,
      phoneNumber: values.phoneNumber,
      deviceBrand: values.deviceBrand,
      deviceModel: values.deviceModel,
      serialNumber: values.serialNumber,
      symptoms: values.symptoms,
      depositDate: values.depositDate
        ? values.depositDate.format("YYYY-MM-DD")
        : "",
      expectedReturnDate: values.expectedReturnDate
        ? values.expectedReturnDate.format("YYYY-MM-DD")
        : "",
    };

    try {
      await createRequest("/repair-requests", data);
      setSuccess("Repair request created successfully!");
      setError("");
    } catch (err) {
      setError("Failed to create repair request. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-sm">
      <Title level={3}>Request Service</Title>
      {success && (
        <Alert message={success} type="success" showIcon className="mb-4" />
      )}
      {error && (
        <Alert message={error} type="error" showIcon className="mb-4" />
      )}
      <Form layout="vertical" onFinish={onFinish}>
        <Title level={5}>Client Information</Title>
        <Form.Item
          label="Client Name"
          name="clientName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Title level={5} className="mt-6">
          Device Information
        </Title>
        <Form.Item
          label="Device Brand"
          name="deviceBrand"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Device Model"
          name="deviceModel"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Serial Number"
          name="serialNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Symptoms"
          name="symptoms"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Title level={5} className="mt-6">
          Dates
        </Title>
        <Form.Item
          label="Deposit Date"
          name="depositDate"
          rules={[{ required: true }]}
        >
          <DatePicker
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>
        <Form.Item
          label="Expected Return Date"
          name="expectedReturnDate"
          rules={[{ required: true }]}
        >
          <DatePicker
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-4" block>
          Submit Request
        </Button>
      </Form>
    </div>
  );
};

export default RequestService;

// src/pages/admin/Devices.jsx
import { useEffect, useState } from "react";
import { Typography, Table, Button, Empty } from "antd";
import { getRequests } from "../../services/api";

const { Title } = Typography;

const Devices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getRequests("/devices");
        setDevices(response.data);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      }
    };
    fetchDevices();
  }, []);

  const columns = [
    { title: "Device ID", dataIndex: "id", key: "id" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Serial Number", dataIndex: "serialNumber", key: "serialNumber" },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <>
      <Title level={3}>Devices</Title>
      {devices.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <Empty description="No Devices Found" />
        </div>
      ) : (
        <Table
          dataSource={devices}
          columns={columns}
          rowKey="id"
          className="mt-5"
        />
      )}
    </>
  );
};

export default Devices;

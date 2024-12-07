// src/pages/admin/RepairRequests.jsx
import { useEffect, useState } from "react";
import { Typography, Table, Button, Empty } from "antd";
import { getRequests } from "../../services/api";

const { Title } = Typography;

const RepairRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests("/repair-requests");
        setRequests(response.data);
      } catch (err) {
        console.error("Failed to fetch repair requests:", err);
      }
    };
    fetchRequests();
  }, []);

  const columns = [
    { title: "Request ID", dataIndex: "id", key: "id" },
    { title: "Client Name", dataIndex: "clientName", key: "clientName" },
    {
      title: "Device",
      render: (record) => `${record.deviceBrand} ${record.deviceModel}`,
      key: "device",
    },
    { title: "Deposit Date", dataIndex: "depositDate", key: "depositDate" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button type="link">View</Button>,
    },
  ];

  return (
    <>
      <Title level={3}>Repair Requests</Title>
      {requests.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <Empty description="No Repair Requests Found" />
        </div>
      ) : (
        <Table
          dataSource={requests}
          columns={columns}
          rowKey="id"
          className="mt-5"
        />
      )}
    </>
  );
};

export default RepairRequests;

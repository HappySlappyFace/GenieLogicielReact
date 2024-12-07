// src/pages/admin/Clients.jsx
import { useEffect, useState } from "react";
import { Typography, Table, Button, Empty } from "antd";
import { getRequests } from "../../services/api";

const { Title } = Typography;

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getRequests("/clients");
        setClients(response.data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  const columns = [
    { title: "Client ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <>
      <Title level={3}>Clients</Title>
      {clients.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <Empty description="No Clients Found" />
        </div>
      ) : (
        <Table
          dataSource={clients}
          columns={columns}
          rowKey="id"
          className="mt-5"
        />
      )}
    </>
  );
};

export default Clients;

import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  Button,
  Empty,
  Modal,
  Input,
  Form,
  notification,
} from "antd";
import {
  getRequests,
  createRequest,
  deleteRequest,
  updateRequest,
} from "../../services/api";

const { Title } = Typography;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]); // State for filtered clients
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [form] = Form.useForm(); // Create form instance

  // Fetch all clients
  const fetchClients = async () => {
    try {
      const response = await getRequests("/CRUD/client");
      const sortedClients = response.sort((a, b) => a.idClient - b.idClient);
      setClients(sortedClients);
      applySearchFilter(sortedClients, searchQuery); // Reapply search after refetching clients
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    }
  };

  useEffect(() => {
    fetchClients(); // Fetch clients on component mount
  }, []);

  // Apply search filter to the client list
  const applySearchFilter = (clientsList, query) => {
    if (query) {
      const filtered = clientsList.filter((client) =>
        client.nom.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clientsList); // No filter, show all clients
    }
  };

  // Handle Create or Update Client form submission
  const handleFormSubmit = async (values) => {
    try {
      const { email, numTel, nom } = values;
      if (isEditing) {
        await updateRequest(`/CRUD/client/${currentClient.idClient}`, {
          email,
          numTel,
          nom,
        });
        notification.success({ message: "Client updated successfully!" });
      } else {
        await createRequest("/CRUD/client", { email, numTel, nom });
        notification.success({ message: "Client created successfully!" });
      }
      setIsModalVisible(false);
      setIsEditing(false);
      setCurrentClient(null);
      // Refetch clients after adding or updating
      await fetchClients();
    } catch (error) {
      notification.error({
        message: "Failed to save client",
        description: error.message,
      });
    }
  };

  // Open modal for editing
  const openEditModal = (client) => {
    setCurrentClient(client);
    setIsEditing(true);
    form.setFieldsValue({
      email: client.email,
      numTel: client.numTel,
      nom: client.nom,
    }); // Populate the form with the current client's data
    setIsModalVisible(true);
  };

  // Open modal for creating new client
  const openCreateModal = () => {
    form.resetFields(); // Reset the form to empty fields when opening Create
    setIsEditing(false); // Ensure we're not in edit mode
    setIsModalVisible(true);
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      await deleteRequest(`/CRUD/client/${currentClient.idClient}`);
      notification.success({ message: "Client deleted successfully!" });
      setIsModalVisible(false);
      setIsEditing(false);
      setCurrentClient(null);
      // Refetch clients after deletion
      await fetchClients();
    } catch (error) {
      notification.error({
        message: "Failed to delete client",
        description: error.message,
      });
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Apply search filter to the current list of clients
    applySearchFilter(clients, value);
  };

  const columns = [
    { title: "Client ID", dataIndex: "idClient", key: "idClient" },
    { title: "Name", dataIndex: "nom", key: "nom" },
    { title: "Phone Number", dataIndex: "numTel", key: "numTel" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              setCurrentClient(record);
              Modal.confirm({
                title: "Are you sure you want to delete this client?",
                onOk: handleDelete,
                okType: "danger",
              });
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>Clients</Title>
      <Input
        placeholder="Search by Client Name"
        value={searchQuery}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button type="primary" onClick={openCreateModal} className="mb-4">
        Create Client
      </Button>
      {filteredClients.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <Empty description="No Clients Found" />
        </div>
      ) : (
        <Table
          dataSource={filteredClients} // Display filtered clients
          columns={columns}
          rowKey="idClient"
          className="mt-5"
        />
      )}

      {/* Modal for Create/Edit Client */}
      <Modal
        title={isEditing ? "Edit Client" : "Create Client"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="numTel"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="nom"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update" : "Create"}
            </Button>
            {isEditing && (
              <Button
                type="danger"
                onClick={handleDelete}
                className="ml-2"
                danger
              >
                Delete
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Clients;

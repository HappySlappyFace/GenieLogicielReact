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

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]); // State for filtered devices
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [form] = Form.useForm(); // Create form instance

  // Fetch all devices
  const fetchDevices = async () => {
    try {
      const response = await getRequests("/CRUD/appareil");
      const sortedDevices = response.sort(
        (a, b) => a.idAppareil - b.idAppareil
      );
      setDevices(sortedDevices);
      applySearchFilter(sortedDevices, searchQuery); // Apply search filter to devices
    } catch (err) {
      console.error("Failed to fetch devices:", err);
    }
  };

  useEffect(() => {
    fetchDevices(); // Fetch devices on component mount
  }, []);

  // Apply search filter to the device list
  const applySearchFilter = (devicesList, query) => {
    if (query) {
      const filtered = devicesList.filter(
        (device) => device.numSerie.toLowerCase().includes(query.toLowerCase()) // Search by serial number
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(devicesList); // No filter, show all devices
    }
  };

  // Handle Create or Update Device form submission
  const handleFormSubmit = async (values) => {
    try {
      const { marque, modele, numSerie } = values;
      if (isEditing) {
        await updateRequest(`/CRUD/appareil/${currentDevice.idAppareil}`, {
          marque,
          modele,
          numSerie,
        });
        notification.success({ message: "Device updated successfully!" });
      } else {
        await createRequest("/CRUD/appareil", { marque, modele, numSerie });
        notification.success({ message: "Device created successfully!" });
      }
      setIsModalVisible(false);
      setIsEditing(false);
      setCurrentDevice(null);
      // Refetch devices after adding or updating
      await fetchDevices();
    } catch (error) {
      notification.error({
        message: "Failed to save device",
        description: error.message,
      });
    }
  };

  // Open modal for editing
  const openEditModal = (device) => {
    setCurrentDevice(device);
    setIsEditing(true);
    form.setFieldsValue({
      marque: device.marque,
      modele: device.modele,
      numSerie: device.numSerie,
    }); // Populate the form with the current device's data
    setIsModalVisible(true);
  };

  // Open modal for creating new device
  const openCreateModal = () => {
    form.resetFields(); // Reset the form to empty fields when opening Create
    setIsEditing(false); // Ensure we're not in edit mode
    setIsModalVisible(true);
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      await deleteRequest(`/CRUD/appareil/${currentDevice.idAppareil}`);
      notification.success({ message: "Device deleted successfully!" });
      setIsModalVisible(false);
      setIsEditing(false);
      setCurrentDevice(null);
      // Refetch devices after deletion
      await fetchDevices();
    } catch (error) {
      notification.error({
        message: "Failed to delete device",
        description: error.message,
      });
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Apply search filter to the current list of devices
    applySearchFilter(devices, value);
  };

  const columns = [
    { title: "Device ID", dataIndex: "idAppareil", key: "idAppareil" },
    { title: "Brand", dataIndex: "marque", key: "marque" },
    { title: "Model", dataIndex: "modele", key: "modele" },
    { title: "Serial Number", dataIndex: "numSerie", key: "numSerie" },
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
              setCurrentDevice(record);
              Modal.confirm({
                title: "Are you sure you want to delete this device?",
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
      <Title level={3}>Devices</Title>
      <Input
        placeholder="Search by Serial Number"
        value={searchQuery}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button type="primary" onClick={openCreateModal} className="mb-4">
        Create Device
      </Button>
      {filteredDevices.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <Empty description="No Devices Found" />
        </div>
      ) : (
        <Table
          dataSource={filteredDevices} // Display filtered devices
          columns={columns}
          rowKey="idAppareil"
          className="mt-5"
        />
      )}

      {/* Modal for Create/Edit Device */}
      <Modal
        title={isEditing ? "Edit Device" : "Create Device"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Brand"
            name="marque"
            rules={[{ required: true, message: "Please input the brand!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="modele"
            rules={[{ required: true, message: "Please input the model!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Serial Number"
            name="numSerie"
            rules={[
              { required: true, message: "Please input the serial number!" },
            ]}
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

export default Devices;

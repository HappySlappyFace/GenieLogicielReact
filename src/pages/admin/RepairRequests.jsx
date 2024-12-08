import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Select,
  DatePicker,
  Input,
  message,
  Form,
} from "antd";
import { getRequests, createRequest } from "../../services/api"; // Adjust import paths

const RepairRequests = () => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const [appareils, setAppareils] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  const [form] = Form.useForm();

  const fetchRepairRequests = async () => {
    try {
      const response = await getRequests("/CRUD/demandeReparation"); // Correct endpoint for repair requests
      setRepairRequests(response);
    } catch (err) {
      console.error("Failed to fetch repair requests:", err);
    }
  };

  useEffect(() => {
    fetchRepairRequests();
    const fetchClients = async () => {
      try {
        const response = await getRequests("/CRUD/client");
        setClients(response);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };

    const fetchAppareils = async () => {
      try {
        const response = await getRequests("/CRUD/appareil");
        setAppareils(response);
      } catch (err) {
        console.error("Failed to fetch appareils:", err);
      }
    };

    fetchClients();
    fetchAppareils();
  }, []);

  // Handle creating or editing a repair request
  const handleCreateOrEditRequest = async (values) => {
    const {
      client,
      appareil,
      dateDepotAppareil,
      datePrevueRep,
      symptomesPanne,
      etat,
    } = values;

    const data = {
      client: {
        idClient: client, // Just passing the ID here
      },
      appareil: {
        idAppareil: appareil, // Just passing the ID here
      },
      dateDepotAppareil,
      datePrevueRep,
      symptomesPanne,
      etat,
    };

    try {
      if (editRequest) {
        // Update request logic (if needed)
        // await updateRequest(`/CRUD/demandeReparation/${editRequest.idDemande}`, data);
      } else {
        // Create new repair request
        await createRequest("/CRUD/demandeReparation", data);
        message.success("Repair request created successfully!");
      }
      setVisible(false);
      fetchRepairRequests();
      form.resetFields();
    } catch (err) {
      message.error("Failed to create repair request.");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "idDemande", key: "idDemande" },
    { title: "Client", dataIndex: ["client", "nom"], key: "client" },
    { title: "Appareil", dataIndex: ["appareil", "numSerie"], key: "appareil" },
    { title: "Status", dataIndex: "etat", key: "etat" },
  ];

  const showCreateModal = () => {
    setEditRequest(null); // Clear edit state
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <h2>Repair Requests</h2>
      <Button type="primary" onClick={showCreateModal}>
        Create Repair Request
      </Button>
      <Table
        dataSource={repairRequests}
        columns={columns}
        rowKey="idDemande"
        className="mt-5"
      />

      <Modal
        visible={visible}
        title={editRequest ? "Edit Repair Request" : "Create Repair Request"}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateOrEditRequest}
          layout="vertical"
        >
          {/* Client Select */}
          <Form.Item
            label="Client"
            name="client"
            rules={[{ required: true, message: "Please select a client" }]}
          >
            <Select
              showSearch
              placeholder="Select a client"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                form.setFieldsValue({
                  client: value, // Set only the client ID
                });
              }}
            >
              {clients.map((client) => (
                <Select.Option key={client.idClient} value={client.idClient}>
                  {client.nom} - {client.email}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Appareil Select */}
          <Form.Item
            label="Appareil"
            name="appareil"
            rules={[{ required: true, message: "Please select an appareil" }]}
          >
            <Select
              showSearch
              placeholder="Select an appareil"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                form.setFieldsValue({
                  appareil: value, // Set only the appareil ID
                });
              }}
            >
              {appareils.map((appareil) => (
                <Select.Option
                  key={appareil.idAppareil}
                  value={appareil.idAppareil}
                >
                  {appareil.numSerie} - {appareil.marque} {appareil.modele}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Etat (Status) Dropdown */}
          <Form.Item
            label="Status"
            name="etat"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>

          {/* Date Fields */}
          <Form.Item
            label="Date de dépôt"
            name="dateDepotAppareil"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Date de réparation prévue"
            name="datePrevueRep"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          {/* Issue Description */}
          <Form.Item
            label="Symptômes de panne"
            name="symptomesPanne"
            rules={[
              { required: true, message: "Please provide a description" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editRequest ? "Update" : "Create"} Repair Request
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RepairRequests;

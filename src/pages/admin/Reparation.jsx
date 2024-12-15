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
  Popconfirm,
} from "antd";
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../../services/api";
import dayjs from "dayjs";

const Reparation = () => {
  const [reparations, setReparations] = useState([]);
  const [demandeReparations, setDemandeReparations] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editReparation, setEditReparation] = useState(null);
  const [form] = Form.useForm();

  // Fetch reparations data
  const fetchReparations = async () => {
    try {
      const response = await getRequests("/CRUD/reparation");
      setReparations(response || []);
    } catch (err) {
      console.error("Failed to fetch reparations:", err);
    }
  };

  // Fetch repair requests (DemandeReparations)
  const fetchDemandeReparations = async () => {
    try {
      const response = await getRequests("/CRUD/demandeReparation");
      setDemandeReparations(response || []);
    } catch (err) {
      console.error("Failed to fetch demandeReparations:", err);
    }
  };

  // Fetch parts (Pieces)
  const fetchPieces = async () => {
    try {
      const response = await getRequests("/CRUD/pieces");
      setPieces(response || []);
    } catch (err) {
      console.error("Failed to fetch pieces:", err);
    }
  };

  // Run once on component mount
  useEffect(() => {
    fetchReparations();
    fetchDemandeReparations();
    fetchPieces();
  }, []);

  // Handle create or edit
  const handleCreateOrEditReparation = async (values) => {
    const {
      demandeReparation,
      description,
      dateRep,
      tarifHMO,
      tempsMO,
      piece,
    } = values;

    const data = {
      demandeReparation: { idDemande: demandeReparation },
      description,
      dateRep: dayjs(dateRep).format("YYYY-MM-DD"), // Format date
      tarifHMO,
      tempsMO,
      piece: piece ? { idPiece: piece } : null,
    };

    try {
      if (editReparation) {
        await updateRequest(
          `/CRUD/reparation/${editReparation.idReparation}`,
          data
        );
        message.success("Repair record updated successfully!");
      } else {
        await createRequest("/CRUD/reparation", data);
        message.success("Repair record created successfully!");
      }
      setVisible(false);
      fetchReparations();
      form.resetFields();
      setEditReparation(null);
    } catch (err) {
      message.error("Failed to save repair.");
      console.error("Error saving repair:", err);
    }
  };

  // Handle delete
  const handleDeleteReparation = async (id) => {
    try {
      await deleteRequest(`/CRUD/reparation/${id}`);
      message.success("Repair record deleted successfully!");
      fetchReparations();
    } catch (err) {
      message.error("Failed to delete repair.");
      console.error("Error deleting repair:", err);
    }
  };

  // Show edit modal
  const showEditModal = (record) => {
    setEditReparation(record);

    form.setFieldsValue({
      demandeReparation: record.idDemande, // Updated field
      description: record.description,
      dateRep: dayjs(record.dateRep), // Ensure proper date formatting
      tarifHMO: record.tarifHMO,
      tempsMO: record.tempsMO,
      piece: record.piece?.idPiece || undefined,
    });

    setVisible(true);
  };

  return (
    <div>
      <h2>Reparations</h2>
      <Button
        type="primary"
        onClick={() => {
          setEditReparation(null);
          form.resetFields();
          setVisible(true);
        }}
        style={{ marginBottom: 20 }}
      >
        Create Repair
      </Button>
      <Table
        dataSource={reparations}
        columns={[
          { title: "ID", dataIndex: "idReparation", key: "idReparation" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Repair Date",
            dataIndex: "dateRep",
            key: "dateRep",
            render: (text) => dayjs(text).format("YYYY-MM-DD"), // Format date
          },
          {
            title: "Hourly Rate (HMO)",
            dataIndex: "tarifHMO",
            key: "tarifHMO",
          },
          { title: "Work Time (hours)", dataIndex: "tempsMO", key: "tempsMO" },
          {
            title: "Actions",
            key: "actions",
            render: (record) => (
              <>
                <Button
                  type="link"
                  onClick={() => showEditModal(record)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this repair?"
                  onConfirm={() => handleDeleteReparation(record.idReparation)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
        rowKey="idReparation"
      />
      <Modal
        visible={visible}
        title={editReparation ? "Edit Repair" : "Create Repair"}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          setEditReparation(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateOrEditReparation}
          layout="vertical"
        >
          <Form.Item
            label="Repair Request"
            name="demandeReparation"
            rules={[
              { required: true, message: "Please select a repair request" },
            ]}
          >
            <Select placeholder="Select a repair request">
              {demandeReparations.map((request) => (
                <Select.Option
                  key={request.idDemande}
                  value={request.idDemande}
                >
                  {request.idDemande}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please provide a description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Repair Date"
            name="dateRep"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Hourly Rate (HMO)"
            name="tarifHMO"
            rules={[
              { required: true, message: "Please enter the hourly rate" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Work Time (hours)"
            name="tempsMO"
            rules={[{ required: true, message: "Please enter the work time" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Part Used" name="piece">
            <Select placeholder="Select a part">
              {pieces.map((piece) => (
                <Select.Option key={piece.idPiece} value={piece.idPiece}>
                  {piece.nom}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editReparation ? "Update Repair" : "Create Repair"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Reparation;

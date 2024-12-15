import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  InputNumber,
} from "antd";
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../../services/api"; // Adjust API paths accordingly

const PieceRechange = () => {
  const [pieces, setPieces] = useState([]);
  const [typePieces, setTypePieces] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editPiece, setEditPiece] = useState(null);
  const [form] = Form.useForm();

  // Fetch all pieces
  const fetchPieces = async () => {
    try {
      const response = await getRequests("/CRUD/pieces");
      console.log("Fetched Pieces:", response);
      setPieces(response || []);
    } catch (err) {
      console.error("Failed to fetch pieces:", err);
    }
  };

  // Fetch all type pieces (TypePiece)
  const fetchTypePieces = async () => {
    try {
      const response = await getRequests("/CRUD/typePieces"); // Replace with the correct endpoint
      console.log("Fetched Type Pieces:", response);
      setTypePieces(response || []);
    } catch (err) {
      console.error("Failed to fetch type pieces:", err);
    }
  };

  // Run on component mount
  useEffect(() => {
    fetchPieces();
    fetchTypePieces();
  }, []);

  // Handle form submit for adding or editing a piece
  const handleFormSubmit = async (values) => {
    const data = {
      ...values,
      typePiece: { idTypePiece: values.typePiece }, // Ensure typePiece is sent as an object with id
    };

    try {
      if (editPiece) {
        // Update existing piece
        console.log("Updating piece:", data);
        await updateRequest(`/CRUD/pieces/${editPiece.idPiece}`, data); // Adjust for PUT method
        message.success("Piece updated successfully!");
      } else {
        // Create a new piece
        await createRequest("/CRUD/pieces", data);
        message.success("Piece created successfully!");
      }

      setVisible(false);
      fetchPieces(); // Refresh data
      form.resetFields();
    } catch (err) {
      message.error("Failed to save the piece.");
      console.error("Error saving piece:", err);
    }
  };

  // Show the modal for creating or editing a piece
  const showModal = (piece = null) => {
    setEditPiece(piece);
    if (piece) {
      form.setFieldsValue({
        ...piece,
        typePiece: piece.typePiece?.idTypePiece, // Pre-fill typePiece in the form
      });
    } else {
      form.resetFields();
    }
    setVisible(true);
  };

  // Delete a piece
  const deletePiece = async (idPiece) => {
    try {
      await deleteRequest(`/CRUD/pieces/${idPiece}`); // Adjust for DELETE method
      message.success("Piece deleted successfully!");
      fetchPieces();
    } catch (err) {
      message.error("Failed to delete the piece.");
      console.error("Error deleting piece:", err);
    }
  };

  // Define table columns
  const columns = [
    { title: "ID", dataIndex: "idPiece", key: "idPiece" },
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "nom", key: "nom" },
    { title: "Purchase Price", dataIndex: "prixAchat", key: "prixAchat" },
    { title: "Price (HT)", dataIndex: "prixHT", key: "prixHT" },
    { title: "Price (TTC)", dataIndex: "prixTTC", key: "prixTTC" },
    {
      title: "Type",
      key: "typePiece",
      render: (record) => record.typePiece?.type || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Button
            type="link"
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deletePiece(record.idPiece)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Pieces</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 20 }}
      >
        Add Piece
      </Button>
      <Table
        dataSource={pieces}
        columns={columns}
        rowKey="idPiece"
        className="mt-5"
      />
      {/* Modal for adding or editing a piece */}
      <Modal
        visible={visible}
        title={editPiece ? "Edit Piece" : "Add Piece"}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "Please enter the code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="nom"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Purchase Price"
            name="prixAchat"
            rules={[
              { required: true, message: "Please enter the purchase price" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Price (HT)"
            name="prixHT"
            rules={[{ required: true, message: "Please enter the HT price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Price (TTC)"
            name="prixTTC"
            rules={[{ required: true, message: "Please enter the TTC price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Type"
            name="typePiece"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select a type">
              {typePieces.map((type) => (
                <Select.Option key={type.idTypePiece} value={type.idTypePiece}>
                  {type.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editPiece ? "Update Piece" : "Add Piece"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PieceRechange;

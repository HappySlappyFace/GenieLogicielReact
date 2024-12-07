// src/pages/Admin/Requests.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { getRequests, updateRequestStatus } from "../../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRequestStatus(id, newStatus);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handlePrint = (request) => {
    const printContent = `
      <h1>IT Request Details</h1>
      <p><strong>Name:</strong> ${request.name}</p>
      <p><strong>Phone:</strong> ${request.phone}</p>
      <p><strong>Hardware:</strong> ${request.hardware}</p>
      <p><strong>Model:</strong> ${request.model}</p>
      <p><strong>Type:</strong> ${request.type}</p>
      <p><strong>Status:</strong> ${request.status}</p>
    `;
    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Hardware</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography variant="body1">No requests found.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.hardware}</TableCell>
                <TableCell>{request.model}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>
                  <Select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request.id, e.target.value)
                    }
                    fullWidth
                  >
                    <MenuItem value="Waiting">Waiting</MenuItem>
                    <MenuItem value="Repaired">Repaired</MenuItem>
                    <MenuItem value="Can't be Repaired">
                      Can't be Repaired
                    </MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handlePrint(request)}
                  >
                    Print
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Requests;

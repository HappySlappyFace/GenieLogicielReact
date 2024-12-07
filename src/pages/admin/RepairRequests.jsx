// src/pages/admin/RepairRequests.jsx
import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { getRequests } from "../../services/api"; // Placeholder for your API service

const RepairRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Placeholder for fetching repair requests
        const response = await getRequests("/repair-requests");
        setRequests(response.data);
      } catch (err) {
        console.error("Failed to fetch repair requests:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Repair Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Device</TableCell>
            <TableCell>Deposit Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.clientName}</TableCell>
              <TableCell>
                {request.deviceBrand && request.deviceModel
                  ? `${request.deviceBrand} ${request.deviceModel}`
                  : "No Device Info"}
              </TableCell>

              <TableCell>{request.depositDate}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button variant="outlined" size="small">
                  View
                </Button>
                {/* Add more action buttons as needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default RepairRequests;

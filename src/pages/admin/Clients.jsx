// src/pages/admin/Clients.jsx
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

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Placeholder for fetching clients
        const response = await getRequests("/clients");
        setClients(response.data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Clients
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>
                <Button variant="outlined" size="small">
                  Edit
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

export default Clients;

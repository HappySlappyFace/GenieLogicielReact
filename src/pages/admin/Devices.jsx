// src/pages/admin/Devices.jsx
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

const Devices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // Placeholder for fetching devices
        const response = await getRequests("/devices");
        setDevices(response.data);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      }
    };

    fetchDevices();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Devices
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.brand}</TableCell>
              <TableCell>{device.model}</TableCell>
              <TableCell>{device.serialNumber}</TableCell>
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

export default Devices;

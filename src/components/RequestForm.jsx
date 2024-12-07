/* eslint-disable no-unused-vars */
// src/pages/RequestService.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { createRequest } from "../services/api"; // Placeholder for your API service

const RequestService = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    address: "",
    phoneNumber: "",
    deviceBrand: "",
    deviceModel: "",
    serialNumber: "",
    symptoms: "",
    depositDate: "",
    expectedReturnDate: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for creating a repair request
      await createRequest("/repair-requests", formData);
      setSuccess("Repair request created successfully!");
      setFormData({
        clientName: "",
        address: "",
        phoneNumber: "",
        deviceBrand: "",
        deviceModel: "",
        serialNumber: "",
        symptoms: "",
        depositDate: "",
        expectedReturnDate: "",
      });
    } catch (err) {
      setError("Failed to create repair request. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Request Service
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Client Information</Typography>
          <TextField
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Typography variant="h6" mt={3}>
            Device Information
          </Typography>
          <TextField
            label="Device Brand"
            name="deviceBrand"
            value={formData.deviceBrand}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Device Model"
            name="deviceModel"
            value={formData.deviceModel}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Serial Number"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />

          <Typography variant="h6" mt={3}>
            Dates
          </Typography>
          <TextField
            label="Deposit Date"
            name="depositDate"
            type="date"
            value={formData.depositDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            label="Expected Return Date"
            name="expectedReturnDate"
            type="date"
            value={formData.expectedReturnDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

          {success && (
            <Typography color="primary" variant="body1" mt={2}>
              {success}
            </Typography>
          )}
          {error && (
            <Typography color="error" variant="body1" mt={2}>
              {error}
            </Typography>
          )}

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Request
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RequestService;

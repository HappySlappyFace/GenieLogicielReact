// src/components/RequestForm.jsx
import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { createRequest } from "../services/api";

const requestTypes = [
  { value: "Maintenance", label: "Maintenance" },
  { value: "Repair", label: "Repair" },
  { value: "Configuration", label: "Configuration" },
];

function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    hardware: "",
    model: "",
    type: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest(formData);
      setSnackbarMsg("Request submitted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        name: "",
        phone: "",
        hardware: "",
        model: "",
        type: "",
      });
    } catch (error) {
      console.error("There was an error submitting the request!", error);
      setSnackbarMsg("Failed to submit request.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="tel"
      />
      <TextField
        label="Hardware"
        name="hardware"
        value={formData.hardware}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        select
        label="Type of Request"
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      >
        {requestTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RequestForm;

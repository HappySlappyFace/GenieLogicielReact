// src/pages/RequestService.jsx
import { Container, Typography } from "@mui/material";
import RequestForm from "../components/RequestForm";

function RequestService() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Request a Service
      </Typography>
      <RequestForm />
    </Container>
  );
}

export default RequestService;

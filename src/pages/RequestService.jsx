// src/pages/RequestService.jsx
import { Container } from "@mui/material";
import RequestForm from "../components/RequestForm";

function RequestService() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <RequestForm />
    </Container>
  );
}

export default RequestService;

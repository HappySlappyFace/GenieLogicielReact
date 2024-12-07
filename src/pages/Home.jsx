// src/pages/Home.jsx
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleRequestService = () => {
    navigate("/request-service");
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to IT Management System
      </Typography>
      <Typography variant="h6" gutterBottom>
        We are here to assist you with all your IT needs.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRequestService}
        >
          Request Service
        </Button>
      </Box>
    </Container>
  );
}

export default Home;

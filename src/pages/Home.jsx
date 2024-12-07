// src/pages/Home.jsx
import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to RepAppBuro
        </Typography>
        <Typography variant="h6" align="center">
          Manage your repair requests efficiently.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;

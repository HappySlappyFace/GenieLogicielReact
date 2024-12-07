// src/App.jsx
import { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeContext } from "./theme/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RequestService from "./pages/RequestService";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/Admin";

function App() {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = !!localStorage.getItem("token"); // Simplistic auth check
  const userRole = localStorage.getItem("role"); // Assume role is stored in localStorage

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-service" element={<RequestService />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          {isAuthenticated && userRole === "admin" ? (
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              }
            />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" replace />} />
          )}

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

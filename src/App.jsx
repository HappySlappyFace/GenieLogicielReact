// src/App.js
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import RequestService from "./pages/RequestService";
import Navbar from "./components/Navbar";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeContext } from "./theme/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./pages/LoginPage";

function App() {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = !!localStorage.getItem("token"); // Simplistic auth check

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
          {isAuthenticated ? (
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

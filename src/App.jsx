import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, Space } from "antd";
import { AuthProvider, useAuth } from "./services/AuthContext"; // Import the useAuth hook
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RequestService from "./pages/RequestService";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/Admin";
import RepairRequests from "./pages/admin/RepairRequests";
import Clients from "./pages/admin/Clients";
import Devices from "./pages/admin/Devices";
import Dashboard from "./pages/Dashboard";
import ReceptionistLayout from "./layouts/ReceptionistLayout";

const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen">
      <Router>
        <AuthProvider>
          <Navbar />
          <Layout style={{ padding: "0" }}>
            <Content
              style={{
                minHeight: "calc(100vh - 64px)", // Ensure Content occupies remaining space
                background: "#fff",
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <AppRoutes />
              </Space>
            </Content>
          </Layout>
        </AuthProvider>
      </Router>
    </Layout>
  );
}

// Separate routes component to avoid inline logic in App component
const AppRoutes = () => {
  const { isAuthenticated, userRole } = useAuth(); // Access context instead of localStorage

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Request Service protected route */}
      <Route
        path="/request-service"
        element={
          isAuthenticated &&
          ["ROLE_ADMIN", "ROLE_REPRESENTATIVE"].includes(userRole) ? (
            <RequestService />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Receptionist protected routes */}
      <Route
        path="/receptionist"
        element={
          isAuthenticated &&
          ["ROLE_ADMIN", "ROLE_REPRESENTATIVE"].includes(userRole) ? (
            <ReceptionistLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="devices" element={<Devices />} />
        <Route path="repair-requests" element={<RepairRequests />} />
      </Route>

      {/* Admin protected routes */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated && userRole === "ROLE_ADMIN" ? (
            <AdminLayout>
              <Admin />
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="repair-requests" element={<RepairRequests />} />
        <Route path="clients" element={<Clients />} />
        <Route path="devices" element={<Devices />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

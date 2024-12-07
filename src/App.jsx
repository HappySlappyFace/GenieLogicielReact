import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, Space } from "antd";
import { AuthProvider } from "./services/AuthContext";
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
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

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
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* Request Service protected route */}
                  {isAuthenticated &&
                  ["ROLE_ADMIN", "ROLE_REPRESENTATIVE"].includes(userRole) ? (
                    <Route
                      path="/request-service"
                      element={<RequestService />}
                    />
                  ) : (
                    <Route
                      path="/login"
                      element={<Navigate to="/login" replace />}
                    />
                  )}

                  {/* Receptionist protected routes */}
                  {isAuthenticated &&
                  ["ROLE_ADMIN", "ROLE_REPRESENTATIVE"].includes(userRole) ? (
                    <Route
                      path="/receptionist"
                      element={<ReceptionistLayout />}
                    >
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="clients" element={<Clients />} />
                      <Route path="devices" element={<Devices />} />
                      <Route
                        path="repair-requests"
                        element={<RepairRequests />}
                      />
                    </Route>
                  ) : (
                    <Route
                      path="/admin/*"
                      element={<Navigate to="/login" replace />}
                    />
                  )}

                  {/* Admin protected routes */}
                  {isAuthenticated && userRole === "ROLE_ADMIN" ? (
                    <Route
                      path="/admin/*"
                      element={
                        <AdminLayout>
                          <Admin />
                        </AdminLayout>
                      }
                    >
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route
                        path="repair-requests"
                        element={<RepairRequests />}
                      />
                      <Route path="clients" element={<Clients />} />
                      <Route path="devices" element={<Devices />} />
                    </Route>
                  ) : (
                    <Route
                      path="/admin/*"
                      element={<Navigate to="/login" replace />}
                    />
                  )}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Space>
            </Content>
          </Layout>
        </AuthProvider>
      </Router>
    </Layout>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, Space } from "antd";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RequestService from "./pages/RequestService";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/Admin";

const { Content } = Layout;

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Layout className="min-h-screen">
      <Router>
        <Navbar />
        <Layout style={{ padding: "0 50px" }}>
          <Content
            style={{
              padding: "24px",
              minHeight: "calc(100vh - 64px)", // Ensure Content occupies remaining space
              background: "#fff",
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<LoginPage />} />
                {isAuthenticated &&
                ["admin", "technicien"].includes(userRole) ? (
                  <Route path="/request-service" element={<RequestService />} />
                ) : (
                  <Route
                    path="/admin/*"
                    element={<Navigate to="/login" replace />}
                  />
                )}
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
      </Router>
    </Layout>
  );
}

export default App;

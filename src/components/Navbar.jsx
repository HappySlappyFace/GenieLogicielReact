import { useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../services/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, userRole } = useAuth(); // Access authentication state

  // useEffect(() => {
  //   console.log(isAuthenticated, userRole);
  // }, [isAuthenticated, userRole]); // Only runs when the authentication state or role changes

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    logout();
  };

  return (
    <Header
      className="flex items-center justify-between bg-white shadow-md"
      style={{ marginBottom: 5, padding: 0 }}
    >
      <div className="flex items-center space-x-4">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          className="border-none"
        >
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined />
              Home
            </Link>
          </Menu.Item>

          {isAuthenticated &&
            ["ROLE_ADMIN", "ROLE_REPRESENTATIVE"].includes(userRole) && (
              <Menu.Item key="/request-service">
                <Link to="/request-service">Request Service</Link>
              </Menu.Item>
            )}
          {isAuthenticated && ["ROLE_REPRESENTATIVE"].includes(userRole) && (
            <Menu.Item key="/receptionist">
              <Link to="/receptionist/dashboard">Receptionist Dashboard</Link>
            </Menu.Item>
          )}
          {isAuthenticated && ["ROLE_ADMIN"].includes(userRole) && (
            <Menu.Item key="/dashboard">
              <Link to="/admin/dashboard">Technician Dashboard</Link>
            </Menu.Item>
          )}

          <Menu.Item>
            <div style={{ marginLeft: "" }}>
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  type="primary"
                  icon={<LogoutOutlined />}
                >
                  Logout
                </Button>
              ) : (
                <Button type="primary" href="/login">
                  Login
                </Button>
              )}
            </div>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;

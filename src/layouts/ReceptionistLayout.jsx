import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"; // To render nested routes

const { Sider, Content } = Layout;

const ReceptionistLayout = () => (
  <Layout style={{ minHeight: "100vh", margin: "0" }}>
    {/* Sidebar */}
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {/* Dashboard */}
        <Menu.Item key="1">
          <Link to="/receptionist/dashboard">Dashboard</Link>
        </Menu.Item>

        {/* Customer Management */}
        <Menu.Item key="2">
          <Link to="/receptionist/clients">Clients</Link>
        </Menu.Item>

        {/* Device Management */}
        <Menu.Item key="3">
          <Link to="/receptionist/devices">Devices</Link>
        </Menu.Item>

        {/* Repair Requests */}
        <Menu.Item key="4">
          <Link to="/receptionist/repair-requests">Repair Requests</Link>
        </Menu.Item>
      </Menu>
    </Sider>

    {/* Content Area */}
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "#fff",
        }}
      >
        {/* Nested routes for each section */}
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default ReceptionistLayout;

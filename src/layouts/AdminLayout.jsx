import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"; // To render nested routes

const { Sider, Content } = Layout;

const AdminLayout = () => (
  <Layout style={{ minHeight: "100vh", margin: "0" }}>
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/clients">Clients</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/admin/repair-requests">Repair Requests</Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/admin/devices">Devices</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "#fff",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default AdminLayout;

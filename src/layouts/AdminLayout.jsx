import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header style={{ background: "#001529", padding: 0 }}>
      <div style={{ color: "#fff", fontSize: 24, padding: "0 20px" }}>
        Admin Dashboard
      </div>
      <Button
        style={{ float: "right", marginTop: "16px" }}
        onClick={() => console.log("Log Out")}
      >
        Log Out
      </Button>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/admin/repair-requests">Repair Requests</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/clients">Clients</Link>
          </Menu.Item>
          <Menu.Item key="3">
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
          Content goes here...
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default AdminLayout;

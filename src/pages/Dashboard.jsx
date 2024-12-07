import { Typography, Card, Row, Col } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

const data = [
  { name: "Jan", requests: 30 },
  { name: "Feb", requests: 45 },
  { name: "Mar", requests: 60 },
  // ... more data
];

function Dashboard() {
  return (
    <div>
      {/* Title */}
      <Title level={2}>Dashboard</Title>

      {/* Main Content */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Request Trends" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="requests" stroke="#DC143C" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;

import { Typography, Row, Col, Card, Button, Image } from "antd";
import {
  HomeOutlined,
  DesktopOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ padding: "30px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to RepAppBuro
      </Title>
      <Paragraph
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#555",
          marginBottom: "40px",
        }}
      >
        Seamlessly manage your IT repair services with ease and efficiency.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            cover={
              <Image alt="Request Service" src="/images/request-service.jpg" />
            }
            style={{ textAlign: "center" }}
          >
            <HomeOutlined
              style={{
                fontSize: "36px",
                color: "#1890ff",
                marginBottom: "20px",
              }}
            />
            <Title level={4}>Request a Service</Title>
            <Paragraph>
              Get your devices repaired effortlessly with just a few clicks.
            </Paragraph>
            <Button type="primary" href="/request-service" block>
              Request Now
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            cover={
              <Image
                alt="Real-time Notifications"
                src="/images/notifications.jpg"
              />
            }
            style={{ textAlign: "center" }}
          >
            <DesktopOutlined
              style={{
                fontSize: "36px",
                color: "#1890ff",
                marginBottom: "20px",
              }}
            />
            <Title level={4}>Stay Informed</Title>
            <Paragraph>
              Real-time updates on the status of your repair requests.
            </Paragraph>
            <Button type="primary" href="/login" block>
              Track Service
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            cover={
              <Image alt="Expert Support" src="/images/expert-support.jpg" />
            }
            style={{ textAlign: "center" }}
          >
            <SolutionOutlined
              style={{
                fontSize: "36px",
                color: "#1890ff",
                marginBottom: "20px",
              }}
            />
            <Title level={4}>Expert Support</Title>
            <Paragraph>
              Get the best IT support from experienced professionals.
            </Paragraph>
            <Button type="primary" href="/request-service" block>
              Get Support
            </Button>
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={3}>Why Choose RepAppBuro?</Title>
        <Paragraph
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            color: "#666",
            fontSize: "16px",
          }}
        >
          At RepAppBuro, we provide fast, reliable, and expert IT repair
          services to help you stay focused on what matters most — your business
          and technology.
        </Paragraph>
      </div>
    </div>
  );
};

export default Home;

import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Row, Typography, Rate, Tag, Space } from "antd";
import { useProducts } from "../context/ProductsContext";

const { Title, Paragraph } = Typography;

export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { products, incrementClick } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: 24 }}>
        <Title>Product not found</Title>
        <Button onClick={() => nav(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <img src={product.image} alt={product.title} style={{ width: "100%", borderRadius: 8 }} />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>{product.title}</Title>
          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <Rate disabled defaultValue={product.rating} />
            <Tag>{product.category}</Tag>
          </div>
          <Title level={3}>${product.price}</Title>
          <Paragraph>{product.short}</Paragraph>
          <Space direction="vertical" style={{ width: "100%" }}>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => incrementClick(product.id)} // ✅ Track clicks
            >
              <Button type="primary" size="large">
                Check Price & Buy
              </Button>
            </a>
            <Button onClick={() => nav(-1)}>Back</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Typography, Button, Rate, Tag, Space, Card } from "antd";
import { sampleProducts, formatPrice } from "../data/sampleData";

const { Title, Paragraph } = Typography;

export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = sampleProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: 32 }}>
        <Title>Product not found</Title>
        <Button onClick={() => nav(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>{product.title}</Title>
          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <Rate disabled defaultValue={product.rating} />
            <Tag>{product.category}</Tag>
          </div>
          <Title level={3}>{formatPrice(product.price)}</Title>
          <Paragraph>
            {product.short} — Longer description and marketing copy goes here.
          </Paragraph>

          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <b>Pros:</b>
              <ul>{product.pros.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
            <div>
              <b>Cons:</b>
              <ul>{product.cons.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>

            <a href={product.affiliateUrl} target="_blank" rel="noreferrer">
              <Button type="primary" size="large">
                Check Price & Buy
              </Button>
            </a>
            <Button onClick={() => nav(-1)}>Back to results</Button>
          </Space>
        </Col>
      </Row>

      <div style={{ marginTop: 32 }}>
        <Title level={4}>Related products</Title>
        <Row gutter={[16, 16]}>
          {sampleProducts
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Col key={p.id} xs={24} sm={12} md={6}>
                <Card size="small" hoverable>
                  <Link to={`/product/${p.id}`}>{p.title}</Link>
                  <div>{formatPrice(p.price)}</div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

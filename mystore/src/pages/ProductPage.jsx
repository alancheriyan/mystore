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
        <Title level={3}>Product not found</Title>
        <Button onClick={() => nav(-1)}>Go Back</Button>
      </div>
    );
  }

const normalizeUrl = (url) => {
  if (!url) return "#";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};

const handleBuyNow = () => {
  incrementClick(product.id); // track click
  const url = normalizeUrl(product.affiliateUrl);
  debugger;
  window.open(url, "_blank", "noopener,noreferrer"); // safe redirect
};

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Row gutter={[32, 32]} align="top">
        {/* Image */}
        <Col xs={24} md={12}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: 12,
              objectFit: "cover",
              maxHeight: 500,
            }}
          />
        </Col>

        {/* Details */}
        <Col xs={24} md={12}>
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%" }}
          >
            <Title level={2} style={{ marginBottom: 0 }}>
              {product.title}
            </Title>

            {/* Rating + Category always horizontal */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Rate disabled defaultValue={product.rating || 4} />
              <Tag color="blue">{product.category}</Tag>
            </div>

            <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
              ${product.price}
            </Title>

            <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
              {product.short || "No description available."}
            </Paragraph>

            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button
                type="primary"
                size="large"
                block
                style={{ height: 48, fontSize: 16 }}
                onClick={handleBuyNow}
              >
                Check Price & Buy
              </Button>
              <Button block size="large" onClick={() => nav(-1)}>
                Back
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

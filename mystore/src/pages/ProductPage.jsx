import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Col, Row, Typography, Rate, Tag, Space, Card } from "antd";
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
    window.open(url, "_blank", "noopener,noreferrer"); // safe redirect
  };

  // Related products (same category, excluding current product)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4); // show max 4

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Row gutter={[32, 32]} align="top">
        {/* Image */}
        <Col xs={24} md={10}>
          <div style={{ textAlign: "center" }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: 400,
                borderRadius: 12,
                objectFit: "contain",
                maxHeight: 400,
              }}
            />
          </div>
        </Col>

        {/* Details */}
        <Col xs={24} md={14}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={4} style={{ marginBottom: 0 }}>
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

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Title level={3}>Related Products</Title>
          <Row gutter={[16, 16]}>
            {related.map((r) => (
              <Col key={r.id} xs={12} md={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={r.title}
                      src={r.image}
                      style={{
                        height: 160,
                        objectFit: "contain",
                        padding: 8,
                        background: "#fafafa",
                      }}
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <Link to={`/product/${r.id}`}>
                        {r.title.length > 25
                          ? r.title.slice(0, 25) + "..."
                          : r.title}
                      </Link>
                    }
                    description={`$${r.price}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

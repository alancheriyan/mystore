import { Card, Button, Rate, Tag, Grid, Space } from "antd";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/sampleData";

const { Meta } = Card;
const { useBreakpoint } = Grid;

export default function ProductCard({ product }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // compact view on mobile

  const normalizeUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const truncateText = (text, length = 20) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // ✅ Compact mobile view (2-column layout)
  if (isMobile) {
    return (
      <Card hoverable size="small" bodyStyle={{ padding: 12 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <img
            alt={product.title}
            src={product.image}
            style={{
              height: 90,
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Title */}
        <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.2 }}>
          {truncateText(product.title, 25)}
        </div>

        {/* Rating + Price inline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "6px 0",
          }}
        >
          <Rate
            disabled
            allowHalf
            defaultValue={product.rating}
            style={{ fontSize: 12 }} // smaller stars for mobile
          />
          <div style={{ fontWeight: 600, fontSize: 13, color: "#1890ff" }}>
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Buttons */}
        <Space style={{ width: "100%", marginTop: 8 }}>
          <a
            href={normalizeUrl(product.affiliateUrl)}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1 }}
          >
            <Button type="primary" size="small" block>
              Buy
            </Button>
          </a>
          <Link to={`/product/${product.id}`} style={{ flex: 1 }}>
            <Button size="small" block>
              Details
            </Button>
          </Link>
        </Space>
      </Card>
    );
  }

  // ✅ Normal desktop/tablet view
  return (
    <Card
      hoverable
      cover={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 220,
            background: "#fafafa",
          }}
        >
          <img
            alt={product.title}
            src={product.image}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              padding: 8,
            }}
          />
        </div>
      }
      actions={[
        <a
          key="buy"
          href={normalizeUrl(product.affiliateUrl)}
          target="_blank"
          rel="noreferrer"
        >
          <Button type="primary">Buy Now</Button>
        </a>,
        <Link key="details" to={`/product/${product.id}`}>
          <Button>Details</Button>
        </Link>,
      ]}
    >
      <Meta
        title={
          <div>
            <div>{product.title}</div>
            <div style={{ marginTop: 4 }}>
              <Tag>{product.category}</Tag>
            </div>
          </div>
        }
        description={
          <div
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <Rate disabled allowHalf defaultValue={product.rating} />
              <div style={{ fontSize: 12, color: "#666" }}>
                {truncateText(product.short, 20)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600 }}>
                {formatPrice(product.price)}
              </div>
              <div style={{ fontSize: 11 }}>incl. taxes</div>
            </div>
          </div>
        }
      />
    </Card>
  );
}

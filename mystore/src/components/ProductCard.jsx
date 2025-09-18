import { Card, Button, Rate, Tag } from "antd";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/sampleData";

const { Meta } = Card;

export default function ProductCard({ product }) {

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

  return (
    <Card
  hoverable
  cover={
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 220, background: "#fafafa" }}>
      <img
        alt={product.title}
        src={product.image}
        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", padding: 8 }}
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
</a>
,
    <Link key="details" to={`/product/${product.id}`}>
      <Button>Details</Button>
    </Link>,
  ]}
>
      <Meta
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{product.title}</span>
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
            }}
          >
            <div>
              <Rate disabled allowHalf defaultValue={product.rating} />
              <div style={{ fontSize: 12, color: "#666" }}>  
                {truncateText(product.short, 20)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600 }}>{formatPrice(product.price)}</div>
              <div style={{ fontSize: 11 }}>incl. taxes</div>
            </div>
          </div>
        }
      />
    </Card>
  );
}

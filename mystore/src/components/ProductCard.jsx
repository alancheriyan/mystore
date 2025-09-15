import { Card, Button, Rate, Tag } from "antd";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/sampleData";

const { Meta } = Card;

export default function ProductCard({ product }) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{ height: 180, objectFit: "cover" }}
        />
      }
      actions={[
        <a key="buy" href={product.affiliateUrl} target="_blank" rel="noreferrer">
          <Button type="primary">Buy Now</Button>
        </a>,
        <Link key="details" to={`/product/${product.id}`}>
          <Button>Details</Button>
        </Link>,
      ]}
    >
      <Meta
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{product.title}</span>
            <Tag>{product.category}</Tag>
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
              <div style={{ fontSize: 12, color: "#666" }}>{product.short}</div>
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

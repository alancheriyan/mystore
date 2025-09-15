import { Row, Col, Pagination } from "antd";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, page, pageSize, onPageChange }) {
  const start = (page - 1) * pageSize;
  const pageProducts = products.slice(start, start + pageSize);

  return (
    <>
      <Row gutter={[16, 16]}>
        {pageProducts.map((p) => (
          <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={products.length}
          onChange={onPageChange}
        />
      </div>
    </>
  );
}

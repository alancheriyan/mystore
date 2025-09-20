import { Row, Col, Pagination, Grid } from "antd";
import ProductCard from "./ProductCard";

const { useBreakpoint } = Grid;

export default function ProductsGrid({ products, page, pageSize, onPageChange }) {
  const screens = useBreakpoint();
  const isMobile = !screens.sm; // true if < 576px

  const start = (page - 1) * pageSize;
  const pageProducts = products.slice(start, start + pageSize);

  return (
    <>
      <Row gutter={[12, 12]}>
        {pageProducts.map((p) => (
          <Col
            xs={12} // ✅ 2 columns on mobile
            sm={12}
            md={8}
            lg={6}
            key={p.id}
          >
            <ProductCard product={p} compact={isMobile} />
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

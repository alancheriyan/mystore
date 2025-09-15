import { useState, useMemo } from "react";
import { Layout, Button, Select, Drawer, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import AppHeader from "../components/AppHeader";
import CategorySider from "../components/CategorySider";
import ProductsGrid from "../components/ProductsGrid";
import { sampleCategories, sampleProducts } from "../data/sampleData";

const { Content } = Layout;
const { Option } = Select;
const { useBreakpoint } = Grid;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [siderVisible, setSiderVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const pageSize = 8;

  // Filtered products
  const filtered = useMemo(() => {
    let list = sampleProducts;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.short.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = list.slice().sort((a, b) => b.rating - a.rating);

    return list;
  }, [category, query, sort]);

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header with search */}
      <AppHeader onSearch={handleSearch} onToggleSider={() => setSiderVisible(true)} />

      {/* Category Drawer */}
      <CategorySider
        categories={sampleCategories}
        selected={category}
        visible={siderVisible}
        onClose={() => setSiderVisible(false)}
        onSelect={(c) => {
          setCategory(c);
          setPage(1);
          setSiderVisible(false);
        }}
      />

      {/* Filters & Sort Drawer (Mobile) */}
      <Drawer
        title="Filters & Sort"
        placement="top"
        height="auto"
        open={filterDrawerVisible}
        onClose={() => setFilterDrawerVisible(false)}
      >
        <Select
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPage(1);
            setFilterDrawerVisible(false);
          }}
          style={{ width: "100%", marginBottom: 12 }}
        >
          {sampleCategories.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>

        <Select
          value={sort}
          onChange={(v) => {
            setSort(v);
            setFilterDrawerVisible(false);
          }}
          style={{ width: "100%" }}
        >
          <Option value="relevance">Sort: Relevance</Option>
          <Option value="price-asc">Price: Low to High</Option>
          <Option value="price-desc">Price: High to Low</Option>
          <Option value="rating">Top Rated</Option>
        </Select>
      </Drawer>

      {/* Products count */}
      <div style={{ padding: "12px 24px", background: "#f5f5f5" }}>
        Showing <b>{filtered.length}</b> products
      </div>

      {/* Products Grid */}
      <Content style={{ padding: 24 }}>
        <ProductsGrid
          products={filtered}
          page={page}
          pageSize={pageSize}
          onPageChange={(p) => setPage(p)}
        />
      </Content>
    </Layout>
  );
}

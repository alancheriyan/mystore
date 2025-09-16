import { useState, useMemo } from "react";
import { Layout,  Select, Drawer } from "antd";
import AppHeader from "../components/AppHeader";
import CategorySider from "../components/CategorySider";
import ProductsGrid from "../components/ProductsGrid";
import { sampleCategories } from "../data/sampleData";
import { useProducts } from "../context/ProductsContext";

const { Content } = Layout;
const { Option } = Select;

export default function HomePage() {
  const { products } = useProducts(); // ✅ global products
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [siderVisible, setSiderVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let list = products.filter((p) => !p.onHold); // hide held products
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.short.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = list.slice().sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, query, sort]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader onSearch={(val) => { setQuery(val); setPage(1); }} onToggleSider={() => setSiderVisible(true)} />

      <CategorySider
        categories={sampleCategories}
        selected={category}
        visible={siderVisible}
        onClose={() => setSiderVisible(false)}
        onSelect={(c) => { setCategory(c); setPage(1); setSiderVisible(false); }}
      />

      <Drawer
        title="Filters & Sort"
        placement="top"
        open={filterDrawerVisible}
        onClose={() => setFilterDrawerVisible(false)}
      >
        <Select value={category} onChange={(v) => { setCategory(v); setPage(1); setFilterDrawerVisible(false); }} style={{ width: "100%", marginBottom: 12 }}>
          {sampleCategories.map((c) => (
            <Option key={c} value={c}>{c}</Option>
          ))}
        </Select>
        <Select value={sort} onChange={(v) => { setSort(v); setFilterDrawerVisible(false); }} style={{ width: "100%" }}>
          <Option value="relevance">Sort: Relevance</Option>
          <Option value="price-asc">Price: Low to High</Option>
          <Option value="price-desc">Price: High to Low</Option>
          <Option value="rating">Top Rated</Option>
        </Select>
      </Drawer>

      <div style={{ padding: "12px 24px", background: "#f5f5f5" }}>
        Showing <b>{filtered.length}</b> products
      </div>

      <Content style={{ padding: 24 }}>
        <ProductsGrid products={filtered} page={page} pageSize={pageSize} onPageChange={(p) => setPage(p)} />
      </Content>
    </Layout>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import { ProductsProvider } from "./context/ProductsContext";

export default function App() {
  return (
    <ProductsProvider>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </ProductsProvider>
  );
}

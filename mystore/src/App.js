import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import "antd/dist/reset.css";

export default function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

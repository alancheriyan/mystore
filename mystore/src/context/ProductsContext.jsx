import { createContext, useContext, useState } from "react";
import { sampleProducts } from "../data/sampleData";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(sampleProducts);

  // Add new product
  const addProduct = (product) => {
    const newProduct = { ...product, id: `p-${Date.now()}`, clicks: 0, onHold: false };
    setProducts((prev) => [...prev, newProduct]);
  };

  // Update existing product
  const updateProduct = (id, updated) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  // Delete
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Hold/Unhold
  const toggleHold = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, onHold: !p.onHold } : p))
    );
  };

  // Track click
  const incrementClick = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, clicks: (p.clicks || 0) + 1 } : p))
    );
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, toggleHold, incrementClick }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);

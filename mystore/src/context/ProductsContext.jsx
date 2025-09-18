import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // 🔹 Helper to convert Google Drive link into direct URL
  const formatGoogleDriveLink = (link) => {
    if (!link) return "";
    const match = link.match(/\/d\/([^/]+)\//);
    return match
      ? `https://drive.google.com/uc?export=view&id=${match[1]}`
      : link;
  };

  // 🔹 Fetch products from Firestore, always sorted by sequence
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    // sort by sequence (default 0 if missing)
    items.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));

    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Add product
  const addProduct = async (product) => {
    const cleanProduct = {
      title: product.title || "",
      category: product.category || "Tech & Gadgets",
      price: product.price ?? 0,
      short: product.short || "",
      image: formatGoogleDriveLink(product.image || ""),
      affiliateUrl: product.affiliateUrl || "",
      rating: parseFloat(product.rating ?? 0),
      sequence: parseInt(product.sequence ?? 0, 10),
      clicks: 0,
      onHold: false,
    };

    await addDoc(collection(db, "products"), cleanProduct);
    fetchProducts();
  };

  // 🔹 Update product
  const updateProduct = async (id, product) => {
    const cleanProduct = {
      title: product.title || "",
      category: product.category || "Tech & Gadgets",
      price: product.price ?? 0,
      short: product.short || "",
      image: formatGoogleDriveLink(product.image || ""),
      affiliateUrl: product.affiliateUrl || "",
      rating: parseFloat(product.rating ?? 0),
      sequence: parseInt(product.sequence ?? 0, 10),
      clicks: product.clicks ?? 0,
      onHold: product.onHold ?? false,
    };

    await updateDoc(doc(db, "products", id), cleanProduct);
    fetchProducts();
  };

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  // 🔹 Toggle hold
  const toggleHold = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    await updateDoc(doc(db, "products", id), {
      onHold: !product.onHold,
    });
    fetchProducts();
  };

  // 🔹 Increment clicks (when affiliate link clicked)
  const incrementClick = async (id) => {
    await updateDoc(doc(db, "products", id), {
      clicks: increment(1),
    });
    fetchProducts();
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleHold,
        incrementClick,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

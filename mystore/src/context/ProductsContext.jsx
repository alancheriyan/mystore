import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Fetch products live from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Helper: Convert Google Drive link → direct image
  const normalizeImageLink = (link) => {
    try {
      const match = link.match(/[-\w]{25,}/); // extract fileId
      return match
        ? `https://drive.google.com/uc?export=view&id=${match[0]}`
        : link;
    } catch {
      return link;
    }
  };

  const addProduct = async (product) => {
    const cleanProduct = {
      ...product,
      image: normalizeImageLink(product.image),
      clicks: 0,
      onHold: false,
    };
    await addDoc(collection(db, "products"), cleanProduct);
  };

  const updateProduct = async (id, product) => {
    const cleanProduct = {
      ...product,
      image: normalizeImageLink(product.image),
    };
    await updateDoc(doc(db, "products", id), cleanProduct);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  const toggleHold = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      await updateDoc(doc(db, "products", id), { onHold: !product.onHold });
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, toggleHold }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

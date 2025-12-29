// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import ProductCard from "../components/ProductCard";
// import CategoriesBar from "../components/CategoriesBar";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async (selectedCategory) => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/products", {
//         params: {
//           category: selectedCategory !== "all" ? selectedCategory : undefined,
//         },
//       });
//       setProducts(data);
//     } catch (err) {
//       console.error("Fetch failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // initial load
//   useEffect(() => {
//     fetchProducts("all");
//   }, []);

//   // category change
//   useEffect(() => {
//     fetchProducts(category);
//   }, [category]);

//   return (
//     <>
//       <CategoriesBar active={category} onChange={setCategory} />

//       {loading && <p className="py-6">Loading products…</p>}

//       {!loading && products.length === 0 && (
//         <p className="text-gray-500 py-6">No products found.</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoriesBar from "../components/CategoriesBar";
import SkeletonProductCard from "../components/SkeletonProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (selectedCategory) => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", {
        params:
          selectedCategory !== "all"
            ? { category: selectedCategory }
            : {},
      });
      setProducts(data);
    } catch (err) {
      console.error("Fetch failed", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load on category change (includes initial load)
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <>
      <CategoriesBar active={category} onChange={setCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <SkeletonProductCard key={i} />
          ))
        ) : products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
}

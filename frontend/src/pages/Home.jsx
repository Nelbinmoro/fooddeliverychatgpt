// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import ProductCard from "../components/ProductCard";
// import CategoriesBar from "../components/CategoriesBar";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const { data } = await api.get("/products");
//         setProducts(data);
//       } catch (error) {
//         console.error("Failed to load products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   return (
//     <div>
//       <CategoriesBar />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import ProductCard from "../components/ProductCard";
// import CategoriesBar from "../components/CategoriesBar";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const { data } = await api.get("/products");
//         setProducts(data);
//         setFiltered(data);
//       } catch (err) {
//         console.error("Product load failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     if (category === "all") {
//       setFiltered(products);
//     } else {
//       setFiltered(
//         products.filter(
//           (p) => p.category?.toLowerCase() === category
//         )
//       );
//     }
//   }, [category, products]);

//   if (loading) return <h2 className="text-center py-10">Loading...</h2>;

//   return (
//     <>
//       <CategoriesBar active={category} onChange={setCategory} />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {filtered.length === 0 ? (
//           <p className="text-gray-500">No products found.</p>
//         ) : (
//           filtered.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         )}
//       </div>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoriesBar from "../components/CategoriesBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (selectedCategory) => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", {
        params: {
          category: selectedCategory !== "all" ? selectedCategory : undefined,
        },
      });
      setProducts(data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchProducts("all");
  }, []);

  // category change
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <>
      <CategoriesBar active={category} onChange={setCategory} />

      {loading && <p className="py-6">Loading products…</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500 py-6">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

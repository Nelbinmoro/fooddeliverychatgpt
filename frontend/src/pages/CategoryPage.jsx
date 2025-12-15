// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import ProductCard from "../components/ProductCard";
// import CategoriesBar from "../components/CategoriesBar";

// export default function CategoryPage() {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const { data } = await api.get(`/products?category=${category}`);
//         setProducts(data);
//       } catch (err) {
//         console.error("Category fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, [category]);

//   if (loading) return <h2 className="text-center py-8">Loading...</h2>;

//   return (
//     <div className="space-y-8">
//       <CategoriesBar />

//       <h2 className="text-2xl font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.length === 0 ? (
//           <p>No products found for this category.</p>
//         ) : (
//           products.map((p) => <ProductCard key={p._id} product={p} />)
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoriesBar from "../components/CategoriesBar";

export default function CategoryPage() {
  const { category } = useParams(); // pizza, burger, drinks, dessert
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const { data } = await api.get(`/products?category=${category}`);
        setProducts(data);
      } catch (err) {
        console.error("Category products error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [category]);

  return (
    <div>
      <CategoriesBar />

      <h2 className="text-2xl font-bold my-4 capitalize">{category}</h2>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-600">No products found for this category.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

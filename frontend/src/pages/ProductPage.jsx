import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src={product.image} className="rounded-lg shadow-md" />

      <div>
        <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-2xl font-bold text-green-600 mb-5">₹{product.price}</p>

        <button
          onClick={handleAdd}
          className={`px-6 py-3 rounded text-white ${
            added ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>

        <Link to="/" className="block mt-4 text-blue-600 underline">
          ← Back to meals
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => setAdded(false), 1500);
  };

 return (
  <div className="flex flex-col border rounded-lg shadow-md p-4 bg-white h-full">
    <img
      src={product.image}
      alt={product.name}
      className="rounded-lg object-cover h-48 w-full"
    />

    <div className="flex-grow mt-3">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-green-600 font-semibold">₹{product.price}</p>
    </div>

    <button
      onClick={handleAdd}
      className={`mt-3 py-2 rounded text-white ${
        added ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>

    <Link
      to={`/product/${product._id}`}
      className="text-blue-600 underline text-center mt-2"
    >
      View Details
    </Link>
  </div>
);
}

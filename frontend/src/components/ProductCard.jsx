import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.countInStock === 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    // Reset after 1.5s
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x300?text=Food+Image")
          }
        />

        {/* Price badge */}
        <span className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
          ₹{product.price}
        </span>

        {/* Stock badge */}
        {isOutOfStock && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            disabled={isOutOfStock || added}
            onClick={handleAddToCart}
            className={`flex-1 py-2 rounded text-white text-sm transition
              ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

          <Link
            to={`/product/${product._id}`}
            className="flex-1 py-2 text-center rounded border border-gray-300 text-sm hover:bg-gray-100"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

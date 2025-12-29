import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.countInStock === 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition 
                flex flex-col overflow-hidden
                h-auto md:h-full">

      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full object-cover
           h-auto md:h-52 lg:h-56"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x300?text=Food")
          }
        />

        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          ₹{product.price}
        </span>

        {isOutOfStock && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
          {product.name}
        </h3>

        {/* Spacer keeps buttons aligned */}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <button
            disabled={isOutOfStock}
            onClick={handleAdd}
            className={`h-11 rounded text-sm font-medium text-white transition
              ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

          <Link
            to={`/product/${product._id}`}
            className="text-center text-xs text-blue-600 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

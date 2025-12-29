import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.countInStock === 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col overflow-hidden">
      
      {/* Image */}
      <div className="relative aspect-[16/9] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x225?text=Food")
          }
        />

        {/* Price */}
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          ₹{product.price}
        </span>

        {/* Stock */}
        {isOutOfStock && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm leading-tight line-clamp-1">
          {product.name}
        </h3>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 pt-3">
          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`h-10 rounded text-sm font-medium text-white transition
              ${
                isOutOfStock
                  ? "bg-gray-400"
                  : added
                  ? "bg-green-600"
                  : "bg-blue-600 active:scale-[0.98]"
              }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

          <Link
            to={`/product/${product._id}`}
            className="text-center text-xs text-gray-600 hover:text-blue-600"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

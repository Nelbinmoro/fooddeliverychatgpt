import React from "react";

const categories = [
  { key: "all", label: "All", icon: "🍽️" },
  { key: "pizza", label: "Pizza", icon: "🍕" },
  { key: "burger", label: "Burger", icon: "🍔" },
  { key: "drinks", label: "Drinks", icon: "🥤" },
  { key: "dessert", label: "Desserts", icon: "🍰" },
];

export default function CategoriesBar({ active, onChange }) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4">
        {categories.map((cat) => {
          const isActive = active === cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => onChange(cat.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${
                  isActive
                    ? "bg-orange-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

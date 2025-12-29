// import { FaPizzaSlice, FaHamburger, FaGlassCheers, FaBirthdayCake } from "react-icons/fa";

// const categories = [
//   { key: "all", label: "All" },
//   { key: "pizza", label: "Pizza", icon: <FaPizzaSlice /> },
//   { key: "burger", label: "Burger", icon: <FaHamburger /> },
//   { key: "drinks", label: "Drinks", icon: <FaGlassCheers /> },
//   { key: "dessert", label: "Desserts", icon: <FaBirthdayCake /> },
// ];

// export default function CategoriesBar({ active, onChange }) {
//   return (
//     <div className="w-full overflow-x-auto scroll-smooth">
//       <div className="flex gap-3 py-4 px-2 flex-nowrap">
//         {categories.map((cat) => (
//           <button
//             key={cat.key}
//             onClick={() => onChange(cat.key)}
//             className={`
//               flex items-center gap-2 px-4 py-2 rounded-full border
//               whitespace-nowrap transition-all duration-200
//               ${
//                 active === cat.key
//                   ? "bg-orange-500 text-white border-orange-500"
//                   : "bg-white text-gray-700 hover:bg-orange-50"
//               }
//             `}
//           >
//             {cat.icon && <span className="text-lg">{cat.icon}</span>}
//             <span className="text-sm font-medium">{cat.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

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
      <div className="flex gap-3 px-2 py-3 min-w-max">
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

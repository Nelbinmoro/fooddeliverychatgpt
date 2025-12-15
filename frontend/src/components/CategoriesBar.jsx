// import { useState } from "react";

// const categories = [
//   { key: "all", label: "All" },
//   { key: "pizza", label: "🍕 Pizza" },
//   { key: "burger", label: "🍔 Burger" },
//   { key: "drinks", label: "🥤 Drinks" },
//   { key: "dessert", label: "🍰 Desserts" },
// ];

// export default function CategoriesBar({ active, onChange }) {
//   return (
//     <div className=" border-b">
//       <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
//         {categories.map((cat) => (
//           <button
//             key={cat.key}
//             onClick={() => onChange(cat.key)}
//             className={`px-4 py-2 rounded-full whitespace-nowrap border transition
//               ${
//                 active === cat.key
//                   ? "bg-orange-600 text-white border-orange-600"
//                   : "bg-gray-100 hover:bg-orange-100"
//               }`}
//           >
//             {cat.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import { FaPizzaSlice, FaHamburger, FaGlassCheers, FaBirthdayCake } from "react-icons/fa";

const categories = [
  { key: "all", label: "All" },
  { key: "pizza", label: "Pizza", icon: <FaPizzaSlice /> },
  { key: "burger", label: "Burger", icon: <FaHamburger /> },
  { key: "drinks", label: "Drinks", icon: <FaGlassCheers /> },
  { key: "dessert", label: "Desserts", icon: <FaBirthdayCake /> },
];

export default function CategoriesBar({ active, onChange }) {
  return (
    <div className="w-full overflow-x-auto scroll-smooth">
      <div className="flex gap-3 py-4 px-2 flex-nowrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full border
              whitespace-nowrap transition-all duration-200
              ${
                active === cat.key
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 hover:bg-orange-50"
              }
            `}
          >
            {cat.icon && <span className="text-lg">{cat.icon}</span>}
            <span className="text-sm font-medium">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}


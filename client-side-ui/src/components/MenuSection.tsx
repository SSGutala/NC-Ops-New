// src/components/MenuSection.tsx
import React from "react";
import { MenuItem } from "@/pages/CustomerOrder";

interface Props {
  title: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const MenuSection: React.FC<Props> = ({ title, items, onAddToCart }) => (
  <div className="mb-8">
    <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4"
        >
          <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
          {item.image && (
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
          )}
          <p className="text-gray-400">${item.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(item)}
            className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default MenuSection;

// src/components/CartSummary.tsx
import React, { useState } from "react";
import { CartItem, OrderDetails } from "@/pages/CustomerOrder";

interface Props {
  cart: CartItem[];
  customItems: string[];
  total: number;
  onClose: () => void;
  onOrderComplete: (order: OrderDetails) => void;
  updateCart: (cart: CartItem[]) => void;
}

const CartSummary: React.FC<Props> = ({ cart, customItems, total, onClose, onOrderComplete, updateCart }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'tab'>('card');
  const [customerName, setCustomerName] = useState('');

  const submitOrder = () => {
    const order: OrderDetails = {
      items: cart,
      customItems,
      total,
      paymentMethod,
      customerName: customerName || undefined,
    };
    onOrderComplete(order);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.map(item => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        {customItems.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Custom Items:</h3>
            {customItems.map((item, index) => (
              <div key={index} className="text-sm text-gray-700">• {item}</div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Customer Name (optional)</label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="tab">Put it on my tab</option>
          </select>
        </div>

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={submitOrder} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

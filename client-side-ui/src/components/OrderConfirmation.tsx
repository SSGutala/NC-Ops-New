// src/components/OrderConfirmation.tsx
import React from "react";
import { OrderDetails } from "@/pages/CustomerOrder";

const OrderConfirmation: React.FC<{ orderDetails: OrderDetails }> = ({ orderDetails }) => {
  return (
    <div className="min-h-screen bg-green-900 text-white flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-2">Total: ${orderDetails.total.toFixed(2)}</p>
        <p className="mb-2">Payment Method: {orderDetails.paymentMethod}</p>
        {orderDetails.customerName && (
          <p className="mb-2">Customer: {orderDetails.customerName}</p>
        )}
        <p className="text-green-300 mt-4">Your order is being prepared 🍹</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;

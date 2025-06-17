import React, { useState } from 'react';
import MenuSection from '@/components/MenuSection';
import CustomOrderForm from '@/components/CustomOrderForm';
import CartSummary from '@/components/CartSummary';
import OrderConfirmation from '@/components/OrderConfirmation';
import { ShoppingCart, Plus } from 'lucide-react';

import { MenuItem, CartItem, OrderDetails } from '../types/order';

//import { MenuItem, CartItem, OrderDetails } from '@/types/order';

// CustomerOrder manages the entire order workflow including:
// - Menu display
// - Custom order input
// - Cart summary and checkout
// - Order confirmation flow

const CustomerOrder: React.FC = () => {
  // Placeholder UI state — you can expand these as needed
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'tab'>('card');
  const [customerName, setCustomerName] = useState('');

  // Example menu items - in real use, these would come from a database or API
  const menu: MenuItem[] = [
    { id: '1', name: 'Gin & Tonic', price: 8, category: 'Rail Drinks' },
    { id: '2', name: 'Whiskey Sour', price: 10, category: 'Cocktails' },
    // Add more items...
  ];

  const handleAddToCart = (item: MenuItem) => {
    const existing = cart.find(ci => ci.id === item.id);
    if (existing) {
      setCart(prev =>
        prev.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)
      );
    } else {
      setCart(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleConfirmOrder = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setOrderDetails({
      items: cart,
      customItems,
      total,
      paymentMethod,
      customerName,
    });
    setCart([]);
    setCustomItems([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Order</h1>

      {!orderDetails ? (
        <>
          <MenuSection
            title="Drinks Menu"
            items={menu}
            onAddToCart={handleAddToCart}
          />

          <CustomOrderForm
            customItems={customItems}
            setCustomItems={setCustomItems}
          />

          <CartSummary
            cart={cart}
            setCart={setCart}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            customerName={customerName}
            setCustomerName={setCustomerName}
            onConfirmOrder={handleConfirmOrder}
          />
        </>
      ) : (
        <OrderConfirmation orderDetails={orderDetails} />
      )}
    </div>
  );
};

export default CustomerOrder;

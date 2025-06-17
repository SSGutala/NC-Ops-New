import React, { useState } from 'react';
import MenuSection from '@/components/MenuSection';
import CustomOrderForm from '@/components/CustomOrderForm';
import CartSummary from '@/components/CartSummary';
import OrderConfirmation from '@/components/OrderConfirmation';
import { ShoppingCart, Plus } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderDetails {
  items: CartItem[];
  customItems: string[];
  total: number;
  paymentMethod: 'card' | 'cash' | 'tab';
  customerName?: string;
}

const CustomerOrder = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [customItems, setCustomItems] = useState<string[]>([]);

  const menuCategories = [
    {
      name: 'Rail Drinks',
      items: [
        { id: '1', name: 'Vodka Tonic', price: 8, category: 'Rail Drinks', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
        { id: '2', name: 'Gin & Tonic', price: 8, category: 'Rail Drinks', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
        { id: '3', name: 'Rum & Coke', price: 8, category: 'Rail Drinks', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
        { id: '4', name: 'Whiskey Sour', price: 9, category: 'Rail Drinks', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' }
      ]
    },
    {
      name: 'Cocktails',
      items: [
        { id: '5', name: 'Margarita', price: 12, category: 'Cocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' },
        { id: '6', name: 'Manhattan', price: 14, category: 'Cocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' },
        { id: '7', name: 'Cosmopolitan', price: 13, category: 'Cocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' },
        { id: '8', name: 'Old Fashioned', price: 15, category: 'Cocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' }
      ]
    },
    {
      name: 'Mocktails',
      items: [
        { id: '9', name: 'Virgin Mojito', price: 6, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' },
        { id: '10', name: 'Shirley Temple', price: 5, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' },
        { id: '11', name: 'Virgin Bloody Mary', price: 7, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' }
      ]
    },
    {
      name: 'Sodas Only',
      items: [
        { id: '12', name: 'Coca Cola', price: 3, category: 'Sodas Only' },
        { id: '13', name: 'Sprite', price: 3, category: 'Sodas Only' },
        { id: '14', name: 'Orange Juice', price: 4, category: 'Sodas Only' },
        { id: '15', name: 'Ginger Beer', price: 4, category: 'Sodas Only' }
      ]
    },
    {
      name: 'Whiskeys',
      items: [
        { id: '16', name: 'Jameson', price: 12, category: 'Whiskeys', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
        { id: '17', name: 'Macallan 12', price: 18, category: 'Whiskeys', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
        { id: '18', name: 'Buffalo Trace', price: 14, category: 'Whiskeys', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' }
      ]
    },
    {
      name: 'Other Delicacies',
      items: [
        { id: '19', name: 'Wine - Chardonnay', price: 10, category: 'Other Delicacies', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' },
        { id: '20', name: 'Draft Beer', price: 6, category: 'Other Delicacies', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
        { id: '21', name: 'Champagne', price: 25, category: 'Other Delicacies', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop' }
      ]
    }
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const addCustomItem = (customItem: string) => {
    setCustomItems(prev => [...prev, customItem]);
    setShowCustomForm(false);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0) + customItems.length;
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrderComplete = (orderDetails: OrderDetails) => {
    setOrderDetails(orderDetails);
    setOrderConfirmed(true);
  };

  if (orderConfirmed && orderDetails) {
    return <OrderConfirmation orderDetails={orderDetails} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Order Your Drinks</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Menu Categories */}
        {menuCategories.map((category) => (
          <MenuSection
            key={category.name}
            title={category.name}
            items={category.items}
            onAddToCart={addToCart}
          />
        ))}

        {/* Custom Order Section */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Custom Order</h2>
            <p className="text-gray-400 mb-4">
              Have something special in mind? Let us know what you'd like!
            </p>
            <button
              onClick={() => setShowCustomForm(true)}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Custom Drink
            </button>
            
            {customItems.length > 0 && (
              <div className="mt-4">
                <h3 className="text-white font-medium mb-2">Custom Items Added:</h3>
                {customItems.map((item, index) => (
                  <div key={index} className="text-gray-300 py-1">• {item}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Order Modal */}
      {showCustomForm && (
        <CustomOrderForm
          onSubmit={addCustomItem}
          onClose={() => setShowCustomForm(false)}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartSummary
          cart={cart}
          customItems={customItems}
          total={getTotal()}
          onClose={() => setShowCart(false)}
          onOrderComplete={handleOrderComplete}
          updateCart={setCart}
        />
      )}
    </div>
  );
};

export default CustomerOrder;

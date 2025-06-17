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

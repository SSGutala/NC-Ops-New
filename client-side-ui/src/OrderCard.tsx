import React from 'react';
import { Clock, CreditCard, DollarSign, FileText } from 'lucide-react';
import { classNames } from './src/lib/utils'; // or adjust path as needed

export type PaymentStatus = 'paid' | 'cash' | 'tab';
export type OrderStatus = 'pending' | 'in-progress' | 'ready' | 'completed';

export interface Order {
  id: string;
  items: string[];
  timestamp: Date;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  customerName?: string;
  total: number;
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  // Payment icon and color logic
  const getPaymentIcon = () => {
    switch (order.paymentStatus) {
      case 'paid': return <CreditCard className="w-4 h-4" />;
      case 'cash': return <DollarSign className="w-4 h-4" />;
      case 'tab': return <FileText className="w-4 h-4" />;
    }
  };

  // Status progression and UI helpers
  const getNextStatus = (): OrderStatus => {
    switch (order.orderStatus) {
      case 'pending': return 'in-progress';
      case 'in-progress': return 'ready';
      case 'ready': return 'completed';
      default: return 'pending';
    }
  };

  // Time formatting and elapsed time calculation
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getTimeElapsed = () => {
    const now = new Date();
    const diff = now.getTime() - order.timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  return (
    <div className={classNames(
      'bg-gray-800 rounded-lg border border-gray-700 p-4',
      'border-l-4 hover:bg-gray-750 hover:border-gray-600',
      // Status-based left border colors
      order.orderStatus === 'pending' && 'border-l-gray-400',
      order.orderStatus === 'in-progress' && 'border-l-orange-400',
      order.orderStatus === 'ready' && 'border-l-green-400',
      order.orderStatus === 'completed' && 'border-l-gray-600 opacity-60'
    )}>
      {/* Order header with ID and payment status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-white">#{order.id}</span>
          {order.customerName && (
            <span className="text-gray-400 text-sm">• {order.customerName}</span>
          )}
        </div>
        <div className={classNames(
          'flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium',
          order.paymentStatus === 'paid' && 'text-green-400 bg-green-400/10 border-green-400/20',
          order.paymentStatus === 'cash' && 'text-amber-400 bg-amber-400/10 border-amber-400/20',
          order.paymentStatus === 'tab' && 'text-blue-400 bg-blue-400/10 border-blue-400/20'
        )}>
          {getPaymentIcon()}
          <span className="capitalize">{order.paymentStatus}</span>
        </div>
      </div>

      {/* Order items list */}
      <div className="mb-3">
        {order.items.map((item, index) => (
          <div key={index} className="text-gray-200 text-sm py-1">
            • {item}
          </div>
        ))}
      </div>

      {/* Footer with time info and action button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{formatTime(order.timestamp)}</span>
          <span>•</span>
          <span>{getTimeElapsed()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">${order.total.toFixed(2)}</span>
          <button
            onClick={() => order.orderStatus !== 'completed' && onStatusChange(order.id, getNextStatus())}
            disabled={order.orderStatus === 'completed'}
            className={cn(
              'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200',
              order.orderStatus === 'completed' 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
            )}
          >
            {order.orderStatus === 'pending' && 'Start Order'}
            {order.orderStatus === 'in-progress' && 'Mark Ready'}
            {order.orderStatus === 'ready' && 'Complete'}
            {order.orderStatus === 'completed' && 'Completed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

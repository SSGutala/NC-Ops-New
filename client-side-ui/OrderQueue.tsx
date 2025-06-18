import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Users } from 'lucide-react';
import OrderCard, { Order, PaymentStatus, OrderStatus } from './src/OrderCard';
import FilterBar from './src/FilterBar';

// Sample data generator for demo purposes
const generateSampleOrders = (): Order[] => {
  const items = [
    'Vodka Tonic', 'Whiskey Sour', 'Gin & Tonic', 'Old Fashioned', 'Margarita',
    'Moscow Mule', 'Manhattan', 'Cosmopolitan', 'Mojito', 'Negroni',
    'Draft Beer', 'Wine - Chardonnay', 'Wine - Cabernet', 'Bloody Mary'
  ];
  
  const customers = ['Alex', 'Jordan', 'Sam', 'Casey', 'Taylor', 'Morgan', 'Riley', 'Avery'];
  const paymentStatuses: PaymentStatus[] = ['paid', 'cash', 'tab'];
  const orderStatuses: OrderStatus[] = ['pending', 'in-progress', 'ready'];

  return Array.from({ length: 12 }, (_, i) => {
    const orderItems = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => items[Math.floor(Math.random() * items.length)]
    );
    
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 45));
    
    return {
      id: (1000 + i).toString(),
      items: orderItems,
      timestamp,
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      orderStatus: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      customerName: customers[Math.floor(Math.random() * customers.length)],
      total: Math.floor(Math.random() * 50) + 15
    };
  });
};

const OrderQueue: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    setOrders(generateSampleOrders());
  }, []);

  // Order status management
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };

  // Filtering and sorting logic
  const filteredOrders = orders.filter(order => {
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    return matchesPayment && matchesStatus;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    const statusPriority = { 'pending': 0, 'in-progress': 1, 'ready': 2, 'completed': 3 };
    const aPriority = statusPriority[a.orderStatus];
    const bPriority = statusPriority[b.orderStatus];
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    return a.timestamp.getTime() - b.timestamp.getTime();
  });

  // Statistics calculations
  const getStatusCount = (status: OrderStatus) => {
    return orders.filter(order => order.orderStatus === status).length;
  };

  const getAverageWaitTime = () => {
    const pendingOrders = orders.filter(order => order.orderStatus === 'pending');
    if (pendingOrders.length === 0) return 0;
    
    const now = new Date();
    const totalWait = pendingOrders.reduce((sum, order) => {
      return sum + (now.getTime() - order.timestamp.getTime());
    }, 0);
    
    return Math.floor(totalWait / pendingOrders.length / 60000);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">Order Queue</h1>
            </div>
            <div className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Statistics cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400 text-sm">Avg Wait</span>
              </div>
              <span className="text-2xl font-bold text-white">{getAverageWaitTime()}m</span>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span className="text-gray-400 text-sm">Pending</span>
              </div>
              <span className="text-2xl font-bold text-white">{getStatusCount('pending')}</span>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-gray-400 text-sm">In Progress</span>
              </div>
              <span className="text-2xl font-bold text-white">{getStatusCount('in-progress')}</span>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-gray-400 text-sm">Ready</span>
              </div>
              <span className="text-2xl font-bold text-white">{getStatusCount('ready')}</span>
            </div>
          </div>

          {/* Filter controls */}
          <FilterBar
            paymentFilter={paymentFilter}
            statusFilter={statusFilter}
            onPaymentFilterChange={setPaymentFilter}
            onStatusFilterChange={setStatusFilter}
            orderCount={filteredOrders.length}
          />
        </div>

        {/* Orders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more orders.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderQueue;

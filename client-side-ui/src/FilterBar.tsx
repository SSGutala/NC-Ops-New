import React from 'react';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentStatus, OrderStatus } from './OrderCard';

interface FilterBarProps {
  paymentFilter: PaymentStatus | 'all';
  statusFilter: OrderStatus | 'all';
  onPaymentFilterChange: (filter: PaymentStatus | 'all') => void;
  onStatusFilterChange: (filter: OrderStatus | 'all') => void;
  orderCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  paymentFilter,
  statusFilter,
  onPaymentFilterChange,
  onStatusFilterChange,
  orderCount
}) => {
  const paymentOptions = [
    { value: 'all' as const, label: 'All Payment', color: 'text-gray-400' },
    { value: 'paid' as const, label: 'Paid', color: 'text-green-400' },
    { value: 'cash' as const, label: 'Cash', color: 'text-amber-400' },
    { value: 'tab' as const, label: 'Tab', color: 'text-blue-400' }
  ];

  const statusOptions = [
    { value: 'all' as const, label: 'All Status', color: 'text-gray-400' },
    { value: 'pending' as const, label: 'Pending', color: 'text-gray-300' },
    { value: 'in-progress' as const, label: 'In Progress', color: 'text-orange-400' },
    { value: 'ready' as const, label: 'Ready', color: 'text-green-400' },
    { value: 'completed' as const, label: 'Completed', color: 'text-gray-500' }
  ];

  const hasActiveFilters = paymentFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {/* Filter header with clear button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <h3 className="text-white font-medium">Filters</h3>
          <span className="text-gray-400 text-sm">({orderCount} orders)</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onPaymentFilterChange('all');
              onStatusFilterChange('all');
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment filters */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">Payment Status</label>
          <div className="flex flex-wrap gap-2">
            {paymentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onPaymentFilterChange(option.value)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200',
                  paymentFilter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                )}
              >
                <span className={paymentFilter === option.value ? 'text-white' : option.color}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Status filters */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">Order Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onStatusFilterChange(option.value)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200',
                  statusFilter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                )}
              >
                <span className={statusFilter === option.value ? 'text-white' : option.color}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

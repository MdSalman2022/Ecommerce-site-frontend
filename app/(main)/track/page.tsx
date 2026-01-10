'use client';

import React, { useState } from 'react';
import { FaPhone, FaSearch, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { MdLocalShipping, MdPending } from 'react-icons/md';

interface StatusHistoryItem {
  status: string;
  timestamp: string;
  note?: string;
}

interface Order {
  _id: string;
  orderId?: string;
  orderStatus: string;
  statusHistory?: StatusHistoryItem[];
  items: any[];
  amount: number;
  date: string;
  courierInfo?: {
    trackingCode?: string;
    status?: string;
  };
  createdAt: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  pending: { icon: <MdPending />, color: 'text-orange-500 bg-orange-100', label: 'Pending' },
  processing: { icon: <FaBox />, color: 'text-blue-500 bg-blue-100', label: 'Processing' },
  shipped: { icon: <FaTruck />, color: 'text-purple-500 bg-purple-100', label: 'Shipped' },
  delivered: { icon: <FaCheckCircle />, color: 'text-green-500 bg-green-100', label: 'Delivered' },
  cancelled: { icon: <FaTimesCircle />, color: 'text-red-500 bg-red-100', label: 'Cancelled' },
  returned: { icon: <FaTimesCircle />, color: 'text-gray-500 bg-gray-100', label: 'Returned' },
};

export default function TrackOrderPage() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearched(true);
    setSelectedOrder(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/track/${phone}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        if (data.orders.length === 0) {
          setError('No orders found for this phone number');
        }
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
       
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MdLocalShipping className="text-3xl text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Enter your phone number to view your orders and their status</p>
        </div>

       
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
              Track
            </button>
          </div>
        </form>

       
        {error && (
          <div className="text-center text-red-600 bg-red-50 py-3 px-4 rounded-lg mb-6 max-w-md mx-auto">
            {error}
          </div>
        )}

       
        {orders.length > 0 && !selectedOrder && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Orders ({orders.length})</h2>
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-primary">#{order.orderId || order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                    <p className="text-sm text-gray-600 mt-2">{order.items.length} item(s)</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.orderStatus]?.color || 'bg-gray-100 text-gray-600'}`}>
                      {statusConfig[order.orderStatus]?.icon}
                      {statusConfig[order.orderStatus]?.label || order.orderStatus}
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-2">৳{(order.amount / 100).toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-primary font-medium group-hover:underline">
                  View Timeline →
                </div>
              </div>
            ))}
          </div>
        )}

       
        {selectedOrder && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
           
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/80 hover:text-white mb-3 text-sm"
              >
                ← Back to orders
              </button>
              <h2 className="text-xl font-bold">Order #{selectedOrder.orderId || selectedOrder._id.slice(-8).toUpperCase()}</h2>
              <p className="text-white/80 mt-1">Placed on {formatDate(selectedOrder.createdAt)}</p>
            </div>

           
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${statusConfig[selectedOrder.orderStatus]?.color || 'bg-gray-100'}`}>
                  {statusConfig[selectedOrder.orderStatus]?.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="text-lg font-semibold">{statusConfig[selectedOrder.orderStatus]?.label || selectedOrder.orderStatus}</p>
                </div>
              </div>
            </div>

           
            <div className="p-6">
              <h3 className="font-semibold text-gray-800 mb-6">Order Progress</h3>
              {(() => {
                // Define standard order flow
                const orderFlow = ['pending', 'processing', 'shipped', 'delivered'];
                const currentStatus = selectedOrder.orderStatus;
                const currentIndex = orderFlow.indexOf(currentStatus);
                const isCancelled = currentStatus === 'cancelled' || currentStatus === 'returned';

                // Get timestamp for each status from history
                const getStatusTimestamp = (status: string) => {
                  const historyItem = selectedOrder.statusHistory?.find(h => h.status === status);
                  return historyItem?.timestamp;
                };

                return (
                  <div className="relative">
                   
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 mx-8">
                      <div 
                        className={`h-full transition-all duration-500 ${isCancelled ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: isCancelled ? '100%' : `${Math.max(0, (currentIndex / (orderFlow.length - 1)) * 100)}%` }}
                      />
                    </div>

                   
                    <div className="flex justify-between relative z-10">
                      {orderFlow.map((status, index) => {
                        const isCompleted = !isCancelled && index < currentIndex;
                        const isCurrent = !isCancelled && index === currentIndex;
                        const isUpcoming = !isCancelled && index > currentIndex;
                        const timestamp = getStatusTimestamp(status);
                        const config = statusConfig[status];

                        return (
                          <div key={status} className="flex flex-col items-center w-1/4">
                            <div className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all
                              ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                              ${isCurrent ? `${config.color} border-current` : ''}
                              ${isUpcoming ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                              ${isCancelled && index === 0 ? 'bg-red-500 border-red-500 text-white' : ''}
                            `}>
                              {isCompleted ? <FaCheckCircle /> : config.icon}
                            </div>
                            <p className={`mt-2 text-sm font-medium text-center
                              ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                            `}>
                              {config.label}
                            </p>
                            {timestamp && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                   
                    {isCancelled && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                        <FaTimesCircle className="text-red-500 text-xl flex-shrink-0" />
                        <div>
                          <p className="font-medium text-red-700">
                            Order {currentStatus === 'cancelled' ? 'Cancelled' : 'Returned'}
                          </p>
                          <p className="text-sm text-red-600">
                            {getStatusTimestamp(currentStatus) 
                              ? `on ${formatDate(getStatusTimestamp(currentStatus)!)}`
                              : 'Status updated'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

           
            {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 && (
              <div className="px-6 pb-6">
                <h4 className="text-sm font-medium text-gray-600 mb-3">Status History</h4>
                <div className="space-y-2">
                  {[...selectedOrder.statusHistory].reverse().map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <span className={`w-2 h-2 rounded-full ${statusConfig[item.status]?.color.split(' ')[0] || 'bg-gray-400'}`} />
                      <span className="font-medium">{statusConfig[item.status]?.label || item.status}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{formatDate(item.timestamp)}</span>
                      {item.note && <span className="text-gray-400">- {item.note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

           
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-lg">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">৳{item.totalPrice || item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">৳{(selectedOrder.amount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

       
        {searched && orders.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found for this phone number</p>
          </div>
        )}
      </div>
    </div>
  );
}

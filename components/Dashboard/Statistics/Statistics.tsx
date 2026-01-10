'use client';

import React from 'react';
import { useShop } from '@/contexts/ShopProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';

function DashboardStatistics() {
  const { products, allUsers } = useShop();
  const { orders } = useUserActivity();

  const ordersArray = Array.isArray(orders) ? orders : [];
  const productsArray = Array.isArray(products) ? products : [];
  const usersArray = Array.isArray(allUsers) ? allUsers : [];

  // Calculate stats
  const totalRevenue = ordersArray.reduce((sum: number, order: any) => sum + (order.amount || 0), 0);
  const totalOrders = ordersArray.length;
  const totalProducts = productsArray.length;
  const totalCustomers = usersArray.length;
  const deliveredOrders = ordersArray.filter((o: any) => o.shipment === 'delivered').length;
  const cancelledOrders = ordersArray.filter((o: any) => !o.orderStatus).length;

  const stats = [
    { label: 'Total Revenue', value: `৳${totalRevenue.toLocaleString()}`, color: 'bg-primary/10 text-primary' },
    { label: 'Total Orders', value: totalOrders, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Total Products', value: totalProducts, color: 'bg-green-500/10 text-green-500' },
    { label: 'Total Customers', value: totalCustomers, color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Delivered', value: deliveredOrders, color: 'bg-green-500/10 text-green-500' },
    { label: 'Cancelled', value: cancelledOrders, color: 'bg-red-500/10 text-red-500' },
  ];

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-foreground mb-8">Statistics</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border p-6 rounded-xl">
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Revenue Chart (Coming Soon)</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Orders Chart (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatistics;

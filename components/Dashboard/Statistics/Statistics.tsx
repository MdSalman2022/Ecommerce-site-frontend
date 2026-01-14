'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { 
  TbTruckDelivery, TbCreditCard, TbUsers, TbPackage, 
  TbShoppingBagCheck, TbAlertTriangle, TbTrophy 
} from 'react-icons/tb';
import { Loader2 } from 'lucide-react';

const COLORS = ['hsl(var(--primary))', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function DashboardStatistics() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  // Fetch all required data from the new statistics endpoint
  const { data, isLoading, error } = useQuery({
    queryKey: ['statistics-data'],
    queryFn: async () => {
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/statistics`,
        { headers }
      );
      
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'Failed to load statistics');
      
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 max-w-md">
          <p className="font-semibold mb-1">Failed to load statistics</p>
          <p className="text-sm opacity-80">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  const ordersArray = data?.orders || [];
  const productsArray = data?.products || [];
  const topCustomersFromDb = data?.topCustomers || [];

  // 1. Data Aggregation: Shipping Zone Distribution
  const dhakaInCount = ordersArray.filter((o: any) => o.shippingZone === 'dhaka_in').length;
  const dhakaOutCount = ordersArray.filter((o: any) => o.shippingZone === 'dhaka_out').length;
  const noZoneCount = ordersArray.filter((o: any) => !o.shippingZone).length;
  
  const zoneStats = [
    { name: 'Dhaka Inside', value: dhakaInCount },
    { name: 'Dhaka Outside', value: dhakaOutCount },
    ...(noZoneCount > 0 ? [{ name: 'No Zone Data', value: noZoneCount }] : [])
  ];

  // 2. Data Aggregation: Payment Method Split
  const codCount = ordersArray.filter((o: any) => 
    o.transactionId === 'Cash on Delivery' || 
    o.transactionId?.toLowerCase().includes('cod') ||
    o.transactionId?.toLowerCase().includes('cash')
  ).length;
  const onlineCount = ordersArray.filter((o: any) => 
    o.transactionId && 
    o.transactionId !== 'Cash on Delivery' && 
    !o.transactionId.toLowerCase().includes('cod') &&
    !o.transactionId.toLowerCase().includes('cash')
  ).length;
  
  const paymentStats = [
    { name: 'COD', value: codCount },
    { name: 'Online', value: onlineCount },
  ];

  // 3. Data Aggregation: Inventory Health
  const inventoryStats = [
    { name: 'In Stock', value: productsArray.filter((p: any) => {
        const totalStock = p.variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || 0;
        return totalStock > 10;
      }).length 
    },
    { name: 'Low Stock', value: productsArray.filter((p: any) => {
        const totalStock = p.variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || 0;
        return totalStock <= 10 && totalStock > 0;
      }).length 
    },
    { name: 'Out of Stock', value: productsArray.filter((p: any) => {
        const totalStock = p.variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || 0;
        return totalStock <= 0;
      }).length 
    },
  ];

  // 4. Use Top Customers directly from backend aggregation
  const topCustomers = topCustomersFromDb.map((cust: any) => ({
    name: cust.name || 'Anonymous',
    email: cust.email,
    spend: cust.totalSpend || 0,
    count: cust.orderCount || 0
  })).slice(0, 5);

  // 5. Operational Metrics
  const totalRevenue = ordersArray.reduce((sum: number, o: any) => sum + (o.amount || 0), 0);
  const totalOrders = ordersArray.length;
  const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const deliveryRate = totalOrders > 0 ? (ordersArray.filter((o: any) => o.orderStatus === 'delivered').length / totalOrders) * 100 : 0;
  
  const stats = [
    { 
      label: 'Avg Order Value (AOV)', 
      value: `৳${Math.round(aov).toLocaleString()}`, 
      sub: 'Transaction average',
      icon: TbShoppingBagCheck,
      color: 'text-primary' 
    },
    { 
      label: 'Fulfillment Rate', 
      value: `${Math.round(deliveryRate)}%`, 
      sub: 'Completed orders',
      icon: TbTruckDelivery,
      color: 'text-blue-500' 
    },
    { 
      label: 'Out of Stock', 
      value: inventoryStats[2].value, 
      sub: 'Items to restock',
      icon: TbAlertTriangle,
      color: 'text-red-500' 
    },
    { 
      label: 'Top Customer Spend', 
      value: `৳${(topCustomers[0]?.spend || 0).toLocaleString()}`, 
      sub: topCustomers[0]?.name || 'No data',
      icon: TbTrophy,
      color: 'text-amber-500' 
    },
  ];

  return (
    <div className="py-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Operations Insight</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Unique logistics and customer distribution metrics.</p>
        </div>
      </div>

      {/* Operational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-all shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">{stat.sub}</p>
              </div>
              <div className={`p-3 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <stat.icon className="w-24 h-24" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logistics Chart */}
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TbTruckDelivery className="text-primary" /> Shipping Zone Distribution
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Split */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-center justify-center">
            <TbCreditCard className="text-blue-500" /> Payment Split
          </h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {paymentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-black">{totalOrders}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Total</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {paymentStats.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">{item.name}</span>
                  <span className="text-sm font-bold">{Math.round((item.value / (totalOrders || 1)) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers Leaderboard */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
              <TbUsers /> VIP Leadboard
            </h3>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">Top 5 Spenders</span>
          </div>
          <div className="p-0">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {topCustomers.map((cust, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 w-12 text-center font-black text-muted-foreground">#{i + 1}</td>
                    <td className="p-4">
                      <p className="font-bold text-foreground">{cust.name}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{cust.email || 'No email'}</p>
                    </td>
                    <td className="p-4 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Orders</p>
                      <p className="font-bold text-primary">{cust.count}</p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Total Spend</p>
                      <p className="font-black text-foreground">৳{cust.spend.toLocaleString()}</p>
                    </td>
                  </tr>
                ))}
                {topCustomers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-muted-foreground italic">No customer data available yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-8 self-start flex items-center gap-2">
            <TbPackage className="text-purple-500" /> Catalog Health
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" fontSize={11} width={80} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 8, 8, 0]} 
                  barSize={32}
                >
                  {inventoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-[200px]">
            Visibility into your product stock levels across all variants.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatistics;

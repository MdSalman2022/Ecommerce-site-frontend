'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { TbCurrencyTaka, TbShoppingCart, TbTrendingUp, TbPackage } from 'react-icons/tb';

interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

interface StatusData {
  status: string;
  count: number;
}

interface TopProduct {
  productId: string;
  name: string;
  image?: string;
  totalSold: number;
  totalRevenue: number;
}

interface Totals {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
}

interface TodayStats {
  ordersToday: number;
  revenueToday: number;
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f97316',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#22c55e',
  cancelled: '#ef4444',
  returned: '#6b7280',
};

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [totals, setTotals] = useState<Totals>({ totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 });
  const [todayStats, setTodayStats] = useState<TodayStats>({ ordersToday: 0, revenueToday: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      try {
        const [revenueRes, statusRes, productsRes, todayRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/revenue`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/orders-by-status`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/top-products?limit=5`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/today`, { headers }),
        ]);

        const [revenueJson, statusJson, productsJson, todayJson] = await Promise.all([
          revenueRes.json(),
          statusRes.json(),
          productsRes.json(),
          todayRes.json(),
        ]);

        if (revenueJson.success) {
          setRevenueData(revenueJson.data.daily);
          setTotals(revenueJson.data.totals);
        }
        if (statusJson.success) setStatusData(statusJson.data);
        if (productsJson.success) setTopProducts(productsJson.data);
        if (todayJson.success) setTodayStats(todayJson.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const formatCurrency = (value: number) => `৳${value.toLocaleString()}`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">


      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TbCurrencyTaka className="text-3xl" />
            </div>
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(totals.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TbShoppingCart className="text-3xl" />
            </div>
            <div>
              <p className="text-emerald-100 text-sm">Total Orders</p>
              <p className="text-2xl font-bold">{totals.totalOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TbTrendingUp className="text-3xl" />
            </div>
            <div>
              <p className="text-purple-100 text-sm">Avg Order Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totals.avgOrderValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TbPackage className="text-3xl" />
            </div>
            <div>
              <p className="text-orange-100 text-sm">Today's Orders</p>
              <p className="text-2xl font-bold">{todayStats.ordersToday}</p>
              <p className="text-orange-100 text-xs mt-0.5">{formatCurrency(todayStats.revenueToday)} revenue</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `৳${value}`} />
              <Tooltip 
                formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Revenue']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="status"
                label={({ status, count }) => `${status}: ${count}`}
              >
                {statusData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={STATUS_COLORS[entry.status] || '#6b7280'} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {statusData.map((item) => (
              <div key={item.status} className="flex items-center gap-1.5 text-xs">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: STATUS_COLORS[item.status] || '#6b7280' }}
                />
                <span className="capitalize">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              width={150}
              tickFormatter={(value) => value.length > 20 ? `${value.slice(0, 20)}...` : value}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'totalSold' ? `${value} units` : `৳${value.toLocaleString()}`,
                name === 'totalSold' ? 'Units Sold' : 'Revenue'
              ]}
            />
            <Legend />
            <Bar dataKey="totalSold" name="Units Sold" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

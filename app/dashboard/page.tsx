"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const {
    data: dashboard,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  if (error) {
    const handleRetry = () => {
      queryClient.invalidateQueries({queryKey: ["dashboard-data"]});
    };

    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 max-w-md">
          <p className="font-semibold mb-1">Failed to load dashboard</p>
          <p className="text-sm opacity-80">{(error as Error).message}</p>
        </div>
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  const {summary, revenueChart, topCategories, recentOrders} = dashboard || {};

  const stats = [
    {
      title: "Today's Sales",
      value: `৳${summary?.todaySales?.toLocaleString()}`,
      change: "+0%", // Future enhancement: compare with yesterday
      trend: "up",
      description: `${summary?.itemsSoldToday || 0} items sold`,
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      title: "Today's Revenue",
      value: `৳${summary?.todayRevenue?.toLocaleString()}`,
      change: "+0%",
      trend: "up",
      description: "Available to payout",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Today's Orders",
      value: summary?.todayOrders?.toString() || "0",
      change: "+0%",
      trend: "up",
      description: "New orders placed today",
      icon: ShoppingCart,
      color: "bg-primary/50",
    },
    {
      title: "Total Products",
      value: summary?.totalProducts?.toString() || "0",
      change: "",
      trend: "up",
      description: `${summary?.lowStockProducts || 0} low stock items`,
      icon: Package,
      color: "bg-purple-500",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-card rounded-xl p-5 shadow-sm border border-border"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} p-2.5 rounded-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              {stat.change && (
                <span
                  className={`text-sm font-medium flex items-center gap-1 ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Revenue Overview
              </h3>
              <p className="text-sm text-muted-foreground">
                Daily revenue for the last 7 days
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ৳
                {revenueChart
                  ?.reduce((sum: number, d: any) => sum + d.revenue, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Weekly Revenue
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(val) =>
                    new Date(val).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })
                  }
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(val) =>
                    `৳${val > 999 ? (val / 1000).toFixed(1) + "k" : val}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [
                    `৳${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString("en-GB", {
                      dateStyle: "long",
                    })
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Top Categories
          </h3>
          <div className="space-y-6">
            {topCategories?.length > 0 ? (
              topCategories.map((item: any, index: number) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground w-4">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                        style={{width: `${item.percentage}%`}}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      {item.value} units sold
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                <p>No category data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-accent/5">
          <h3 className="text-lg font-semibold text-foreground">
            Recent Orders
          </h3>
          <Link href="/dashboard/orders">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-accent/40">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders?.length > 0 ? (
                recentOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground">
                      ৳{order.amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-accent"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-muted-foreground"
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

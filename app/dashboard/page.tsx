'use client';

import React from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Package, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const stats = [
        { 
            title: "Today's Sales", 
            value: "$2,550", 
            change: "+5.2%", 
            trend: "up",
            description: "123 items sold",
            icon: DollarSign,
            color: "bg-emerald-500"
        },
        { 
            title: "Today's Revenue", 
            value: "$1,550", 
            change: "+15.3%", 
            trend: "up",
            description: "Available to payout",
            icon: TrendingUp,
            color: "bg-blue-500"
        },
        { 
            title: "Today's Orders", 
            value: "16", 
            change: "+10.5%", 
            trend: "up",
            description: "4 pending orders",
            icon: ShoppingCart,
            color: "bg-primary/50"
        },
        { 
            title: "Total Products", 
            value: "245", 
            change: "-2.1%", 
            trend: "down",
            description: "12 low stock items",
            icon: Package,
            color: "bg-purple-500"
        },
    ];

    const topProducts = [
        { name: "Components", value: 85 },
        { name: "Desktop", value: 70 },
        { name: "Smartphone", value: 60 },
        { name: "Laptops", value: 55 },
        { name: "Accessories", value: 52 },
    ];

    const recentOrders = [
        { id: "#11232", product: "iPhone 14 Pro Max", customer: "Arnab Rahman", date: "Feb 18, 2023", status: "Delivered", amount: "$1,150.00" },
        { id: "#11231", product: "MacBook Pro 16\"", customer: "Sara Khan", date: "Feb 17, 2023", status: "Shipped", amount: "$2,499.00" },
        { id: "#11230", product: "Samsung Galaxy S23", customer: "John Doe", date: "Feb 16, 2023", status: "Processing", amount: "$899.00" },
        { id: "#11229", product: "Sony WH-1000XM5", customer: "Alice Brown", date: "Feb 15, 2023", status: "Delivered", amount: "$349.00" },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Processing': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
             
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.color} p-2.5 rounded-lg`}>
                                <stat.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className={`text-sm font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.description}</div>
                    </div>
                ))}
            </div>

             
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                            <p className="text-sm text-gray-500">Monthly revenue breakdown</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">$75,000</span>
                            <span className="text-sm font-medium text-emerald-600 flex items-center gap-0.5">
                                +5% <ArrowUpRight className="h-3 w-3" />
                            </span>
                        </div>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                        <div className="text-center text-gray-400">
                            <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Revenue Chart</p>
                        </div>
                    </div>
                </div>

                 
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                    <div className="space-y-4">
                        {topProducts.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-3">
                                <span className="text-xs font-medium text-gray-400 w-4">{index + 1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                        <span className="text-gray-500">{item.value}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full transition-all duration-500" 
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{order.product}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{order.customer}</td>
                                    <td className="px-5 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                                    <td className="px-5 py-4">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

"use client";

import React from "react";
import {useAuth} from "@/contexts/AuthProvider";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {EmptyState} from "@/components/ui/EmptyState";
import {ShoppingBag, Package, ChevronRight, Clock} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {toast} from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function OrdersPage() {
  const {user} = useAuth();
  const router = useRouter();

  // Fetch orders
  const {data: orders = [], isLoading} = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await fetch(`${API_URL}/api/orders/user/${user.email}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-20 px-4">
        <EmptyState
          icon={ShoppingBag}
          title="Sign in to view orders"
          description="Please log in to your account to see your purchase history and track your orders."
          actionLabel="Sign In"
          actionLink="/login"
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4">
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="You haven't placed any orders yet. Start shopping to find the best deals!"
          actionLabel="Start Shopping"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Check the status of your recent orders and manage returns.
            </p>
          </div>
          <Link href="/" className="w-full md:w-auto">
            <Button variant="outline" className="rounded-full w-full md:w-auto">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="space-y-4 md:space-y-6">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-100">
                <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-between gap-3 md:gap-4 mb-3 md:mb-0">
                  <div>
                    <p className="text-[10px] md:text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">
                      Order Placed
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">
                      Total
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">
                      ৳{order.amount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">
                      Status
                    </p>
                    <Badge
                      className={`capitalize text-xs ${
                        order.orderStatus === "delivered"
                          ? "bg-green-500 text-white"
                          : order.orderStatus === "cancelled"
                          ? "bg-red-500 text-white"
                          : order.orderStatus === "returned"
                          ? "bg-gray-500 text-white"
                          : order.orderStatus === "shipped"
                          ? "bg-blue-500 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {order.orderStatus || "Pending"}
                    </Badge>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[10px] md:text-xs uppercase font-bold text-gray-400 tracking-wider mb-1 md:text-right">
                      Order #
                    </p>
                    <p className="text-xs md:text-sm font-mono text-gray-600">
                      {order.orderId || order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6">
                <div className="flex flex-col gap-4 md:gap-6">
                  {order.cart?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-3 md:gap-4 items-center">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-50 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder-product.png"}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm md:text-base text-gray-900 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm md:text-base font-bold text-primary">
                          ৳{item.price?.toLocaleString()}
                        </p>
                      </div>
                      <Link
                        href={`/productDetails/${item.productId || item._id}`}
                        className="hidden md:block"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 rounded-full text-gray-400 hover:text-primary"
                        >
                          View <ChevronRight size={14} />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 md:p-6 bg-gray-50/50 border-t border-gray-100">
                <div className="flex flex-col md:flex-row gap-2 md:gap-3 md:justify-end">
                  <Link
                    href={`/orders/${order.orderId || order._id}`}
                    className="w-full md:w-auto"
                  >
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full w-full md:w-auto md:px-8 shadow-sm hover:shadow transition-all font-semibold"
                    >
                      Order Details
                    </Button>
                  </Link>
                  {order.courierInfo?.trackingCode && (
                    <a
                      href={`https://steadfast.com.bd/track-order?tracking_code=${order.courierInfo.trackingCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full w-full md:w-auto md:px-6 border-gray-300"
                      >
                        Track Package
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

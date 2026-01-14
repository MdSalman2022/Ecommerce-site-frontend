"use client";

import React, {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@/contexts/AuthProvider";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {Button} from "@/components/ui/button";

function OrderHistory() {
  const {user} = useAuth();
  const {orders, refetchOrders} = useUserActivity();

  // Fetch orders when component mounts
  useEffect(() => {
    refetchOrders();
  }, []);

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order: any) => order.email === user?.email)
    : [];

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-10">
          Order History
        </h2>

        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order: any) => (
              <div
                key={order._id}
                className="border border-border rounded-xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center p-5 bg-accent/30">
                  <div>
                    <p className="font-bold text-foreground">
                      Order #{order.orderId || order._id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ordered: {order.date}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium text-sm">
                    Shipped
                  </span>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-border">
                  {order.items?.map((product: any, idx: number) => (
                    <div
                      key={product._id || idx}
                      className="grid grid-cols-4 gap-4 items-center p-4 hover:bg-accent/20 transition-colors"
                    >
                      <div className="relative w-16 h-16">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-foreground font-medium line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-muted-foreground">${product.price}</p>
                      <Link
                        href={`/productDetails/${
                          product._id
                        }/${encodeURIComponent(product.name).replace(
                          /%20/g,
                          "-"
                        )}`}
                      >
                        <Button variant="secondary" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-foreground mb-6">
              No orders found
            </p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;

"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Package, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${orderId}`
      );
      if (!res.ok) throw new Error("Order not found");
      return res.json();
    },
    enabled: !!orderId,
  });

  // Trigger confetti on mount
  React.useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Package className="w-16 h-16 text-gray-300" />
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="text-lg font-bold font-mono">
                {order.orderId || order._id}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="text-2xl font-bold text-primary">
                ৳{order.amount?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    Order Confirmation Email Sent
                  </p>
                  <p className="text-gray-500">
                    Check your inbox at {order.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    We're Preparing Your Order
                  </p>
                  <p className="text-gray-500">
                    You'll receive updates via email and SMS
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Track Your Order</p>
                  <p className="text-gray-500">
                    Use your order number to track delivery status
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href={`/orders/${order.orderId || order._id}`} className="w-full">
            <Button
              variant="default"
              className="w-full h-12 text-base font-semibold"
            >
              <Package className="w-5 h-5 mr-2" />
              View Order Details
            </Button>
          </Link>
          <Link href={`/orders/${order.orderId || order._id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              View & Print Invoice
            </Button>
          </Link>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

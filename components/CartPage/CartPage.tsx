"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {HiArrowNarrowLeft} from "react-icons/hi";
import {FaAngleRight, FaShoppingCart} from "react-icons/fa";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import ProductTable from "./ProductTable";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

function CartPage() {
  const {cart, subTotal, setSubPrice} = useUserActivity();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.totalPrice || item.price * (item.quantity || 1);
    });
    setSubPrice(price);
    // Mark loading complete after component mounts
    setIsLoading(false);
  }, [cart, setSubPrice]);

  if (isLoading) {
    return (
      <div className="md:min-h-screen bg-background">
        {/* Desktop skeleton */}
        <div className="hidden md:block container mx-auto py-20 px-4 max-w-6xl animate-pulse">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="grid grid-cols-5 gap-4 bg-gray-100 py-4 rounded-t-xl">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
          <div className="border border-gray-200 rounded-b-xl mb-6 space-y-3 p-4">
            {[1, 2].map((i) => (
              <div key={i} className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-6 bg-gray-200 rounded" />
                ))}
              </div>
            ))}
          </div>
          <Card className="border-t-2 border-gray-200">
            <CardContent className="p-6 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-1/3" />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden pb-32 animate-pulse">
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="p-4 pb-4 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 space-y-3">
                <div className="h-20 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
          <div className="fixed bottom-16 left-0 right-0 bg-background border-t p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (cart.length > 0) {
    return (
      <div className="md:min-h-screen bg-background">
        {/* Desktop View */}
        <div className="hidden md:block container mx-auto py-20 px-4 max-w-6xl">
          <div className="mb-6">
            {/* Header with cart count */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <FaShoppingCart className="text-primary" />
                Shopping Cart
              </h1>
              <Badge
                variant="secondary"
                className="text-sm md:text-base px-3 py-1"
              >
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </Badge>
            </div>

            {/* Cart Header - Desktop Only */}
            <div className="grid grid-cols-5 gap-4 place-items-center bg-accent/50 py-4 rounded-t-xl font-semibold text-sm">
              <p>Items</p>
              <p>Quantity</p>
              <p>Unit Price</p>
              <p>Total Price</p>
              <p>Actions</p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="border border-border rounded-b-xl mb-6">
            {cart.map((item, index: number) => (
              <ProductTable key={item._id || index} item={item} index={index} />
            ))}
          </div>

          {/* Cart Summary */}
          <Card className="border-t-2 border-primary">
            <CardContent className="p-6">
              <div className="flex justify-between items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-primary hover:underline transition-all"
                >
                  <HiArrowNarrowLeft className="text-xl" />
                  <span className="font-semibold">Continue Shopping</span>
                </Link>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-base text-muted-foreground">
                      Subtotal:
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      ৳{subTotal.toLocaleString()}
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button size="lg" className="flex items-center gap-2">
                      Checkout <FaAngleRight />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile View */}
        <div className="md:hidden pb-32">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FaShoppingCart className="text-primary" />
                Shopping Cart
              </h1>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </Badge>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-4 pb-4">
            {cart.map((item, index: number) => (
              <ProductTable key={item._id || index} item={item} index={index} />
            ))}
          </div>

          {/* Continue Shopping Link */}
          <div className="px-4 pb-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:underline transition-all text-sm"
            >
              <HiArrowNarrowLeft />
              <span className="font-semibold">Continue Shopping</span>
            </Link>
          </div>

          {/* Fixed Bottom Checkout Bar - Above Mobile Footer */}
          <div className="fixed bottom-16 left-0 right-0 bg-background border-t shadow-lg z-40 safe-bottom">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="text-2xl font-bold text-foreground">
                  ৳{subTotal.toLocaleString()}
                </span>
              </div>
              <Link href="/checkout" className="block">
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  Checkout <FaAngleRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-20 justify-center items-center gap-6">
      <p className="text-3xl font-bold text-foreground">Your cart is empty</p>
      <Link href="/">
        <Button variant="outline" size="lg">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}

export default CartPage;

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { FaAngleRight } from 'react-icons/fa';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import ProductTable from './ProductTable';
import { Button } from '@/components/ui/button';

function CartPage() {
  const { cart, subTotal, setSubPrice } = useUserActivity();

  useEffect(() => {
    let price = 0;
    cart.forEach((item: any) => {
      price += item.totalPrice || (item.price * (item.quantity || 1));
    });
    setSubPrice(price);
  }, [cart, setSubPrice]);

  if (cart.length > 0) {
    return (
      <div className="container mx-auto min-h-screen py-5 md:py-20 px-4">
        <div className="grid lg:grid-cols-4 gap-5">
          <div className="col-span-4">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Shopping Cart</h1>

            {/* Cart Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 place-items-center bg-accent/50 py-4 rounded-t-xl font-semibold text-sm">
              <p>Items</p>
              <p>Quantity</p>
              <p>Unit Price</p>
              <p>Total Price</p>
              <p>Actions</p>
            </div>

            {/* Cart Items */}
            <div className="border border-border rounded-b-xl mb-6">
              {cart.map((item: any, index: number) => (
                <ProductTable key={item._id || index} item={item} index={index} />
              ))}
            </div>

            {/* Cart Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
              <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
                <HiArrowNarrowLeft />
                <span className="font-semibold">Continue Shopping</span>
              </Link>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-2xl font-bold text-foreground">${subTotal.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="flex items-center gap-2">
                    Checkout <FaAngleRight />
                  </Button>
                </Link>
              </div>
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

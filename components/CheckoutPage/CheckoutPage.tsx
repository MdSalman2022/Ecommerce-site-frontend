'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  name: string;
  address: string;
  contact: string;
  city: string;
  email?: string;
}

import { useSiteSettings } from '@/hooks/useSiteSettings';
import path from 'path';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  // Find user info
  // Find user info
  const info: any = user || {};

  const { ecommerce } = useSiteSettings();
  const { setDeliveryDetails, cart } = useUserActivity();

  // Calculate Cart Total
  const cartTotal = cart.reduce((total: number, item: any) => {
    const price = item.discountPrice || item.price || 0;
    return total + (price * item.quantity);
  }, 0);

  // Validation Checks
  const isGuestCheckoutDisabled = !user && ecommerce?.enableGuestCheckout === false;
  const isMinOrderNotMet = ecommerce?.minOrderAmount > 0 && cartTotal < ecommerce.minOrderAmount;
  const isMaxOrderExceeded = ecommerce?.maxOrderAmount > 0 && cartTotal > ecommerce.maxOrderAmount;

  // Track checkout started when page loads
  useEffect(() => {
    const trackCheckoutStarted = async () => {
      const sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId || cart.length === 0) return;

      try {
        await fetch(`${API_URL}/api/cart/checkout-started`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
      } catch (error) {
        console.debug('Checkout tracking error:', error);
      }
    };

    trackCheckoutStarted();
  }, [cart.length]);

  const handleDelivery = async (data: any) => {
    const sessionId = localStorage.getItem('cart_session_id');

    // Track checkout info filled (for abandoned cart recovery with contact info)
    if (sessionId) {
      try {
        await fetch(`${API_URL}/api/cart/checkout-started`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            checkoutInfo: {
              name: data.name,
              address: data.address,
              city: data.city,
              contact: data.contact,
              email: data.email || user?.email
            }
          })
        });
      } catch (error) {
        console.debug('Checkout info tracking error:', error);
      }
    }

    // Save to context for both guest and logged-in users
    setDeliveryDetails({
        ...data,
        email: data.email || user?.email // Use form email or auth email
    });

    // If logged in, also sync with backend profile
    if (user?.email) {
        try {
            await fetch(`${API_URL}/deliveryInfo`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    orderName: data.name,
                    address: data.address,
                    contact: data.contact, // Using contact as phone
                    city: data.city,
                }),
            });
        } catch (error) {
            console.error("Failed to sync profile", error);
        }
    }
    
    toast.success('Delivery details saved!');
    router.push('/order-confirm');
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <h2 className="text-center text-4xl font-bold text-foreground mb-8">Shipping Details</h2>

          {/* Guest Checkout Restriction */}
          {isGuestCheckoutDisabled && (
            <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6 text-center">
              <p className="font-medium mb-2">Guest checkout is currently disabled.</p>
              <p className="text-sm mb-4">Please log in or create an account to proceed with your order.</p>
              <div className="flex gap-3 justify-center">
                <Button variant="default" onClick={() => router.push('/login?redirect=/checkout')}>
                  Log In
                </Button>
                <Button variant="outline" onClick={() => router.push('/signup')}>
                  Sign Up
                </Button>
              </div>
            </div>
          )}

          {/* Order Amount Restrictions */}
          {!isGuestCheckoutDisabled && isMinOrderNotMet && (
             <div className="w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
               <p className="font-medium">Minimum Order Required</p>
               <p className="text-sm">
                 Your cart total is ${cartTotal.toFixed(2)}. You need to spend at least ${ecommerce.minOrderAmount.toFixed(2)} to checkout.
               </p>
               <Link href="/" className="text-primary text-sm hover:underline mt-2 inline-block">
                 Continue Shopping
               </Link>
             </div>
          )}

          {!isGuestCheckoutDisabled && isMaxOrderExceeded && (
             <div className="w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
               <p className="font-medium">Order Limit Exceeded</p>
               <p className="text-sm">
                 Your cart total is ${cartTotal.toFixed(2)}. The maximum order limit is ${ecommerce.maxOrderAmount.toFixed(2)}. Please reduce your cart items.
               </p>
             </div>
          )}

          {!isGuestCheckoutDisabled && !isMinOrderNotMet && !isMaxOrderExceeded && (
          <form onSubmit={handleSubmit(handleDelivery)} className="w-full space-y-6"> 
            <div className="space-y-2">
              <Label htmlFor="email">Email Address {user ? '(Optional)' : '(Required for Receipt)'}</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email || ''}
                {...register('email', { 
                    required: !user ? 'Email is required for guest checkout' : false,
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
              />
               {errors.email?.message && (
                <p className="text-destructive text-sm">{errors.email.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue={info.name || info.orderName || ''}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                defaultValue={info.address || ''}
                {...register('address', { required: 'Address is required' })}
              />
              {errors.address && (
                <p className="text-destructive text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                defaultValue={info.contact || ''}
                {...register('contact', { required: 'Contact number is required' })}
              />
              {errors.contact && (
                <p className="text-destructive text-sm">{errors.contact.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                defaultValue={info.city || ''}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && (
                <p className="text-destructive text-sm">{errors.city.message}</p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" className="flex items-center gap-2">
                Save & Continue to Billing <FaAngleRight />
              </Button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

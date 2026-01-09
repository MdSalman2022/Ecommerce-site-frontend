"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState';
import { ShoppingBag, Package, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';

export default function OrdersPage() {
  const { user, orders, loading, setCart } = useAuth();
  const router = useRouter();

  const handleReorder = (order: any) => {
    const itemsToReorder = order.cart.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
      totalPrice: item.price * (item.quantity || 1)
    }));
    
    setCart(prev => {
      // Logic to merge or replace. Let's merge for convenience.
      const newCart = [...prev];
      itemsToReorder.forEach((newItem: any) => {
        const existingIndex = newCart.findIndex(i => i._id === newItem._id);
        if (existingIndex > -1) {
          newCart[existingIndex].quantity += newItem.quantity;
          newCart[existingIndex].totalPrice += newItem.totalPrice;
        } else {
          newCart.push(newItem);
        }
      });
      return newCart;
    });

    toast.success('Items added to cart!');
    router.push('/cart');
  };

  if (loading) {
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

  const myOrders = orders.filter((o: any) => o.email === user.email);

  if (myOrders.length === 0) {
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
    <div className="bg-gray-50/50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
            <p className="text-gray-500 mt-1">Check the status of your recent orders and manage returns.</p>
          </div>
          <Link href="/">
             <Button variant="outline" className="rounded-full">Continue Shopping</Button>
          </Link>
        </div>

        <div className="space-y-6">
          {myOrders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="bg-gray-50 p-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">Order Placed</p>
                    <p className="text-sm font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">Total</p>
                    <p className="text-sm font-semibold text-gray-900">${(order.amount / 100).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">Status</p>
                    <Badge variant={order.shipment === 'delivered' ? 'default' : 'secondary'} className="capitalize">
                      {order.shipment || 'Processing'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1 text-right">Order #</p>
                  <p className="text-sm font-mono text-gray-600">{order._id.slice(-8).toUpperCase()}</p>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="flex flex-col gap-6">
                   {order.cart?.map((item: any, idx: number) => (
                     <div key={idx} className="flex gap-4 items-center">
                        <div className="relative w-20 h-20 rounded-lg bg-gray-50 flex-shrink-0">
                           <Image 
                              src={item.image || '/placeholder-product.png'} 
                              alt={item.name} 
                              fill 
                              className="object-contain p-2"
                           />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                           <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                           <p className="text-sm font-bold text-primary">${item.price.toFixed(2)}</p>
                        </div>
                        <Link href={`/productDetails/${item._id}`}>
                           <Button variant="ghost" size="sm" className="gap-1 rounded-full text-gray-400 hover:text-primary">
                             View <ChevronRight size={14} />
                           </Button>
                        </Link>
                     </div>
                   ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                 <Link href={`/orders/${order._id}`}>
                    <Button variant="outline" size="sm" className="rounded-full px-6">Order Details</Button>
                 </Link>
                 <Button 
                    onClick={() => handleReorder(order)}
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-sm hover:shadow transition-all"
                 >
                   Re-order Items
                 </Button>
                 <Button size="sm" className="bg-gray-900 hover:bg-black text-white rounded-full px-6">Track Package</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

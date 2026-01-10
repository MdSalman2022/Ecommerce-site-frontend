"use client";

import React, { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Printer, 
  ChevronLeft,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const router = useRouter();
  const { user } = useAuth();
  
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/${orderId}`);
      if (!res.ok) throw new Error('Order not found');
      return res.json();
    },
    enabled: !!orderId,
  });

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-500 font-medium tracking-tight">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Package className="w-16 h-16 text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-900">Order not found</h1>
        <Link href="/orderhistory">
          <Button variant="outline" className="rounded-full">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'Confirmed', icon: CheckCircle2, status: 'completed' },
    { label: 'Picked', icon: Package, status: order.shipment === 'picked' || order.shipment === 'shipped' || order.shipment === 'delivered' ? 'completed' : 'pending' },
    { label: 'Shipped', icon: Truck, status: order.shipment === 'shipped' || order.shipment === 'delivered' ? 'completed' : 'pending' },
    { label: 'Delivered', icon: CheckCircle2, status: order.shipment === 'delivered' ? 'completed' : 'pending' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Orders
          </button>
          
          <div className="flex gap-3">
            <Button 
                variant="outline" 
                onClick={handlePrint}
                className="rounded-full gap-2 border-gray-200 hover:bg-gray-100"
            >
              <Printer size={18} /> Print Invoice
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              Track Order
            </Button>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none">
          
          <div className="bg-gray-900 text-white p-8 print:hidden">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Order Status</p>
                <h2 className="text-2xl font-black capitalize tracking-tight flex items-center gap-3">
                  {order.shipment || 'In Progress'}
                  <Badge className="bg-primary text-white border-none py-1 px-3">
                    {order.orderStatus ? 'Active' : 'Cancelled'}
                  </Badge>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Order #</p>
                <p className="text-xl font-mono">{order._id.slice(-8).toUpperCase()}</p>
              </div>
            </div>

            
            <div className="mt-10 relative">
               <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full"></div>
               <div className="flex justify-between relative z-10">
                  {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.status === 'completed' ? 'bg-primary border-primary' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                          <step.icon size={18} />
                       </div>
                       <span className={`text-xs font-bold uppercase tracking-tighter ${step.status === 'completed' ? 'text-primary' : 'text-gray-500'}`}>{step.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="flex justify-between items-start mb-12">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="https://i.ibb.co/xSLpY24/logo-colored.webp" 
                      alt="BestDeal" 
                      width={48} 
                      height={48}
                    />
                    <span className="text-3xl font-black tracking-tighter">BestDeal</span>
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">
                    <p>123 Tech Avenue, Silicon Suite 500</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                    <p>support@bestdeal.com</p>
                  </div>
               </div>
               <div className="text-right">
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase mb-4">Invoice</h1>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p><span className="font-bold text-gray-900">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><span className="font-bold text-gray-900">Invoice:</span> INV-{order._id.slice(-6).toUpperCase()}</p>
                  </div>
               </div>
            </div>

            
            <div className="grid grid-cols-2 gap-12 border-t border-b border-gray-100 py-10 mb-12">
               <div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CreditCard size={14} /> Bill To
                  </h3>
                  <div className="font-bold text-gray-900">
                    <p className="text-lg">{order.name}</p>
                    <p className="font-medium text-gray-600">{order.email}</p>
                    <p className="font-normal text-gray-500 mt-2 text-sm italic">Payment: Visa ending in {order.cardnumber?.slice(-4) || '••••'}</p>
                  </div>
               </div>
               <div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin size={14} /> Ship To
                  </h3>
                  <div className="font-bold text-gray-900">
                    <p>{order.name}</p>
                    <div className="font-medium text-gray-500 leading-relaxed text-sm mt-1 whitespace-pre-wrap">
                      {order.address}<br />
                      {order.city}
                    </div>
                  </div>
               </div>
            </div>

            
            <table className="w-full mb-12">
               <thead>
                  <tr className="border-b-2 border-gray-900 text-left">
                    <th className="py-4 font-black uppercase text-xs tracking-widest">Description</th>
                    <th className="py-4 font-black uppercase text-xs tracking-widest text-center">Qty</th>
                    <th className="py-4 font-black uppercase text-xs tracking-widest text-right">Price</th>
                    <th className="py-4 font-black uppercase text-xs tracking-widest text-right">Total</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {order.cart?.map((item: any, idx: number) => (
                    <tr key={idx}>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded bg-gray-50 flex-shrink-0 print:hidden relative">
                                <Image src={item.image || ''} alt="" fill className="object-contain p-1" />
                             </div>
                             <div>
                                <p className="font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-400 font-mono tracking-tighter">SKU: {item._id.slice(-6).toUpperCase()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center font-bold">{item.quantity}</td>
                       <td className="py-6 text-right font-medium">৳{item.price?.toLocaleString()}</td>
                       <td className="py-6 text-right font-bold text-gray-900">৳{(item.price * item.quantity)?.toLocaleString()}</td>
                    </tr>
                  ))}
               </tbody>
            </table>

            
            <div className="flex justify-end pt-8 border-t-2 border-gray-100">
               <div className="w-full max-w-xs space-y-4">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                     <span>৳{order.amount?.toLocaleString()}</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-red-500 font-bold bg-red-50 px-3 py-1 rounded">
                      <span>Discount {order.promoCode && `(${order.promoCode})`}</span>
                       <span>-৳{order.discountAmount?.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500 font-medium border-b border-gray-100 pb-4">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-gray-900 pt-2">
                    <span>Total</span>
                     <span className="text-primary">৳{(order.amount - (order.discountAmount || 0))?.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            
            <div className="mt-20 pt-12 border-t border-gray-100 text-center">
               <h4 className="text-xl font-black text-gray-900 mb-2">Thank you for your business!</h4>
               <p className="text-gray-500 text-sm max-w-sm mx-auto">
                 If you have any questions about this invoice, please use our contact form or email us at support@bestdeal.com
               </p>
               <div className="mt-10 flex justify-center gap-12 font-bold text-xs uppercase tracking-widest text-gray-400">
                  <p>100% Secure Payment</p>
                  <p>30 Days Return Policy</p>
                  <p>Lifetime Support</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InvoiceGenerator from '@/components/Invoice/InvoiceGenerator.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Truck, Clock, History } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  allOrders?: any[];
}

export default function OrderDetailsModal({ order, isOpen, onClose, allOrders = [] }: OrderDetailsModalProps) {
  if (!order) return null;

  // Filter for history based on phone (primary) or email
  const customerHistory = allOrders.filter(o => 
      (o.contact && o.contact === order.contact) || 
      (o.email && order.email && o.email === order.email)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalSpent = customerHistory.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalOrders = customerHistory.length;

  const handleSendToCourier = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/order/courier`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order._id }),
        });
        const data = await res.json();
        if (res.ok) {
            toast.success('Sent to Steadfast Courier!');
            window.location.reload();
        } else {
            toast.error(data.message || 'Failed to send to courier');
        }
    } catch (error) {
        console.error(error);
        toast.error('Network error');
    }
  };

    const getStatusColor = (status: string) => {
        switch(status?.toLowerCase()) {
            case 'cancelled': return 'bg-red-100 text-red-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'shipped': return 'bg-blue-100 text-blue-700';
            case 'processing': return 'bg-purple-100 text-purple-700';
            case 'returned': return 'bg-gray-100 text-gray-700';
            default: return 'bg-orange-100 text-orange-700';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="print:hidden">
                    <DialogTitle>Order #{order.orderId || order._id.slice(0, 8).toUpperCase()}</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="print:hidden">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="invoice">Invoice</TabsTrigger>
                        <TabsTrigger value="shipment">Shipment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-medium mb-2 text-primary">Customer Info</h3>
                                <p className="text-sm"><strong>Name:</strong> {order.name}</p>
                                <p className="text-sm"><strong>Email:</strong> {order.email || 'N/A'}</p>
                                <p className="text-sm"><strong>Phone:</strong> {order.contact}</p>
                                <p className="text-sm"><strong>Address:</strong> {order.address}</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-medium mb-2 text-primary">Order Info</h3>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm">Status:</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize font-medium ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus || 'pending'}
                                    </span>
                                </div>
                                <p className="text-sm"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm"><strong>Total:</strong> ৳{order.amount?.toLocaleString()}</p>
                                <p className="text-sm">
                                    <strong>Payment:</strong>{' '}
                                    {order.transactionId && order.transactionId !== 'Cash on Delivery' 
                                        ? `Stripe (${order.transactionId})` 
                                        : 'Cash on Delivery'}
                                </p>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-medium mb-2 text-primary">Ordered Items</h3>
                            <div className="space-y-2">
                                {order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded border">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold opacity-50">{idx + 1}.</span>
                                            <img src={item.image} className="w-10 h-10 rounded object-cover shadow-sm border bg-white" alt="" />
                                            <div>
                                                <p className="text-sm font-medium">{item.name}</p>
                                                {item.variantName && <p className="text-[10px] text-primary uppercase font-bold">{item.variantName}</p>}
                                                <p className="text-xs text-gray-500">৳{item.price.toLocaleString()} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-sm">৳{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="invoice">
                        <InvoiceGenerator order={order} />
                    </TabsContent>
                    
                    <TabsContent value="shipment" className="space-y-4">
                        <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <div>
                                <h3 className="font-medium">Courier Integration</h3>
                                <p className="text-sm text-gray-500">Status and tracking for this shipment.</p>
                            </div>
                            <Button onClick={handleSendToCourier} disabled={!!order.courierInfo?.consignmentId}>
                                <Truck className="w-4 h-4 mr-2" />
                                {order.courierInfo?.consignmentId ? 'Already Sent' : 'Send to Courier'}
                            </Button>
                        </div>
                        
                        {order.courierInfo?.consignmentId && (
                            <div className="p-4 border rounded-lg space-y-2 bg-blue-50/30">
                                <h3 className="font-medium mb-2 border-b pb-1 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    Tracking Details
                                </h3>
                                <div className="grid grid-cols-2 gap-y-1">
                                    <p className="text-xs text-gray-500">Consignment ID:</p>
                                    <p className="text-xs font-mono font-bold">{order.courierInfo.consignmentId}</p>
                                    <p className="text-xs text-gray-500">Tracking Code:</p>
                                    <p className="text-xs font-mono font-bold">{order.courierInfo.trackingCode}</p>
                                    <p className="text-xs text-gray-500">Current Status:</p>
                                    <p className={`text-xs font-bold uppercase w-fit px-2 py-0.5 rounded ${
                                        order.courierInfo.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>{order.courierInfo.status || 'Sent'}</p>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <div className="flex gap-4 mb-4">
                            <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl flex-1">
                                <p className="text-xs text-gray-500 font-medium">Total Spent</p>
                                <p className="text-xl font-bold text-primary">৳{totalSpent.toLocaleString()}</p>
                            </div>
                            <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl flex-1">
                                <p className="text-xs text-gray-500 font-medium">Total Orders</p>
                                <p className="text-xl font-bold text-primary">{totalOrders}</p>
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 border-b text-gray-600 font-semibold">
                                    <tr>
                                        <th className="p-3">Order ID</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {customerHistory.length > 0 ? customerHistory.map((histOrder) => (
                                        <tr key={histOrder._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-3 font-medium text-primary uppercase text-xs">#{histOrder.orderId || histOrder._id.slice(0, 8)}</td>
                                            <td className="p-3 text-gray-600">{new Date(histOrder.date).toLocaleDateString()}</td>
                                            <td className="p-3">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(histOrder.orderStatus)}`}>
                                                    {histOrder.orderStatus || 'pending'}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right font-bold text-gray-800">৳{histOrder.amount.toLocaleString()}</td>
                                        </tr>
                                    )) : (
                                        <tr key="no-history">
                                            <td colSpan={4} className="p-8 text-center text-gray-400 italic">No previous orders found for this customer.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog>
    );
}

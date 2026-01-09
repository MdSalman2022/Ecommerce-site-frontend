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
      o._id !== order._id && // Exclude current order
      (
          (o.contact && o.contact === order.contact) || 
          (o.email && order.email && o.email === order.email)
      )
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalSpent = customerHistory.reduce((acc, curr) => acc + (curr.amount || 0), 0) + (order.amount || 0);
  const totalOrders = customerHistory.length + 1;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="print:hidden">
          <DialogTitle>Order #{order._id}</DialogTitle>
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
                         <h3 className="font-medium mb-2">Customer Info</h3>
                         <p className="text-sm">Name: {order.name}</p>
                         <p className="text-sm">Email: {order.email || 'N/A'}</p>
                         <p className="text-sm">Phone: {order.contact}</p>
                         <p className="text-sm">Address: {order.address}</p>
                     </div>
                     <div className="p-4 border rounded-lg">
                         <h3 className="font-medium mb-2">Order Info</h3>
                         <p className="text-sm">Status: <span className="capitalize font-bold">{order.orderStatus}</span></p>
                         <p className="text-sm">Date: {order.date}</p>
                         <p className="text-sm">Total: ${order.amount}</p>
                         <p className="text-sm">Payment ID: {order.transactionId || 'COD'}</p>
                     </div>
                 </div>
                 
                 <div>
                     <h3 className="font-medium mb-2">Items</h3>
                     <div className="space-y-2">
                         {order.items.map((item: any, idx: number) => (
                             <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                 <div className="flex items-center gap-3">
                                     <span className="text-sm font-bold opacity-50">{idx + 1}.</span>
                                     <img src={item.image} className="w-10 h-10 rounded object-cover" alt="" />
                                     <div>
                                         <p className="text-sm font-medium">{item.name}</p>
                                         <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                     </div>
                                 </div>
                                 <span className="font-medium">${item.price * item.quantity}</span>
                             </div>
                         ))}
                     </div>
                 </div>
            </TabsContent>

            <TabsContent value="invoice">
                <InvoiceGenerator order={order} />
            </TabsContent>
            
            <TabsContent value="shipment" className="space-y-4">
                 <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                     <div>
                         <h3 className="font-medium">Steadfast Courier Integration</h3>
                         <p className="text-sm text-gray-500">Send this order to Steadfast for delivery.</p>
                     </div>
                     <Button onClick={handleSendToCourier} disabled={!!order.courierInfo?.consignmentId}>
                         <Truck className="w-4 h-4 mr-2" />
                         {order.courierInfo?.consignmentId ? 'Sent to Courier' : 'Send to Steadfast'}
                     </Button>
                 </div>
                 
                 {order.courierInfo?.consignmentId && (
                     <div className="p-4 border rounded-lg">
                         <h3 className="font-medium mb-2">Tracking Info</h3>
                         <p className="text-sm">Consignment ID: {order.courierInfo.consignmentId}</p>
                         <p className="text-sm">Tracking Code: {order.courierInfo.trackingCode}</p>
                         <p className="text-sm">Status: {order.courierInfo.status}</p>
                     </div>
                 )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
                <div className="flex gap-4 mb-4">
                    <div className="bg-primary/10 p-4 rounded-lg flex-1">
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-xl font-bold text-primary">${(totalSpent / 100).toFixed(2)}</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg flex-1">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-xl font-bold text-primary">{totalOrders}</p>
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {customerHistory.length > 0 ? customerHistory.map((histOrder) => (
                                <tr key={histOrder._id} className="hover:bg-gray-50">
                                    <td className="p-3 font-medium">#{histOrder.orderId || histOrder._id.slice(0, 8)}</td>
                                    <td className="p-3">{new Date(histOrder.date).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                                            histOrder.shipment === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {histOrder.orderStatus ? histOrder.shipment : 'Cancelled'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right font-medium">${(histOrder.amount / 100).toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-6 text-center text-gray-500">No previous orders found.</td>
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

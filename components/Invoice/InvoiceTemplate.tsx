import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface InvoiceProps {
  order: any;
}

export default function InvoiceTemplate({ order }: InvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 max-w-[210mm] mx-auto min-h-[297mm] shadow-lg print:shadow-none" id="invoice-print">
      {/* Print Trigger (Hidden in print) */}
      <div className="flex justify-end mb-6 print:hidden">
        <Button onClick={handlePrint} variant="outline">
          <Printer className="w-4 h-4 mr-2" /> Print Invoice
        </Button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-10 border-b pb-6">
        <div>
          <img src="https://res.cloudinary.com/dnuulo3h5/image/upload/v1767881296/logo-colored_ee6kpe.webp" alt="BestDeal Logo" className="h-12 w-auto mb-2" />
          <p className="text-gray-500 mt-1 uppercase text-sm font-bold tracking-wider">#{order.orderId || order._id.slice(0, 8)}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-primary">BestDeal Inc.</h2>
          <p className="text-sm text-gray-500">123 E-commerce St, Tech City</p>
          <p className="text-sm text-gray-500">support@bestdeal.com</p>
          <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
        </div>
      </div>

      {/* Client & specifics */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-gray-500 font-medium text-sm uppercase mb-2">Bill To</h3>
          <p className="font-bold text-gray-900">{order.name}</p>
          <p className="text-gray-600">{order.address}</p>
          <p className="text-gray-600">{order.city}, PostCode</p>
          <p className="text-gray-600">{order.email}</p>
          <p className="text-gray-600">{order.contact}</p>
        </div>
        <div className="text-right">
          <h3 className="text-gray-500 font-medium text-sm uppercase mb-2">Order Details</h3>
          <div className="space-y-1">
             <div className="flex justify-end gap-4">
                 <span className="text-gray-600">Date:</span>
                 <span className="font-medium">{order.date}</span>
             </div>
             <div className="flex justify-end gap-4">
                 <span className="text-gray-600">Status:</span>
                 <span className="font-medium capitalize">{order.orderStatus}</span>
             </div>
             <div className="flex justify-end gap-4">
                 <span className="text-gray-600">Payment:</span>
                 <span className="font-medium text-green-600">Paid</span>
             </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <table className="w-full mb-10">
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="text-left py-3 text-sm font-semibold text-gray-600">Item</th>
            <th className="text-center py-3 text-sm font-semibold text-gray-600">Quantity</th>
            <th className="text-right py-3 text-sm font-semibold text-gray-600">Price</th>
            <th className="text-right py-3 text-sm font-semibold text-gray-600">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item: any, idx: number) => (
            <tr key={idx} className="border-b border-gray-50">
              <td className="py-4">
                <p className="font-medium text-gray-900">{item.name}</p>
                {item.variantAttributes && ( // Assuming flattened attributes for display
                    <p className="text-xs text-gray-500">
                        {Object.entries(item.variantAttributes || {}).map(([k, v]) => `${k}: ${v}`).join(', ')}
                    </p>
                )}
              </td>
              <td className="text-center py-4 text-gray-600">{item.quantity}</td>
              <td className="text-right py-4 text-gray-600">${item.price}</td>
              <td className="text-right py-4 font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${(order.amount).toFixed(2)}</span>
          </div>
          {order.discountAmount > 0 && (
             <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${order.discountAmount}</span>
             </div>
          )}
          <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${(order.amount - (order.discountAmount || 0)).toFixed(2)}</span>
          </div>
           <div className="flex justify-between text-xs text-gray-500 pt-1">
            <span>Including VAT</span>
            <span>${((order.amount) * 0.15).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-20 border-t pt-8 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
        <p className="mt-1">For any inquiries, please contact support@bestdeal.com</p>
      </div>
    </div>
  );
}

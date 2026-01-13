'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import { useUserActivity } from '@/contexts/UserActivityProvider'; // Assuming this contains ALL orders for Admin
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import OrderDetailsModal from '../Orders/OrderDetailsModal';

function DashboardCustomers() {
  const { orders, refetchOrders } = useUserActivity();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [sortType, setSortType] = useState('spent-desc');
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<any[] | null>(null);

  // Fetch orders on mount
  useEffect(() => {
    refetchOrders();
  }, [refetchOrders]);

  // Group orders by Phone Number (Contact)
  const customers = useMemo(() => {
      const map = new Map();
      const ordersArray = Array.isArray(orders) ? orders : [];

      ordersArray.forEach((order: any) => {
          const key = order.contact || 'Unknown'; // Group by phone
          if (!map.has(key)) {
              map.set(key, {
                  id: key,
                  name: order.name,
                  email: order.email || 'Guest',
                  contact: key,
                  address: order.address,
                  orders: [],
                  orderCount: 0,
                  totalSpent: 0,
                  lastOrder: order.date
              });
          }
          const customer = map.get(key);
          customer.orders.push(order);
          customer.orderCount += 1;
          customer.totalSpent += order.amount;
          if (new Date(order.date) > new Date(customer.lastOrder)) {
              customer.lastOrder = order.date;
          }
      });
      return Array.from(map.values());
  }, [orders]);

  // Sorting
  const sortedCustomers = useMemo(() => {
      let items = [...customers];
      switch (sortType) {
          case 'spent-desc':
              return items.sort((a, b) => b.totalSpent - a.totalSpent);
          case 'spent-asc':
              return items.sort((a, b) => a.totalSpent - b.totalSpent);
          case 'orders-desc':
               return items.sort((a, b) => b.orderCount - a.orderCount);
          default:
              return items;
      }
  }, [customers, sortType]);


  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(customers.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">{customers.length} Unique Customers</p>
      </div>

      {/* Controls */}
      <div className="flex justify-end items-center gap-3 mb-4">
        <select
          value={postsPerPage}
          onChange={(e) => {
            setPostsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-border rounded-md px-3 py-2 bg-background"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <HiSortAscending className="text-xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortType('spent-desc')}>Highest Spenders</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortType('orders-desc')}>Most Orders</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Customers Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer: any, index: number) => (
              <TableRow 
                key={customer.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedCustomerOrders(customer.orders)}
              >
                <TableCell>{indexOfFirstPost + index + 1}</TableCell>
                <TableCell>
                    <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                </TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {customer.orderCount} Orders
                     </span>
                </TableCell>
                <TableCell className="font-bold text-green-600">
                  ৳{customer.totalSpent?.toLocaleString()}
                </TableCell>
                 <TableCell className="text-xs text-muted-foreground">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
       {/* Pagination */}
      {pageNumbers.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Button>
          ))}
        </div>
      )}

      {/* Customer History Modal */}
      <Dialog open={!!selectedCustomerOrders} onOpenChange={() => setSelectedCustomerOrders(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Order History</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                {selectedCustomerOrders?.map((order: any) => (
                    <div key={order._id} className="border rounded-lg p-4 flex justify-between items-center group hover:border-primary transition-colors">
                        <div>
                            <p className="font-bold">Order #{order._id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                            <p className="text-xs">{order.items.length} Items</p>
                        </div>
                        <div className="text-right">
                             <p className="font-bold text-primary">৳{order.amount?.toLocaleString()}</p>
                             <span className={`text-xs px-2 py-1 rounded-full ${order.shipment === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                 {order.shipment}
                             </span>
                        </div>
                    </div>
                ))}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashboardCustomers;

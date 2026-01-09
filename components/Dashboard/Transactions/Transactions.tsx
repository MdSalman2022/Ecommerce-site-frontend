'use client';

import React, { useState } from 'react';
import { HiOutlineMail, HiSortAscending } from 'react-icons/hi';
import { useUserActivity } from '@/contexts/UserActivityProvider';
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

function DashboardTransactions() {
  const { orders } = useUserActivity();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortType, setSortType] = useState('');

  const ordersArray = Array.isArray(orders) ? orders : [];

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const ordersPerPage = ordersArray.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(ordersArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Sorting
  const sortedItems = () => {
    const items = [...ordersPerPage];
    switch (sortType) {
      case 'latest':
        return items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'old':
        return items.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      default:
        return items;
    }
  };

  const displayItems = sortType === '' ? ordersPerPage : sortedItems();

  // Calculate total revenue
  const totalRevenue = ordersArray.reduce((sum: number, order: any) => sum + (order.amount || 0), 0);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
        <div className="text-right">
          <p className="text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-primary">${(totalRevenue / 100).toFixed(2)}</p>
        </div>
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
          <option value={5}>5</option>
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
            <DropdownMenuItem onClick={() => setSortType('latest')}>Latest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortType('old')}>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayItems.map((order: any, index: number) => (
              <TableRow key={order._id}>
                <TableCell>{indexOfFirstPost + index + 1}</TableCell>
                <TableCell className="text-xs">#{order._id.slice(0, 8)}...</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <HiOutlineMail className="text-lg" />
                    {order.email}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {order.transactionId === 'Cash on Delivery'
                    ? 'COD'
                    : order.transactionId?.slice(0, 12) + '...'}
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  ${(order.amount / 100).toFixed(2)}
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
    </div>
  );
}

export default DashboardTransactions;

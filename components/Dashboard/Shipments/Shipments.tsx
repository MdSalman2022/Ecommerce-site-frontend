'use client';

import React, { useState } from 'react';
import { BsCart4, BsQuestionCircle } from 'react-icons/bs';
import { TbFileInvoice } from 'react-icons/tb';
import { MdDoneAll } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { IoIosCall } from 'react-icons/io';
import { HiSortAscending } from 'react-icons/hi';
import { FaAngleDown } from 'react-icons/fa';
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

function DashboardShipments() {
  const { orders } = useUserActivity();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortType, setSortType] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const handleCheckboxClick = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleUpdateStatus = async (status: string) => {
    if (selectedIds.length === 0) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orderstatus`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, status }),
      });
      setSelectedIds([]);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl">
          <BsCart4 className="text-4xl p-2 w-12 h-12 rounded-lg bg-primary/10 text-primary" />
          <div>
            <p className="text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{ordersArray.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl">
          <TbFileInvoice className="text-4xl p-2 w-12 h-12 rounded-lg bg-primary/10 text-primary" />
          <div>
            <p className="text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold">{ordersArray.filter((o: any) => o.orderStatus === 'delivered').length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl">
          <MdDoneAll className="text-4xl p-2 w-12 h-12 rounded-lg bg-green-500/10 text-green-500" />
          <div>
            <p className="text-muted-foreground">Processing</p>
            <p className="text-2xl font-bold">{ordersArray.filter((o: any) => o.orderStatus === 'processing').length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl">
          <BiError className="text-4xl p-2 w-12 h-12 rounded-lg bg-primary/50/10 text-orange-500" />
          <div>
            <p className="text-muted-foreground">Cancelled</p>
            <p className="text-2xl font-bold">{ordersArray.filter((o: any) => o.orderStatus === 'cancelled').length}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-end items-center gap-3 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Options <FaAngleDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleUpdateStatus('delivered')}>Mark Delivered</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdateStatus('processing')}>Mark Processing</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdateStatus('shipped')}>Mark Shipped</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
        </select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <HiSortAscending className="text-xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortType('latest')}>Recently Added</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortType('old')}>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Shipments Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayItems.map((order: any, index: number) => (
              <TableRow key={order._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(order._id)}
                    onChange={() => handleCheckboxClick(order._id)}
                    className="w-4 h-4"
                  />
                </TableCell>
                <TableCell>{indexOfFirstPost + index + 1}</TableCell>
                <TableCell className="text-xs">#{order._id.slice(0, 8)}...</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <IoIosCall className="text-lg" />
                    {order.contact}
                  </span>
                </TableCell>
                <TableCell className="text-primary font-medium">
                  {order.address}, {order.city}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      order.orderStatus === 'cancelled'
                        ? 'bg-red-100 text-red-600'
                        : order.orderStatus === 'delivered'
                        ? 'bg-green-100 text-green-600'
                        : order.orderStatus === 'shipped'
                        ? 'bg-blue-100 text-blue-600'
                        : order.orderStatus === 'processing'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {order.orderStatus || 'Pending'}
                  </span>
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

export default DashboardShipments;

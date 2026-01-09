'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsDot } from 'react-icons/bs';
import { FaAngleDown, FaPlus } from 'react-icons/fa';
import { FiEdit, FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Fuse from 'fuse.js';
import { useShop } from '@/contexts/ShopProvider';
import { useSearch } from '@/contexts/SearchProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, ImageIcon } from 'lucide-react';
import { CloudinaryUploader } from '@/components/Upload';

const CATEGORIES = [
  { value: 'components', label: 'Components' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'monitor', label: 'Monitor' },
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'camera', label: 'Camera' },
  { value: 'console', label: 'Console' },
  { value: 'tv', label: 'TV' },
  { value: 'accessories', label: 'Accessories' },
];

function DashboardProducts() {
  const { products } = useShop();
  const { dashboardSearch, setResults, results } = useSearch();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [sortType, setSortType] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fuse search
  useEffect(() => {
    if (!dashboardSearch || dashboardSearch === '') {
      setResults([]);
    } else {
      const fuse = new Fuse(products, {
        keys: ['name', 'brand'],
        threshold: 0.3,
        includeScore: true,
      });
      const searchResults = fuse.search(dashboardSearch);
      setResults(searchResults.map((result: any) => result.item));
    }
  }, [dashboardSearch, products, setResults]);

  // Use filtered results or all products
  const displayProducts = results.length > 0 ? results : products;

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const productsPerPage = displayProducts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(displayProducts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Sorting
  const sortedItems = () => {
    const items = [...productsPerPage];
    switch (sortType) {
      case 'high-to-low':
        return items.sort((a: any, b: any) => b.price - a.price);
      case 'low-to-high':
        return items.sort((a: any, b: any) => a.price - b.price);
      case 'latest':
        return items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'old':
        return items.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      default:
        return items;
    }
  };

  const displayItems = sortType === '' ? productsPerPage : sortedItems();

  // Checkbox handling
  const handleCheckboxClick = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete handler
  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      setSelectedIds([]);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="flex flex-col gap-5 relative">
      {/* Header */}


      {/* Products Overview */}
      <>
          {/* Controls */}
          <div className="flex justify-end items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Options <FaAngleDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete Selected ({selectedIds.length})
                </DropdownMenuItem>
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
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={60}>60</option>
              <option value={80}>80</option>
            </select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortType('low-to-high')}>
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortType('high-to-low')}>
                  High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortType('latest')}>
                  Latest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortType('old')}>
                  Oldest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayItems.map((item: any, index: number) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleCheckboxClick(item._id)}
                        className="w-4 h-4"
                      />
                    </TableCell>
                    <TableCell>{indexOfFirstPost + index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/productDetails/${item._id}/${encodeURIComponent(item.name).replace(/%20/g, '-')}`}
                          className="hover:text-primary font-medium"
                        >
                          {item.name.length > 40 ? `${item.name.slice(0, 40)}...` : item.name}
                        </Link>
                        <Link href={`/dashboard/products/edit/${item._id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <FiEdit />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {item._id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <span
                        className={`flex items-center gap-1 ${
                          item.stock ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        <BsDot className="text-2xl" />
                        {item.stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pageNumbers.length > 1 && (
            <div className="flex justify-center gap-2">
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
      </>

      {/* Fixed Add Product FAB */}
      <Link
        href="/dashboard/products/add"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        title="Add Product"
      >
        <FaPlus className="text-xl group-hover:scale-110 transition-transform" />
      </Link>

    </div>
  );
}

export default DashboardProducts;

'use client';

import React, { useState } from 'react';
import { useShop } from '@/contexts/ShopProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'react-hot-toast';
import { Search, Save, AlertTriangle } from 'lucide-react';

export default function InventoryManagement() {
  const { products } = useShop();
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ stock: number; sku: string }>({ stock: 0, sku: '' });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const startEdit = (product: any) => {
    setEditingId(product._id);
    setEditValues({ stock: product.stock || 0, sku: product.sku || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editValues),
      });
      
      if (res.ok) {
        toast.success('Inventory updated');
        setEditingId(null);
        window.location.reload(); // Refresh to update context
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error saving');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="relative w-64">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
           <Input 
             placeholder="Search product or SKU..." 
             className="pl-8"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product: any) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="w-10 h-10 rounded-md object-cover border" />
                    <span className="truncate max-w-[200px]" title={product.name}>{product.name}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  {editingId === product._id ? (
                    <Input 
                      value={editValues.sku} 
                      onChange={(e) => setEditValues({ ...editValues, sku: e.target.value })} 
                      className="h-8 w-32"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">{product.sku || '-'}</span>
                  )}
                </TableCell>
                
                <TableCell>
                   {editingId === product._id ? (
                    <Input 
                      type="number"
                      value={editValues.stock} 
                      onChange={(e) => setEditValues({ ...editValues, stock: parseInt(e.target.value) || 0 })} 
                      className="h-8 w-24"
                    />
                  ) : (
                    <span className="font-bold">{product.stock || 0}</span>
                  )}
                </TableCell>
                
                <TableCell>
                  {(product.stock || 0) <= 5 ? (
                    <span className="flex items-center text-amber-600 text-xs font-medium bg-amber-50 px-2 py-1 rounded-full w-fit">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Low Stock
                    </span>
                  ) : (
                    <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                  )}
                </TableCell>
                
                <TableCell className="text-right">
                  {editingId === product._id ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>Cancel</Button>
                      <Button size="sm" onClick={() => saveEdit(product._id)} className="bg-primary">Save</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => startEdit(product)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

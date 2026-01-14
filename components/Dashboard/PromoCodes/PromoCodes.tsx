'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, ToggleLeft, ToggleRight, Calendar, Percent, DollarSign, Users, Copy, Check, ChevronDown, Search, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResponsiveModal } from '@/components/ui/responsive-modal';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PromoCode {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

interface PromoUsage {
  _id: string;
  orderId: {
    _id: string;
    orderId: string;
    amount: number;
    createdAt: string;
  };
  discountAmount: number;
  email: string;
  ipAddress: string;
  createdAt: string;
}

export default function PromoCodes() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Usage History State
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);
  const [usageHistory, setUsageHistory] = useState<PromoUsage[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 0,
    maxDiscount: '',
    usageLimit: '',
    minItemQuantity: '',
    perUserLimit: '',
    validUntil: '',
    applicableCategories: [] as string[],
    applicableProducts: [] as string[],
    targetingType: 'all', // 'all', 'categories', 'products', 'both'
  });

  const [productSearch, setProductSearch] = useState('');
  const [isSearchingProducts, setIsSearchingProducts] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Fetch categories for selection
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
      const data = await res.json();
      return data.data || [];
    },
  });

  // Initial fetch for products (top 50)
  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products-for-promo'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?limit=50`);
      const data = await res.json();
      const products = data.products || data.data || [];
      setSearchResults(products);
      return products;
    },
  });

  const handleProductSearch = async () => {
    if (!productSearch.trim()) {
      setSearchResults(productsData || []);
      return;
    }

    setIsSearchingProducts(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?search=${encodeURIComponent(productSearch)}&limit=50`);
      const data = await res.json();
      const products = data.products || data.data || [];
      setSearchResults(products);
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Search failed');
    } finally {
      setIsSearchingProducts(false);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo`);
      const data = await res.json();
      if (data.success) {
        setPromoCodes(data.promoCodes);
      }
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      toast.error('Failed to load promo codes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
          usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
          minItemQuantity: formData.minItemQuantity ? Number(formData.minItemQuantity) : null,
          perUserLimit: formData.perUserLimit ? Number(formData.perUserLimit) : null,
          applicableCategories: formData.targetingType === 'categories' ? formData.applicableCategories : [],
          applicableProducts: formData.targetingType === 'products' ? formData.applicableProducts : [],
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Promo code created!');
        setIsDialogOpen(false);
        setFormData({
          code: '',
          description: '',
          discountType: 'percentage',
          discountValue: 10,
          minOrderAmount: 0,
          maxDiscount: '',
          usageLimit: '',
          minItemQuantity: '',
          perUserLimit: '',
          validUntil: '',
          applicableCategories: [],
          applicableProducts: [],
          targetingType: 'all',
        });
        setProductSearch('');
        fetchPromoCodes();
      } else {
        toast.error(data.error || 'Failed to create promo code');
      }
    } catch (error) {
      toast.error('Failed to create promo code');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/${id}/toggle`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        setPromoCodes(promoCodes.map(p => 
          p._id === id ? { ...p, isActive: data.isActive } : p
        ));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error('Failed to toggle promo code');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setPromoCodes(promoCodes.filter(p => p._id !== id));
        toast.success('Promo code deleted');
      }
    } catch (error) {
      toast.error('Failed to delete promo code');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Code copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleViewUsage = async (promo: PromoCode) => {
    setSelectedPromo(promo);
    setIsHistoryOpen(true);
    setIsHistoryLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/${promo._id}/usage`);
      const data = await res.json();
      if (data.success) {
        setUsageHistory(data.usage);
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
      toast.error('Failed to load usage history');
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tag className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900">Promo Codes</h1>
          <span className="text-sm text-gray-500">({promoCodes.length})</span>
        </div>
        
        <ResponsiveModal
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setFormData({
                code: '',
                description: '',
                discountType: 'percentage',
                discountValue: 10,
                minOrderAmount: 0,
                maxDiscount: '',
                usageLimit: '',
                minItemQuantity: '',
                perUserLimit: '',
                validUntil: '',
                applicableCategories: [],
                applicableProducts: [],
                targetingType: 'all',
              });
              setProductSearch('');
            }
          }}
          title="Create Promo Code"
          trigger={
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Code
            </Button>
          }
          footer={
            <Button type="submit" form="promo-form" className="w-full bg-primary hover:bg-primary/90">
              Create Promo Code
            </Button>
          }
        >
            <form id="promo-form" onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="SUMMER20"
                    className="uppercase mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="discountType">Type</Label>
                  <select
                    id="discountType"
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summer sale discount"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountValue">Discount Value *</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    min={0}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="minOrderAmount">Min Order ($)</Label>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                    min={0}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxDiscount">Max Discount ($)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="No limit"
                    min={0}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    placeholder="Unlimited"
                    min={0}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minItemQuantity">Min Items Required</Label>
                  <Input
                    id="minItemQuantity"
                    type="number"
                    value={formData.minItemQuantity}
                    onChange={(e) => setFormData({ ...formData, minItemQuantity: e.target.value })}
                    placeholder="No minimum"
                    min={0}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">e.g., "Buy 3+ items"</p>
                </div>
                <div>
                  <Label htmlFor="perUserLimit">Max Uses Per User</Label>
                  <Input
                    id="perUserLimit"
                    type="number"
                    value={formData.perUserLimit}
                    onChange={(e) => setFormData({ ...formData, perUserLimit: e.target.value })}
                    placeholder="Unlimited"
                    min={1}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Prevent code abuse</p>
                </div>
              </div>

              {/* Targeting Selector */}
              <div className="space-y-3 pt-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Targeting Mode
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: 'All Products' },
                    { id: 'categories', label: 'Categories' },
                    { id: 'products', label: 'Specific Products' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetingType: mode.id as any })}
                      className={cn(
                        "px-3 py-2 text-[11px] font-bold rounded-xl border transition-all duration-200",
                        formData.targetingType === mode.id
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Category List */}
              {formData.targetingType === 'categories' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold">Select Categories</Label>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {formData.applicableCategories.length} selected
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 bg-gray-50/50">
                    <TooltipProvider>
                      {categoriesData && categoriesData.length > 0 ? (
                        categoriesData.map((category: any) => (
                          <div key={category._id} className="space-y-1">
                            {!category.parent && (
                              <label className="flex items-center gap-2 cursor-pointer hover:bg-white/80 p-1.5 rounded-lg transition-colors group w-full">
                                <input
                                  type="checkbox"
                                  checked={formData.applicableCategories.includes(category._id)}
                                  onChange={(e) => {
                                    const newCategories = e.target.checked
                                      ? [...formData.applicableCategories, category._id]
                                      : formData.applicableCategories.filter(id => id !== category._id);
                                    setFormData({ ...formData, applicableCategories: newCategories });
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 shrink-0"
                                />
                                <div className="flex-1 w-0">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors truncate">
                                        {category.name}
                                      </p>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-[280px] break-words py-2 px-3">
                                      {category.name}
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </label>
                            )}
                            {!category.parent && categoriesData
                              .filter((sub: any) => sub.parent === category._id)
                              .map((subcat: any) => (
                                <label key={subcat._id} className="flex items-center gap-2 cursor-pointer hover:bg-white/80 p-1.5 rounded-lg ml-6 transition-colors group w-auto">
                                  <input
                                    type="checkbox"
                                    checked={formData.applicableCategories.includes(subcat._id)}
                                    onChange={(e) => {
                                      const newCategories = e.target.checked
                                        ? [...formData.applicableCategories, subcat._id]
                                        : formData.applicableCategories.filter(id => id !== subcat._id);
                                      setFormData({ ...formData, applicableCategories: newCategories });
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 shrink-0"
                                  />
                                  <div className="flex-1 w-0">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <p className="text-sm text-gray-600 group-hover:text-primary transition-colors truncate">
                                          {subcat.name}
                                        </p>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-[280px] break-words py-2 px-3">
                                        {subcat.name}
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </label>
                              ))}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 text-center py-4 italic">No categories available</p>
                      )}
                    </TooltipProvider>
                  </div>
                </div>
              )}

              {/* Conditional Product List */}
              {formData.targetingType === 'products' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold">Select Products</Label>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {formData.applicableProducts.length} selected
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <Input
                        placeholder="Search items by name..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleProductSearch())}
                        className="pl-9 h-9 text-xs border-gray-200 focus:border-primary transition-colors rounded-xl bg-gray-50/50"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleProductSearch}
                      disabled={isSearchingProducts}
                      className="h-9 px-3 rounded-xl border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-600 shrink-0"
                    >
                      {isSearchingProducts ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-2 max-h-48 overflow-y-auto space-y-1 bg-gray-50/50">
                    <TooltipProvider>
                      {searchResults.length > 0 ? (
                        searchResults.map((product: any) => (
                          <label key={product._id} className="flex items-center gap-2 cursor-pointer hover:bg-white/80 p-2 rounded-lg transition-colors group w-full">
                            <input
                              type="checkbox"
                              checked={formData.applicableProducts.includes(product._id)}
                              onChange={(e) => {
                                const newProducts = e.target.checked
                                  ? [...formData.applicableProducts, product._id]
                                  : formData.applicableProducts.filter(id => id !== product._id);
                                setFormData({ ...formData, applicableProducts: newProducts });
                              }}
                              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 shrink-0"
                            />
                            <div className="flex-1 w-0">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-sm text-gray-700 truncate group-hover:text-primary transition-colors">
                                    {product.name}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[280px] break-words py-2 px-3">
                                  {product.name}
                                </TooltipContent>
                              </Tooltip>
                              <p className="text-[10px] text-gray-400">
                                ৳{product.variants?.[0]?.salePrice || product.variants?.[0]?.regularPrice || product.price || 0}
                              </p>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                          {isSearchingProducts || isProductsLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mb-2" />
                              <p className="text-xs italic">Searching products...</p>
                            </>
                          ) : (
                            <p className="text-sm text-center py-6 italic transition-all duration-300">No matching products found</p>
                          )}
                        </div>
                      )}
                    </TooltipProvider>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="validUntil">Expires On *</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
            </form>
        </ResponsiveModal>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Codes</p>
          <p className="text-2xl font-bold text-gray-900">{promoCodes.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {promoCodes.filter(p => p.isActive && !isExpired(p.validUntil)).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Expired</p>
          <p className="text-2xl font-bold text-red-600">
            {promoCodes.filter(p => isExpired(p.validUntil)).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Uses</p>
          <p className="text-2xl font-bold text-blue-600">
            {promoCodes.reduce((sum, p) => sum + p.usedCount, 0)}
          </p>
        </div>
      </div>

      {/* Promo Codes List */}
      {promoCodes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No Promo Codes</h3>
          <p className="text-gray-500 mb-4">Create your first promo code to offer discounts</p>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create First Code
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Discount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Expires</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promoCodes.map((promo) => (
                  <tr key={promo._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900">{promo.code}</span>
                        <button
                          onClick={() => copyCode(promo.code)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copiedCode === promo.code ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {promo.description && (
                        <p className="text-xs text-gray-500 mt-1">{promo.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        {promo.discountType === 'percentage' ? (
                          <>
                            <Percent className="w-4 h-4" />
                            {promo.discountValue}%
                          </>
                        ) : (
                          <>
                            <DollarSign className="w-4 h-4" />
                            {promo.discountValue}
                          </>
                        )}
                      </span>
                      {promo.minOrderAmount > 0 && (
                        <p className="text-xs text-gray-500">Min: ${promo.minOrderAmount}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        {promo.usedCount}
                        {promo.usageLimit && <span className="text-gray-400">/ {promo.usageLimit}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className={isExpired(promo.validUntil) ? 'text-red-500' : ''}>
                          {formatDate(promo.validUntil)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {isExpired(promo.validUntil) ? (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                          Expired
                        </span>
                      ) : promo.isActive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggle(promo._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title={promo.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {promo.isActive ? (
                            <ToggleRight className="w-5 h-5 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(promo._id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleViewUsage(promo)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-500"
                          title="View Usage History"
                        >
                          <Users className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Usage History Modal */}
      <ResponsiveModal
        open={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
        title={`Usage History: ${selectedPromo?.code}`}
        className="max-w-4xl"
      >
        <div className="space-y-4">
          {isHistoryLoading ? (
            <div className="flex flex-col items-center py-12 space-y-4">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
               <p className="text-gray-500">Loading history...</p>
            </div>
          ) : usageHistory.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">This code hasn't been used yet.</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Order</th>
                      <th className="px-4 py-3 text-left font-semibold">Customer</th>
                      <th className="px-4 py-3 text-left font-semibold">Discount</th>
                      <th className="px-4 py-3 text-left font-semibold">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usageHistory.map((use) => (
                      <tr key={use._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          {formatDate(use.createdAt)}
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-gray-900">{use.orderId?.orderId || 'N/A'}</p>
                          <p className="text-xs text-gray-500">৳{use.orderId?.amount || 0}</p>
                        </td>
                        <td className="px-4 py-4">
                          {use.email || 'Guest'}
                        </td>
                        <td className="px-4 py-4 text-green-600 font-semibold">
                          -৳{use.discountAmount}
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                          {use.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </ResponsiveModal>
    </div>
  );
}

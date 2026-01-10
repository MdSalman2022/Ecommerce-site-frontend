'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Check, Loader2 } from 'lucide-react';

interface ProductConfig {
    title: string;
    sourceType: 'featured' | 'bestseller' | 'latest' | 'special' | 'category' | 'subcategory' | 'manual';
    categoryId?: string;
    subCategoryId?: string;
    productIds?: string[];
    limit: number;
    viewAllLink: string;
}

interface ProductEditorProps {
    config: ProductConfig;
    onChange: (config: ProductConfig) => void;
}

export default function ProductEditor({ config, onChange }: ProductEditorProps) {
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch categories
    const { data: categoriesResult } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
            const result = await res.json();
            return result;
        }
    });
    const categories = categoriesResult?.data || [];

    // Fetch preview products based on sourceType
    const { data: previewProducts, isLoading: isPreviewLoading } = useQuery({
        queryKey: ['products-preview', config.sourceType, config.categoryId, config.productIds, config.limit],
        queryFn: async () => {
            let url = '';
            const limitNum = 4; // Preview limit
            
            if (config.sourceType === 'featured') url = `/api/products/featured?limit=${limitNum}`;
            else if (config.sourceType === 'bestseller') url = `/api/products/bestseller?limit=${limitNum}`;
            else if (config.sourceType === 'latest') url = `/api/products/latest?limit=${limitNum}`;
            else if (config.sourceType === 'special') url = `/api/products/special?limit=${limitNum}`;
            else if (config.sourceType === 'category' && config.categoryId) {
                url = `/api/products?category=${config.categoryId}&limit=${limitNum}`;
            }
            else if (config.sourceType === 'manual' && config.productIds?.length) {
                url = `/api/products?limit=50`; // Fetch many to filter locally for preview
            }

            if (!url) return [];
            
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`);
                const result = await res.json();
                
                if (config.sourceType === 'manual') {
                    return (result.data || []).filter((p: any) => config.productIds?.includes(p._id)).slice(0, 4);
                }
                
                return Array.isArray(result) ? result : (result.data || []);
            } catch (err) {
                console.error('Preview fetch error:', err);
                return [];
            }
        },
        enabled: !!config.sourceType && (config.sourceType !== 'category' || !!config.categoryId) && (config.sourceType !== 'manual' || (config.productIds && config.productIds.length > 0))
    });

    // Fetch products for manual selection
    const { data: searchResults, isLoading: isSearching } = useQuery({
        queryKey: ['products-search', searchQuery],
        queryFn: async () => {
            if (!searchQuery) return [];
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?search=${searchQuery}&limit=10`);
            const result = await res.json();
            return Array.isArray(result.data) ? result.data : [];
        },
        enabled: config.sourceType === 'manual' && searchQuery.length > 2
    });

    const handleToggleProduct = (productId: string) => {
        const currentIds = config.productIds || [];
        const updated = currentIds.includes(productId)
            ? currentIds.filter(id => id !== productId)
            : [...currentIds, productId];
        onChange({ ...config, productIds: updated });
    };

    const handleSourceChange = (val: ProductConfig['sourceType']) => {
        let viewAllLink = config.viewAllLink;
        if (val === 'featured') viewAllLink = '/products?filter=featured';
        else if (val === 'bestseller') viewAllLink = '/products?filter=bestseller';
        else if (val === 'latest') viewAllLink = '/products?filter=latest';
        else if (val === 'special') viewAllLink = '/products?filter=special';
        
        onChange({ ...config, sourceType: val, viewAllLink });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Section Title</Label>
                    <Input 
                        value={config.title} 
                        onChange={(e) => onChange({ ...config, title: e.target.value })}
                        placeholder="e.g. Best Sellers"
                        className="bg-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Source Type</Label>
                    <Select 
                        value={config.sourceType} 
                        onValueChange={handleSourceChange}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured Products</SelectItem>
                            <SelectItem value="bestseller">Bestseller Products</SelectItem>
                            <SelectItem value="latest">Latest Products</SelectItem>
                            <SelectItem value="special">Special Deals</SelectItem>
                            <SelectItem value="category">Specific Category</SelectItem>
                            <SelectItem value="manual">Manual Selection</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {config.sourceType === 'category' && (
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Target Category</Label>
                    <Select 
                        value={config.categoryId} 
                        onValueChange={(val) => {
                            const selectedCat = categories.find((c: any) => c._id === val);
                            const viewAllLink = selectedCat ? `/category/${selectedCat.slug}` : config.viewAllLink;
                            onChange({ ...config, categoryId: val, viewAllLink });
                        }}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat: any) => (
                                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Product Preview Section */}
            <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                    Live Preview 
                    {isPreviewLoading && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 border rounded-xl bg-accent/5">
                    {previewProducts && previewProducts.length > 0 ? (
                        previewProducts.map((product: any) => (
                            <div key={product._id} className="space-y-1">
                                <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden border">
                                    <img 
                                        src={product.images?.[0] || 'https://placehold.co/100x100?text=No+Image'} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-[10px] font-medium truncate">{product.name}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 py-6 text-center">
                            <p className="text-[10px] text-muted-foreground italic">
                                {isPreviewLoading ? 'Loading preview...' : (config.sourceType === 'category' && !config.categoryId) ? 'Please select a category to see preview.' : 'No products found for this selection.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {config.sourceType === 'manual' && (
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Select Products</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search products to add..." 
                            className="pl-10 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />}
                    </div>

                    {searchQuery.length > 2 && searchResults && (
                        <div className="border rounded-xl p-2 bg-white max-h-48 overflow-y-auto space-y-1 shadow-sm">
                            {searchResults.map((product: any) => (
                                <div 
                                    key={product._id}
                                    onClick={() => handleToggleProduct(product._id)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all text-xs ${config.productIds?.includes(product._id) ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-accent border border-transparent'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden border">
                                            {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <span>{product.name}</span>
                                    </div>
                                    {config.productIds?.includes(product._id) && <Check className="w-3 h-3" />}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 p-3 bg-accent/5 rounded-xl border border-dashed min-h-[50px]">
                        {(!config.productIds || config.productIds.length === 0) && (
                            <p className="text-[10px] text-muted-foreground italic">No products selected yet...</p>
                        )}
                        {config.productIds?.map(pid => (
                            <Badge key={pid} variant="secondary" className="gap-1 py-1 px-2 text-[10px]">
                                Selected: {pid.slice(-6)}
                                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleToggleProduct(pid)} />
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">Product Limit</Label>
                    <Input 
                        type="number" 
                        value={config.limit} 
                        onChange={(e) => onChange({ ...config, limit: parseInt(e.target.value) || 1 })}
                        className="bg-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">"View All" Link</Label>
                    <Input 
                        value={config.viewAllLink} 
                        onChange={(e) => onChange({ ...config, viewAllLink: e.target.value })}
                        placeholder="/products?..."
                        className="bg-white"
                    />
                </div>
            </div>
        </div>
    );
}

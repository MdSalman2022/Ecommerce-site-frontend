'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { Sparkles, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SearchPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const searchName = params?.name as string;
  const decodedQuery = decodeURIComponent(searchName || '');
  const modeParam = searchParams?.get('mode');

  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiPowered, setIsAiPowered] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<any>(null);
  const [searchMode, setSearchMode] = useState<'ai' | 'keyword'>(modeParam === 'keyword' ? 'keyword' : 'ai');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!decodedQuery) return;
      
      setIsLoading(true);
      try {
        let url = '';
        if (searchMode === 'ai') {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/search?q=${encodeURIComponent(decodedQuery)}`;
        } else {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?search=${encodeURIComponent(decodedQuery)}&limit=20`;
        }

        const res = await fetch(url);
        const data = await res.json();
        
        if (searchMode === 'ai' && data.success) {
          setDisplayProducts(data.products || []);
          setIsAiPowered(data.aiPowered || false);
          setSearchCriteria(data.searchCriteria || null);
        } else if (searchMode === 'keyword') {
          // Normal search returns { data: [...], pagination: {...} } or [...]
          const products = data.data || (Array.isArray(data) ? data : []);
          setDisplayProducts(products);
          setIsAiPowered(false);
          setSearchCriteria(null);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [decodedQuery, searchMode]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const productsPerPage = displayProducts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(displayProducts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto my-10 space-y-8 px-4 min-h-screen">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl lg:text-4xl font-bold text-foreground">
              {decodedQuery ? `Results for "${decodedQuery}"` : 'All Products'}
            </h1>
            {isAiPowered && (
              <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <Sparkles className="w-3 h-3 fill-current" />
                AI
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {isLoading ? (
                <span className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 opacity-50" />
                  <span className="font-semibold text-foreground">{displayProducts.length}</span> products discovered
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {productsPerPage.map((item: any, index: number) => (
            <ProductCard product={item} key={item._id || index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No results found</h3>
            <p className="text-gray-500">
              We couldn&apos;t find anything matching &quot;{decodedQuery}&quot;. Try adjusting your search or check for typos.
            </p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pageNumbers.length > 1 && (
        <div className="flex justify-center gap-2 pt-10">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => paginate(number)}
              variant={currentPage === number ? 'default' : 'outline'}
              size="sm"
              className={currentPage === number ? 'bg-primary hover:bg-primary/90' : ''}
            >
              {number}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

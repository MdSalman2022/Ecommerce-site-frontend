'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HiEmojiSad } from 'react-icons/hi';
import { FaChevronUp, FaStar } from 'react-icons/fa';
import { useShop } from '@/contexts/ShopProvider';
import { allcategories } from '@/data/NavbarItems';
import { ProductCard } from '@/components/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ProductFilters } from './ProductFilters';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

function ProductPage() {
  let { products } = useShop();
  const { ecommerce } = useSiteSettings();
  const params = useParams();
  
  // Local Filter State
  const [filters, setFilters] = useState({
    priceRange: [0, 0] as [number, number],
    selectedBrands: [] as string[],
    selectedRatings: [] as number[],
  });
  
  const category = params?.category as string | undefined;
  const subcategory = params?.subcategory as string | undefined;
  const brand = params?.brand as string | undefined;

  // Filter products based on route params
  let filteredProducts = [...products];
  
  if (category && subcategory && brand) {
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.cat?.toLowerCase() === category.toLowerCase() &&
        (product.brand?.toLowerCase() === brand.toLowerCase() || product.type?.toLowerCase() === brand.toLowerCase()) &&
        product.subcat?.toLowerCase() === subcategory.toLowerCase()
    );
  } else if (category && subcategory && !brand) {
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        (product.cat?.toLowerCase() === category.toLowerCase() && product.subcat?.toLowerCase() === subcategory.toLowerCase()) ||
        (product.cat?.toLowerCase() === category.toLowerCase() && product.brand?.toLowerCase() === subcategory.toLowerCase())
    );
  } else if (category === 'products' && !subcategory && !brand) {
    // Show all products
  } else if (category && !subcategory && !brand) {
    filteredProducts = filteredProducts.filter((product: any) => product.cat?.toLowerCase() === category.toLowerCase());
  }

  // Filter out of stock products if setting is enabled
  const showOutOfStock = ecommerce?.showOutOfStock ?? true;
  if (!showOutOfStock) {
    filteredProducts = filteredProducts.filter((product: any) => (product.stock || 0) > 0);
  }

  // Calculate Min and Max Price from the currently available products (before local filtering)
  const prices = filteredProducts.map((p: any) => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  // Initialize Price Range once when maxPrice is available and range is [0,0]
  React.useEffect(() => {
    if (maxPrice > 0 && filters.priceRange[1] === 0) {
        setFilters(prev => ({ ...prev, priceRange: [minPrice, maxPrice] }));
    }
  }, [minPrice, maxPrice, filters.priceRange]);

  // Apply Local Sidecard Filters
  // 1. Brands
  if (filters.selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product: any) => 
      filters.selectedBrands.some(b => b.toLowerCase() === product.brand?.toLowerCase())
    );
  }
  // 2. Price
  filteredProducts = filteredProducts.filter((product: any) => 
    product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  );
  // 3. Ratings
  if (filters.selectedRatings.length > 0) {
    filteredProducts = filteredProducts.filter((product: any) => 
       filters.selectedRatings.some(r => (product.rating || 0) >= r)
    );
  }

  // Sheet State for Mobile
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const productsPerPage = filteredProducts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Sorting
  const [sortType, setSortType] = useState('');

  const handleSortTypeChange = (data: string) => {
    setSortType(data);
  };

  const handlePostsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const sortedItems = () => {
    const items = [...productsPerPage];
    switch (sortType) {
      case 'high-to-low':
        return items.sort((a: any, b: any) => b.price - a.price);
      case 'low-to-high':
        return items.sort((a: any, b: any) => a.price - b.price);
      default:
        return items;
    }
  };

  const displayProducts = sortType === '' ? productsPerPage : sortedItems();

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <div className="container mx-auto flex flex-col items-start py-8 px-4">
        {/* Modern Breadcrumb */}
        <div className="w-full mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {category && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {subcategory || brand ? (
                        <BreadcrumbLink href={`/category/${category}`} className="capitalize">
                          {category}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="capitalize">{category}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </>
                )}
                {subcategory && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="capitalize font-semibold text-primary">
                        {subcategory}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
                {brand && !subcategory && (
                   <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="capitalize font-semibold text-primary">
                        {brand}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
        </div>

        {/* Hero Header */}
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-8 mb-10 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/70 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-black capitalize text-gray-900 tracking-tight mb-3">
             {subcategory || brand || category || 'All Products'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our premium collection of {subcategory || brand || category || 'products'}. 
            Best deals and top quality guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 w-full">
          {/* Sidebar Filters */}
          <div className="hidden lg:block col-span-1">
            <div className="p-6 bg-card rounded-xl border border-border shadow-sm"> 
                <ProductFilters 
                    filters={filters} 
                    setFilters={setFilters} 
                    minPrice={minPrice} 
                    maxPrice={maxPrice} 
                /> 
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-4">
            {/* Sort Controls */}
            {productsPerPage.length > 0 && (
              <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4 mb-6">
                
                {/* Mobile Filter Trigger */}
                <div className="lg:hidden w-full sm:w-auto">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full gap-2">
                                <Filter size={16} /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="overflow-y-auto">
                            <ProductFilters 
                                filters={filters} 
                                setFilters={setFilters}
                                minPrice={minPrice} 
                                maxPrice={maxPrice} 
                                closeMobileSheet={() => setIsSheetOpen(false)}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <select
                    onChange={handlePostsPerPage}
                    value={postsPerPage}
                    className="border border-border rounded-md px-3 py-2 bg-background text-foreground h-10"
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
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSortTypeChange('low-to-high')}>
                        Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSortTypeChange('high-to-low')}>
                        High to Low
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSortTypeChange('')}>
                        Default
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </div>
            )}

            {/* Products */}
            {displayProducts.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {displayProducts.map((item: any, index: number) => (
                  <ProductCard key={index} product={item} />
                ))}
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center gap-5">
                <p className="rounded-full bg-destructive/10 p-10 text-7xl text-destructive">
                  <HiEmojiSad />
                </p>
                <h1 className="text-3xl font-bold text-foreground">Sorry! No Products Found</h1>
                <p className="text-xl text-muted-foreground">
                  Please try searching for something else
                </p>
                <Link href="/">
                  <Button variant="outline">Back to Homepage</Button>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {pageNumbers.length > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {pageNumbers.map((number, index) => (
                  <Button
                    key={index}
                    onClick={() => paginate(number)}
                    variant={currentPage === number ? 'default' : 'outline'}
                    size="sm"
                  >
                    {number}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

"use client";

import React, {useState, useEffect, useMemo} from "react";
import Link from "next/link";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {BsDot} from "react-icons/bs";
import {FaAngleDown, FaPlus, FaFilter} from "react-icons/fa";
import {FiEdit, FiX} from "react-icons/fi";
import {useQuery} from "@tanstack/react-query";
import {useCategories} from "@/hooks/useCategories";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {toast} from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function DashboardProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {flatCategories: categories = []} = useCategories();

  // State from URL parameters
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [limit, setLimit] = useState(
    parseInt(searchParams.get("limit") || "20")
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [stockStatus, setStockStatus] = useState(
    searchParams.get("stockStatus") || ""
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset to page 1 when searching
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (limit !== 20) params.set("limit", limit.toString());
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder !== "desc") params.set("sortOrder", sortOrder);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (stockStatus) params.set("stockStatus", stockStatus);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (search) params.set("search", search);

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, {scroll: false});
  }, [
    page,
    limit,
    sortBy,
    sortOrder,
    selectedCategory,
    selectedBrand,
    stockStatus,
    minPrice,
    maxPrice,
    search,
    pathname,
    router,
  ]);

  // Fetch paginated products
  const {data, isLoading, refetch} = useQuery({
    queryKey: [
      "admin-products",
      page,
      limit,
      sortBy,
      sortOrder,
      selectedCategory,
      selectedBrand,
      stockStatus,
      minPrice,
      maxPrice,
      search,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", limit.toString());
      if (sortBy) {
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
      }
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedBrand) params.set("brand", selectedBrand);
      if (stockStatus) params.set("stockStatus", stockStatus);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (search) params.set("search", search);

      const res = await fetch(`${API_URL}/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    },
  });

  const products = data?.data || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  };

  // Get unique brands from all products for filter dropdown
  const {data: allProductsForFilters} = useQuery({
    queryKey: ["all-products-brands"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    },
  });

  const availableBrands = useMemo(() => {
    if (!allProductsForFilters) return [];
    const brands = new Set(
      allProductsForFilters.map((p: any) => p.brand).filter(Boolean)
    );
    return Array.from(brands).sort();
  }, [allProductsForFilters]);

  // Helper to get display price
  const getPrice = (p: any) => {
    const v = p.variants?.[0];
    if (!v) return 0;
    return v.salePrice > 0 ? v.salePrice : v.regularPrice;
  };

  // Helper to get total stock
  const getTotalStock = (p: any) => {
    if (!p.variants) return 0;
    return p.variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0);
  };

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
      await fetch(`${API_URL}/api/products`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ids: selectedIds}),
      });
      setSelectedIds([]);
      toast.success("Products deleted");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete products");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setPage(1);
    setLimit(20);
    setSortBy("");
    setSortOrder("desc");
    setSelectedCategory("");
    setSelectedBrand("");
    setStockStatus("");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSearchInput("");
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedBrand ||
    stockStatus ||
    minPrice ||
    maxPrice ||
    search;

  return (
    <div className="flex flex-col gap-5 relative">
      {/* Search and Filter Toggle */}
      <div className="flex gap-2 md:gap-3 items-center justify-between">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 md:max-w-md"
        />
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="whitespace-nowrap"
          size="sm"
        >
          <FaFilter className="md:mr-2" />
          <span className="hidden md:inline">Filters</span>{" "}
          {hasActiveFilters &&
            `(${
              [
                selectedCategory,
                selectedBrand,
                stockStatus,
                minPrice || maxPrice,
                search,
              ].filter(Boolean).length
            })`}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full border border-border rounded-md px-3 py-2 bg-background"
              >
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setPage(1);
                }}
                className="w-full border border-border rounded-md px-3 py-2 bg-background"
              >
                <option value="">All Brands</option>
                {availableBrands.map((brand: string) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Status Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Stock Status
              </label>
              <select
                value={stockStatus}
                onChange={(e) => {
                  setStockStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full border border-border rounded-md px-3 py-2 bg-background"
              >
                <option value="">All Stock Levels</option>
                <option value="in-stock">In Stock (&gt;10)</option>
                <option value="low-stock">Low Stock (1-10)</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setPage(1);
                  }}
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setPage(1);
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={clearFilters} size="sm">
                <FiX className="mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-between items-center gap-2 md:gap-3">
        <div className="text-xs md:text-sm text-muted-foreground">
          Showing {products.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
          {Math.min(page * limit, pagination.total)} of {pagination.total}{" "}
          <span className="hidden sm:inline">products</span>
        </div>

        <div className="flex gap-2 md:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={selectedIds.length === 0} size="sm">
                <span className="hidden md:inline">Options</span>
                <span className="md:hidden">Ops</span>
                <FaAngleDown className="ml-1 md:ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDelete}>
                Delete Selected ({selectedIds.length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-border rounded-md px-2 md:px-3 py-1.5 md:py-2 bg-background text-sm"
          >
            <option value={20}>20 per page</option>
            <option value={40}>40 per page</option>
            <option value={60}>60 per page</option>
            <option value={80}>80 per page</option>
          </select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <span className="hidden md:inline">Sort {sortBy && `(${sortBy})`}</span>
                <span className="md:hidden">{sortBy ? sortBy.slice(0, 1).toUpperCase() : "S"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("price");
                  setSortOrder("asc");
                  setPage(1);
                }}
              >
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("price");
                  setSortOrder("desc");
                  setPage(1);
                }}
              >
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("date");
                  setSortOrder("desc");
                  setPage(1);
                }}
              >
                Date: Latest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("date");
                  setSortOrder("asc");
                  setPage(1);
                }}
              >
                Date: Oldest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("stock");
                  setSortOrder("desc");
                  setPage(1);
                }}
              >
                Stock: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("asc");
                  setPage(1);
                }}
              >
                Name: A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No products found. Try adjusting your filters.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item: any, index: number) => {
                const price = getPrice(item);
                const stock = getTotalStock(item);
                const categoryName = item.category?.name || "N/A";

                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleCheckboxClick(item._id)}
                        className="w-4 h-4"
                      />
                    </TableCell>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/product/${item.slug || item._id}`}
                          className="hover:text-primary font-medium"
                        >
                          {item.name.length > 40
                            ? `${item.name.slice(0, 40)}...`
                            : item.name}
                        </Link>
                        <Link href={`/dashboard/products/edit/${item._id}`}>
                          <Button variant="ghost" size="icon">
                            <FiEdit />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.brand || "N/A"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {categoryName}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">
                      {item.slug
                        ? item.slug.length > 30
                          ? `${item.slug.slice(0, 30)}...`
                          : item.slug
                        : "No slug"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`flex items-center gap-1 ${
                          stock > 10
                            ? "text-green-600"
                            : stock > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        <BsDot className="text-2xl" />
                        {stock > 0 ? `${stock} in stock` : "Out of Stock"}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          {Array.from({length: Math.min(5, pagination.pages)}, (_, i) => {
            let pageNum;
            if (pagination.pages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= pagination.pages - 2) {
              pageNum = pagination.pages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(pagination.pages, page + 1))}
            disabled={page === pagination.pages}
          >
            Next
          </Button>
        </div>
      )}

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

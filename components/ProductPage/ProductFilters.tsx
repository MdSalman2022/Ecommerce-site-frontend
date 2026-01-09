"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { allcategories } from "@/data/NavbarItems";
import { FaStar } from "react-icons/fa";

interface FilterState {
  priceRange: [number, number];
  selectedBrands: string[];
  selectedRatings: number[];
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  className?: string;
  closeMobileSheet?: () => void;
  minPrice?: number;
  maxPrice?: number;
}

export function ProductFilters({
  filters,
  setFilters,
  className,
  closeMobileSheet,
  minPrice = 0,
  maxPrice = 100000
}: ProductFiltersProps) {
  const params = useParams();
  const currentCategory = (params?.category as string) || "";
  
  const brands = ["Samsung", "Intel", "AMD", "Gigabyte", "Asus", "Apple", "Xiaomi"];

  const handleBrandChange = (brand: string) => {
    setFilters((prev) => {
      const newBrands = prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter((b) => b !== brand)
        : [...prev.selectedBrands, brand];
      return { ...prev, selectedBrands: newBrands };
    });
  };

  const handleRatingChange = (rating: number) => {
     setFilters((prev) => {
      const newRatings = prev.selectedRatings.includes(rating)
        ? prev.selectedRatings.filter((r) => r !== rating)
        : [...prev.selectedRatings, rating];
      return { ...prev, selectedRatings: newRatings };
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [minPrice, maxPrice],
      selectedBrands: [],
      selectedRatings: [],
    });
    if (closeMobileSheet) closeMobileSheet();
  };

  return (
    <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive hover:text-destructive/90">
                Reset
            </Button>
        </div>
      
      <Accordion type="multiple" defaultValue={["category", "brands", "price", "ratings"]} className="w-full">
        {/* Categories */}
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {allcategories.map((item, index) => {
                const isActive = item.cat.toLowerCase() === currentCategory.toLowerCase();
                return (
                  <li key={index} className={`text-sm transition-colors ${isActive ? "font-bold text-primary" : "text-gray-600 hover:text-primary"}`}>
                    <Link href={`/category/${item.cat}`} onClick={closeMobileSheet} className="capitalize flex items-center gap-2">
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link href="/products" onClick={closeMobileSheet} className="text-sm font-semibold text-primary hover:underline">
                    See All Categories
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={filters.selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <Label 
                    htmlFor={`brand-${brand}`} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[minPrice, maxPrice]}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                max={maxPrice}
                min={minPrice}
                step={1}
                minStepsBetweenThumbs={1}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex items-center justify-between">
                <div className="border rounded px-2 py-1 text-sm w-20 text-center">
                    ${filters.priceRange[0]}
                </div>
                <span className="text-muted-foreground">-</span>
                <div className="border rounded px-2 py-1 text-sm w-20 text-center">
                    ${filters.priceRange[1]}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Ratings */}
        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                    <Checkbox 
                        id={`rating-${rating}`}
                        checked={filters.selectedRatings.includes(rating)}
                        onCheckedChange={() => handleRatingChange(rating)}
                    />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                        <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < rating ? "fill-current" : "text-gray-300"} size={14} />
                        ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">& Up</span>
                    </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

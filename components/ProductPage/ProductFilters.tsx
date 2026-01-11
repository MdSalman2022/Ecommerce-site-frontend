"use client";

import React from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {Slider} from "@/components/ui/slider";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {FaStar} from "react-icons/fa";
import {Category} from "@/hooks/useCategories";

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
  brands: string[];
  categories: Category[];
}

export function ProductFilters({
  filters,
  setFilters,
  className,
  closeMobileSheet,
  minPrice = 0,
  maxPrice = 100000,
  brands,
  categories,
}: ProductFiltersProps) {
  const params = useParams();
  const currentCategory = (params?.category as string) || "";
  const [visibleBrandsCount, setVisibleBrandsCount] = React.useState(5);

  // Reset visible brands when brands list changes (e.g. category change)
  React.useEffect(() => {
    setVisibleBrandsCount(5);
  }, [brands]);

  const handleBrandChange = (brand: string) => {
    setFilters((prev) => {
      const newBrands = prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter((b) => b !== brand)
        : [...prev.selectedBrands, brand];
      return {...prev, selectedBrands: newBrands};
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => {
      const newRatings = prev.selectedRatings.includes(rating)
        ? prev.selectedRatings.filter((r) => r !== rating)
        : [...prev.selectedRatings, rating];
      return {...prev, selectedRatings: newRatings};
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({...prev, priceRange: [value[0], value[1]]}));
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
        <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-primary hover:text-primary/90 p-0 h-auto font-medium"
        >
          Reset
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "brands", "price", "ratings"]}
        className="w-full border-none"
      >
        {/* Categories */}
        <AccordionItem value="category" className="border-b-gray-100">
          <AccordionTrigger className="hover:no-underline font-bold text-gray-900">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1.5 pt-1">
              {categories.map((item, index) => {
                const isActive =
                  item.slug.toLowerCase() === currentCategory.toLowerCase();
                // Check if any child is active (to keep parent expanded/highlighted if needed, or structured)
                const isChildActive = item.children?.some(
                  (c) =>
                    c.slug.toLowerCase() ===
                    (params?.subcategory as string)?.toLowerCase()
                );
                const showChildren = isActive || isChildActive;

                return (
                  <li key={index} className="flex flex-col">
                    <Link
                      href={`/category/${item.slug}`}
                      onClick={closeMobileSheet}
                      className={`text-sm capitalize px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2.5 group ${
                        isActive
                          ? "bg-primary/10 font-bold text-primary border border-primary/20"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary border border-transparent"
                      }`}
                    >
                      {/* Icon or dot indicator */}
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-primary shadow-sm shadow-primary/50"
                            : "bg-gray-300 group-hover:bg-primary/50"
                        }`}
                      />
                      <span className="flex-1">{item.name}</span>
                      {/* Show badge with count if has children */}
                      {item.children && item.children.length > 0 && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                          }`}
                        >
                          {item.children.length}
                        </span>
                      )}
                    </Link>

                    {/* Subcategories */}
                    {showChildren &&
                      item.children &&
                      item.children.length > 0 && (
                        <ul className="pl-5 mt-1.5 space-y-1 ml-2 border-l-2 border-primary/20">
                          {item.children.map((child) => {
                            const isSubActive =
                              child.slug.toLowerCase() ===
                              (params?.subcategory as string)?.toLowerCase();
                            return (
                              <li key={child._id}>
                                <Link
                                  href={`/category/${item.slug}/${child.slug}`}
                                  onClick={closeMobileSheet}
                                  className={`block text-xs capitalize px-3 py-2 rounded-md transition-all duration-150 ${
                                    isSubActive
                                      ? "text-primary font-bold bg-primary/5 border-l-2 border-primary pl-2.5"
                                      : "text-gray-600 hover:text-primary hover:bg-gray-50/50 hover:pl-2.5"
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                  </li>
                );
              })}
              <li className="pt-3 mt-3 border-t border-gray-100">
                <Link
                  href="/products"
                  onClick={closeMobileSheet}
                  className="flex items-center justify-center gap-2 text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider px-3 py-2 rounded-lg hover:bg-primary/5 transition-all"
                >
                  <span>View All Products</span>
                  <span className="text-lg">→</span>
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        {brands.length > 0 && (
          <AccordionItem value="brands" className="border-b-gray-100">
            <AccordionTrigger className="hover:no-underline font-bold text-gray-900">
              Brands
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                {brands.slice(0, visibleBrandsCount).map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center space-x-2.5 group cursor-pointer"
                  >
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                      className="border-gray-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-medium text-gray-600 group-hover:text-primary cursor-pointer transition-colors"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}

                {brands.length > 5 && visibleBrandsCount < brands.length && (
                  <button
                    onClick={() =>
                      setVisibleBrandsCount((prev) =>
                        Math.min(prev + 5, brands.length)
                      )
                    }
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-2 block"
                  >
                    + See More
                  </button>
                )}
                {visibleBrandsCount > 5 && (
                  <button
                    onClick={() => setVisibleBrandsCount(5)}
                    className="text-xs font-medium text-gray-400 hover:text-gray-600 mt-1 block"
                  >
                    Show Less
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Range */}
        <AccordionItem value="price" className="border-b-gray-100">
          <AccordionTrigger className="hover:no-underline font-bold text-gray-900">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-3 px-1">
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    Min
                  </span>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm font-bold text-gray-700">
                    ${filters.priceRange[0].toLocaleString()}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    Max
                  </span>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm font-bold text-gray-700">
                    ${filters.priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Ratings */}
        <AccordionItem value="ratings" className="border-none">
          <AccordionTrigger className="hover:no-underline font-bold text-gray-900">
            Customer Review
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className="flex items-center space-x-2.5 group cursor-pointer"
                >
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.selectedRatings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                    className="border-gray-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center gap-1.5 cursor-pointer group-hover:text-primary transition-colors"
                  >
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < rating ? "fill-current" : "text-gray-200"
                          }
                          size={12}
                        />
                      ))}
                    </div>
                    {rating < 5 && (
                      <span className="text-xs font-medium text-gray-400">
                        & Up
                      </span>
                    )}
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

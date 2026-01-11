"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import {useCategories} from "@/hooks/useCategories";

interface CustomImage {
  id: string;
  url: string;
  alt: string;
}

interface MarqueeConfig {
  displayType: "icons" | "images";
  speed: number;
  pauseOnHover: boolean;
  selectedBrands: string[]; // These are now Category Slugs
  customImages: CustomImage[];
}

export default function BrandMarquee({config}: {config?: MarqueeConfig}) {
  const {categories} = useCategories();

  const displayType = config?.displayType || "icons";
  const speed = config?.speed || 100;
  const pauseOnHover = config?.pauseOnHover ?? true;
  const selectedSlugs = config?.selectedBrands || [];

  // Flatten categories to find selected ones (including subcategories)
  const allCategories = React.useMemo(() => {
    const flat: any[] = [];
    categories.forEach((cat) => {
      flat.push(cat);
      if (cat.children) flat.push(...cat.children);
    });
    return flat;
  }, [categories]);

  // Filter selected categories
  const selectedCategories = allCategories.filter((cat) =>
    selectedSlugs.includes(cat.slug)
  );

  // Fallback if nothing selected (optional: show popular categories)
  const itemsToShow =
    selectedCategories.length > 0
      ? selectedCategories
      : allCategories.slice(0, 10);

  if (itemsToShow.length === 0) return null;

  return (
    <Marquee
      className="h-24 lg:h-32 bg-white border-y border-gray-100 py-4"
      speed={speed}
      pauseOnHover={pauseOnHover}
      gradient={false}
    >
      {itemsToShow.map((cat) => (
        <Link
          href={`/category/${cat.slug}`}
          key={cat._id}
          className="mx-8 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity"
        >
          {cat.image ? (
            <div className="relative w-12 h-12 lg:w-16 lg:h-16 transition-all duration-300">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs lg:text-sm border border-gray-200">
              {cat.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="text-xs font-medium text-gray-600 group-hover:text-primary transition-colors whitespace-nowrap">
            {cat.name}
          </span>
        </Link>
      ))}
    </Marquee>
  );
}

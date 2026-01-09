"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  mainImage: string;
  images: string[];
  name: string;
}

export function ProductGallery({ mainImage, images = [], name }: ProductGalleryProps) {
  // Combine all images into one list, filtering out duplicates and empty strings
  const allImages = Array.from(new Set([mainImage, ...images])).filter(img => !!img);
  const [activeImage, setActiveImage] = useState(mainImage);

  React.useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Container */}
      <div className="bg-white dark:bg-card rounded-2xl p-8 relative aspect-square flex items-center justify-center border border-gray-100/50 shadow-sm overflow-hidden group">
        <div className="relative w-full h-full">
          <Image
            src={activeImage}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide py-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white",
                activeImage === img 
                  ? "border-primary ring-2 ring-primary/20 shadow-md" 
                  : "border-gray-100 hover:border-gray-300"
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

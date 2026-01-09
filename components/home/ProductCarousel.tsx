'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product';
import { useSiteSettings } from '@/hooks/useSiteSettings';

import 'swiper/css';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductCarousel({ title, products, viewAllHref }: ProductCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const { ecommerce } = useSiteSettings();

  const showOutOfStock = ecommerce?.showOutOfStock ?? true;
  const filteredProducts = products.filter(p => showOutOfStock || p.stock > 0);

  if (!filteredProducts || filteredProducts.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            More Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Products Carousel */}
      <div className="relative group">
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef?.slidePrev()}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:border-primary transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Previous products"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => swiperRef?.slideNext()}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:border-primary transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Next products"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1 mt-6">
        {[0, 1, 2, 3, 4, 5].map((dot, index) => (
          <button
            key={index}
            onClick={() => swiperRef?.slideTo(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === 0 ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

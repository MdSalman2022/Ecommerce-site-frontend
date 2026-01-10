'use client';

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { CircuitBoard } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

export default function Categories() {
  const { flatCategories: categories, isLoading } = useCategories();

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Popular Categories
      </h2>
      
      {isLoading ? (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="w-16 h-3 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {categories.map((category) => {
            const IconComponent = (LucideIcons as any)[category.icon || 'Circle'] || CircuitBoard;
            
            return (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="flex flex-col items-center gap-2 group"
              > 
                <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-white group-hover:border-primary transition-colors">
                  <IconComponent 
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-600 group-hover:text-primary transition-colors" 
                    strokeWidth={1.2}
                  />
                </div>
                <span className="text-[10px] md:text-xs text-gray-600 text-center group-hover:text-primary transition-colors line-clamp-2 px-1">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useShop } from '@/contexts/ShopProvider';
import ProductCard from '@/components/product/ProductCard';

function BrandPage() {
  const { products } = useShop();
  const params = useParams();
  const brandName = params?.name as string;

  const brandProducts = products.filter(
    (product: any) => product.brand?.toLowerCase() === brandName?.toLowerCase()
  );

  return (
    <div className="container mx-auto min-h-screen py-10 px-4">
      {/* Header */}
      <div className="flex flex-col items-center py-10">
        <h1 className="text-center capitalize text-4xl md:text-5xl font-bold text-foreground">
          {brandName}
        </h1>
        <hr className="border-2 border-primary w-20 mt-4" />
      </div>

      {/* Products Grid */}
      {brandProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandProducts.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            {`No products found for "${brandName}"`}
          </h2>
        </div>
      )}
    </div>
  );
}

export default BrandPage;

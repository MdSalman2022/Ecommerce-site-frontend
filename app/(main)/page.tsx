import { Suspense } from 'react';
import { HeroBanner, Categories, ServiceBar } from '@/components/home';
import ProductSection from './ProductSection';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { AIRecommendations } from '@/components/AI';

export const revalidate = 60; // Revalidate every 60 seconds

export default function HomePage() {
  return (
    <> 
      <HeroBanner />
 
      <Categories />
 
      <div className="container mx-auto px-4">
        <AIRecommendations 
          title="Selected For You" 
          limit={4} 
        />
      </div>
 
      <Suspense fallback={<ProductSectionSkeleton />}>
        <ProductSection />
      </Suspense>
      <ServiceBar />
    </>
  );
}

function ProductSectionSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {[1, 2].map((i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <ProductGridSkeleton count={5} className="grid-cols-2 md:grid-cols-3 lg:grid-cols-5" />
        </div>
      ))}
    </div>
  );
}


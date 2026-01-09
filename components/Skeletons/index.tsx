'use client';

import { cn } from '@/lib/utils';

// Product Card Skeleton
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 overflow-hidden', className)}>
      <div className="animate-pulse">
        {/* Image */}
        <div className="w-full h-48 bg-gray-200" />
        
        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
          <div className="h-10 bg-gray-200 rounded w-full mt-4" />
        </div>
      </div>
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Category Card Skeleton
export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-32 bg-gray-200 rounded-xl" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 mx-auto" />
    </div>
  );
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="w-16 h-4 bg-gray-200 rounded" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Hero Banner Skeleton
export function HeroBannerSkeleton() {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-xl animate-pulse">
      <div className="h-full flex flex-col justify-center items-start p-8 md:p-16">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4" />
        <div className="h-12 bg-gray-300 rounded w-1/2 mb-4" />
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-8" />
        <div className="h-12 bg-gray-300 rounded w-32" />
      </div>
    </div>
  );
}

// Review Skeleton
export function ReviewSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );
}

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  CategoryCardSkeleton,
  DashboardStatsSkeleton,
  TableRowSkeleton,
  TableSkeleton,
  HeroBannerSkeleton,
  ReviewSkeleton,
};

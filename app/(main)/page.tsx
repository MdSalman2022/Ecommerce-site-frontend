import {Suspense} from "react";
import {HeroBanner, Categories, ServiceBar} from "@/components/home";
import ProductSection from "./ProductSection";
import {ProductGridSkeleton} from "@/components/Skeletons";
import {AIRecommendations} from "@/components/AI";
import {fetchPublishedPageConfig} from "@/lib/pageBuilderApi";
import SectionRenderer from "@/components/home/SectionRenderer";

// No caching - instant updates!
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const pageConfig = await fetchPublishedPageConfig("home");

  // If no config found (first time), render default layout
  if (!pageConfig || !pageConfig.sections || pageConfig.sections.length === 0) {
    return (
      <>
        <HeroBanner />
        <Categories />
        <div className="container mx-auto px-4">
          <AIRecommendations title="Selected For You" limit={10} />
        </div>
        <Suspense fallback={<ProductSectionSkeleton />}>
          <ProductSection />
        </Suspense>
        <ServiceBar />
      </>
    );
  }

  return (
    <>
      {pageConfig.sections
        .filter((s: any) => s.isVisible)
        .sort((a: any, b: any) => a.order - b.order)
        .map((section: any, index: number) => (
          <SectionRenderer
            key={section.id || `section-${index}`}
            section={section}
          />
        ))}
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
          <ProductGridSkeleton
            count={5}
            className="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          />
        </div>
      ))}
    </div>
  );
}

import { fetchBestsellerProducts, fetchFeaturedProducts } from '@/lib/api';
import { ProductCarousel } from '@/components/home';

export default async function ProductSection() {
  // Fetch data server-side
  const [bestsellers, featured] = await Promise.all([
    fetchBestsellerProducts().catch(() => []),
    fetchFeaturedProducts().catch(() => []),
  ]);

  return (
    <> 
      {bestsellers.length > 0 && (
        <ProductCarousel
          title="Best deal Alert! 🛒"
          products={bestsellers}
          viewAllHref="/products?filter=bestseller"
        />
      )} 
      {featured.length > 0 && (
        <ProductCarousel
          title="Best Selling ⌨️"
          products={featured}
          viewAllHref="/products?filter=featured"
        />
      )}
    </>
  );
}

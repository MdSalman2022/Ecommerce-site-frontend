import { fetchBestsellerProducts, fetchFeaturedProducts, fetchLatestProducts, fetchSpecialProducts } from '@/lib/api';
import { ProductCarousel } from '@/components/home';

export default async function ProductSection({ config }: { config?: any }) {
  const sourceType = config?.sourceType || 'featured';
  const limit = config?.limit || 10;
  
  let products = [];
  try {
    if (sourceType === 'bestseller') {
      products = await fetchBestsellerProducts();
    } else if (sourceType === 'featured') {
      products = await fetchFeaturedProducts();
    } else if (sourceType === 'latest') {
      products = await fetchLatestProducts();
    } else if (sourceType === 'special') {
      products = await fetchSpecialProducts();
    } else if (sourceType === 'category' && config.categoryId) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?category=${config.categoryId}&limit=${limit}`);
      const data = await res.json();
      products = data.data || [];
    } else if (sourceType === 'manual' && config.productIds?.length > 0) {
      // Fetch multiple products by ID if API supports it, or use a filtered search
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?limit=50`);
      const data = await res.json();
      products = (data.data || []).filter((p: any) => config.productIds.includes(p._id));
    }
  } catch (err) {
    console.error(`Failed to fetch ${sourceType} products for section:`, err);
  }

  if (products.length === 0) return null;

  return (
    <ProductCarousel
      title={config?.title || (sourceType === 'bestseller' ? "Best deal Alert! 🛒" : "Best Selling ⌨️")}
      products={products.slice(0, limit)}
      viewAllHref={config?.viewAllLink || (sourceType === 'bestseller' ? "/products?filter=bestseller" : "/products?filter=featured")}
    />
  );
}

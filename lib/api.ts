import { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

/**
 * Fetch all products
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

/**
 * Fetch featured products
 */
export async function fetchFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/featured`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch featured products');
  return res.json();
}

/**
 * Fetch bestseller products
 */
export async function fetchBestsellerProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/bestseller`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch bestseller products');
  return res.json();
}

/**
 * Fetch special/deal products
 */
export async function fetchSpecialProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/special`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch special products');
  return res.json();
}

/**
 * Fetch latest products
 */
export async function fetchLatestProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/latest`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch latest products');
  return res.json();
}

/**
 * Fetch single product by ID
 */
export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/product/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await fetchProducts();
  return allProducts.filter(
    (p) => p.cat?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const allProducts = await fetchProducts();
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery) ||
      p.cat?.toLowerCase().includes(lowerQuery)
  );
}

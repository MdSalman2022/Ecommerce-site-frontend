// Product types
export interface Product {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  tags?: string[];

  category?: any;
  subCategory?: any;

  brand?: string;
  manufacturer?: string;

  images: string[];

  flags?: {
    featured: boolean;
    latest: boolean;
    bestseller: boolean;
    special: boolean;
  };

  variants?: {
    attributes: Record<string, string>;
    sku?: string;
    regularPrice: number;
    salePrice: number;
    costPrice?: number;
    stock: number;
    sells?: number;
    images?: string[];
  }[];

  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Category types
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

// Cart type definitions
export interface CartItem extends Product {
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
  variantId?: string;
  variantName?: string;
}

// User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

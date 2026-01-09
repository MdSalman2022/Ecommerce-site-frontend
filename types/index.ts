// Product types
export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  cat?: string;
  subcat?: string;
  description?: string;
  stock?: number;
  rating?: number;
  featured?: boolean;
  special?: boolean;
  discount?: number;
  createdAt?: string;
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

// Cart types
export interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
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

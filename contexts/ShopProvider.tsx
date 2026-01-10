'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ShopContextType {
  products: any[];
  categories: any[];
  allUsers: any[];
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  isLoadingUsers: boolean;
  refetchProducts: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  // Fetch products
  const { data: products = [], isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: typeof window !== 'undefined'
  });

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/categories?nested=true`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      return data.success && Array.isArray(data.data) ? data.data : [];
    },
    enabled: typeof window !== 'undefined'
  });

  // Fetch all users (admin data, but kept here for now as shared store data)
  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['getusers'],
    queryFn: () => fetch(`${API_URL}/api/users`).then(res => res.json()),
    enabled: typeof window !== 'undefined'
  });

  const value = {
    products,
    categories,
    allUsers,
    isLoadingProducts,
    isLoadingCategories,
    isLoadingUsers,
    refetchProducts
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

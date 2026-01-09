'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ShopContextType {
  products: any[];
  allUsers: any[];
  isLoadingProducts: boolean;
  isLoadingUsers: boolean;
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
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch(`${API_URL}/products`).then(res => res.json()),
    enabled: typeof window !== 'undefined'
  });

  // Fetch all users (admin data, but kept here for now as shared store data)
  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['getusers'],
    queryFn: () => fetch(`${API_URL}/getusers`).then(res => res.json()),
    enabled: typeof window !== 'undefined'
  });

  const value = {
    products,
    allUsers,
    isLoadingProducts,
    isLoadingUsers
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

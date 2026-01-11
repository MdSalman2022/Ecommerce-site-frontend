"use client";

import {useQuery} from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function useProducts() {
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    products,
    isLoading,
    error,
    refetch,
  };
}

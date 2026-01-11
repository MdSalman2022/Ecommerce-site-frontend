"use client";

import {useCallback} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent?: string | null;
  children?: Category[];
  image?: string;
  icon?: string;
  description?: string;
  showInHeader: boolean;
  showInSidebar: boolean;
  order: number;
  isActive: boolean;
}

// Fetch functions
const fetchNestedCategories = async (): Promise<Category[]> => {
  const token = localStorage.getItem("accessToken");
  const headers: any = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/api/categories?nested=true`, {headers});
  const data = await res.json();

  if (data.success) {
    return data.data;
  }
  return [];
};

const fetchFlatCategories = async (): Promise<Category[]> => {
  const token = localStorage.getItem("accessToken");
  const headers: any = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/api/categories`, {headers});
  const data = await res.json();

  if (data.success) {
    return data.data;
  }
  return [];
};

export function useCategories() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch nested categories with React Query - ONLY when this hook is used
  const {
    data: categories = [],
    isLoading: isLoadingNested,
    error: nestedError,
  } = useQuery({
    queryKey: ["categories", "nested"],
    queryFn: fetchNestedCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Removed global enabled check - will only fetch when component mounts
  });

  // Fetch flat categories with React Query - ONLY when this hook is used
  const {data: flatCategories = [], isLoading: isLoadingFlat} = useQuery({
    queryKey: ["categories", "flat"],
    queryFn: fetchFlatCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    // Removed global enabled check - will only fetch when component mounts
  });

  const isLoading = isLoadingNested || isLoadingFlat;
  const error = nestedError ? "Failed to load categories" : null;

  const fetchCategories = useCallback(async () => {
    await queryClient.invalidateQueries({queryKey: ["categories"]});
  }, [queryClient]);

  const createCategory = async (data: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        router.push("/login");
        throw new Error("Unauthorized");
      }

      if (!res.ok)
        throw new Error(result.message || "Failed to create category");

      toast.success("Category created successfully");
      fetchCategories();
      return result;
    } catch (err: any) {
      if (err.message !== "Unauthorized") {
        toast.error(err.message);
      }
      throw err;
    }
  };

  const updateCategory = async (id: string, data: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        router.push("/login");
        throw new Error("Unauthorized");
      }

      if (!res.ok)
        throw new Error(result.message || "Failed to update category");

      toast.success("Category updated successfully");
      fetchCategories();
      return result;
    } catch (err: any) {
      if (err.message !== "Unauthorized") {
        toast.error(err.message);
      }
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        router.push("/login");
        throw new Error("Unauthorized");
      }

      if (!res.ok)
        throw new Error(result.message || "Failed to delete category");

      toast.success("Category deleted successfully");
      fetchCategories();
      return result;
    } catch (err: any) {
      if (err.message !== "Unauthorized") {
        toast.error(err.message);
      }
      throw err;
    }
  };

  return {
    categories,
    flatCategories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

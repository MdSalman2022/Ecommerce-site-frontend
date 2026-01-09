'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [flatCategories, setFlatCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            // Fetch nested structure for sidebar/menus
            const resNested = await fetch(`${API_URL}/api/categories?nested=true`);
            const dataNested = await resNested.json();
            
            // Fetch flat structure for admin tables/selectors (or flatten the nested one)
            // It's often easier to fetch flat list for editing references
            const resFlat = await fetch(`${API_URL}/api/categories`);
            const dataFlat = await resFlat.json();

            if (dataNested.success) {
                setCategories(dataNested.data);
            }
            if (dataFlat.success) {
                setFlatCategories(dataFlat.data);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
            setError('Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createCategory = async (data: any) => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_URL}/api/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            
            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                throw new Error('Unauthorized');
            }

            if (!res.ok) throw new Error(result.message || 'Failed to create category');
            
            toast.success('Category created successfully');
            fetchCategories();
            return result;
        } catch (err: any) {
            if (err.message !== 'Unauthorized') {
                toast.error(err.message);
            }
            throw err;
        }
    };

    const updateCategory = async (id: string, data: any) => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_URL}/api/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                throw new Error('Unauthorized');
            }

            if (!res.ok) throw new Error(result.message || 'Failed to update category');

            toast.success('Category updated successfully');
            fetchCategories();
            return result;
        } catch (err: any) {
            if (err.message !== 'Unauthorized') {
                toast.error(err.message);
            }
            throw err;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_URL}/api/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();

            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                throw new Error('Unauthorized');
            }

            if (!res.ok) throw new Error(result.message || 'Failed to delete category');

            toast.success('Category deleted successfully');
            fetchCategories();
            return result;
        } catch (err: any) {
             if (err.message !== 'Unauthorized') {
                toast.error(err.message);
            }
            throw err;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        flatCategories,
        isLoading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory
    };
}

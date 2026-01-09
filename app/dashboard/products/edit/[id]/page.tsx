'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/Dashboard/Products/ProductForm';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
    const params = useParams();
    const productId = params.id as string;
    
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`);
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                const data = await res.json();
                setProduct(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load product');
            } finally {
                setIsLoading(false);
            }
        };
        
        if (productId) {
            fetchProduct();
        }
    }, [productId]);
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-gray-500">Loading product...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-500 font-medium">{error}</p>
                    <a href="/dashboard/products" className="text-primary text-sm mt-2 inline-block hover:underline">
                        Return to Products
                    </a>
                </div>
            </div>
        );
    }
    
    return <ProductForm initialData={product} />;
}

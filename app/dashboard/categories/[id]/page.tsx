'use client';

import { useEffect, useState } from 'react';
import { useCategories, Category } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Edit, 
    Trash2, 
    Plus, 
    ShoppingBag, 
    Grid,
    Search 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function CategoryDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { flatCategories, deleteCategory, isLoading: isCatsLoading } = useCategories();
    const [products, setProducts] = useState<any[]>([]);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const category = flatCategories.find(c => c._id === params.id);
    const subcategories = flatCategories.filter(c => c.parent === params.id);

    useEffect(() => {
        if (category?.slug) {
            fetchProducts(category.slug);
        }
    }, [category]);

    const fetchProducts = async (slug: string) => {
        setIsProductsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/products?category=${slug}`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsProductsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(params.id);
            router.push('/dashboard/categories');
        }
    };

    if (isCatsLoading) {
        return <div className="p-8 text-center text-gray-500">Loading category...</div>;
    }

    if (!category) {
        return (
            <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800">Category not found</h3>
                <Button variant="link" onClick={() => router.push('/dashboard/categories')}>
                    Go back to categories
                </Button>
            </div>
        );
    }

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/categories')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border overflow-hidden">
                             {category.image ? (
                                <Image 
                                    src={category.image} 
                                    alt={category.name} 
                                    width={64} 
                                    height={64} 
                                    className="w-full h-full object-cover"
                                />
                            ) : category.icon ? (
                                <i className={`lucide-${category.icon} w-8 h-8 text-primary`} />
                            ) : (
                                <span className="text-2xl font-bold text-gray-300">
                                    {category.name.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                            <p className="text-gray-500 text-sm">/{category.slug}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => {/* Handle Edit */}}>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="destructive" size="icon" onClick={handleDelete}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <Link href={`/dashboard/products/add?category=${category.slug}`}>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Plus className="w-4 h-4 mr-2" /> Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Description & Details */}
            {category.description && (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-gray-600">{category.description}</p>
                    </CardContent>
                </Card>
            )}

            {/* Subcategories */}
            {subcategories.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Grid className="w-5 h-5 text-gray-500" />
                        Subcategories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {subcategories.map(sub => (
                            <Link key={sub._id} href={`/dashboard/categories/${sub._id}`}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                    <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                              <span className="font-bold">{sub.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{sub.name}</h4>
                                            <p className="text-xs text-gray-500">{sub.slug}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Products */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-gray-500" />
                        Products ({filteredProducts.length})
                    </h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="pl-9"
                        />
                    </div>
                </div>

                {isProductsLoading ? (
                    <div className="text-center py-12 text-gray-500">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                    <Card className="bg-gray-50 border-dashed">
                         <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                            <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                            <p className="text-gray-500 mb-6 max-w-sm">
                                There are no products assigned to this category yet.
                            </p>
                            <Link href={`/dashboard/products/add?category=${category.slug}`}>
                                <Button>Add your first product</Button>
                            </Link>
                         </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="aspect-square bg-gray-100 relative">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : product.images?.[0] ? (
                                         <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ShoppingBag className="w-12 h-12" />
                                        </div>
                                    )}
                                    {product.stock <= 0 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Badge variant="destructive">Out of Stock</Badge>
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg">${product.salePrice || product.regularPrice}</span>
                                        <Link href={`/dashboard/products/${product._id}`}>
                                            <Button variant="outline" size="sm">View</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

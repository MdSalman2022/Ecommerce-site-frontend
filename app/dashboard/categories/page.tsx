'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCategories, Category } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, Plus, CheckCircle, XCircle, Search } from 'lucide-react'; 
import * as Icons from 'lucide-react';
import { IconPicker } from '@/components/ui/icon-picker';
import CloudinaryUploader from '@/components/Upload/CloudinaryUploader';
import Image from 'next/image';

export default function CategoriesPage() {
    const { categories, flatCategories, createCategory, updateCategory, deleteCategory, isLoading } = useCategories();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        parent: '',
        icon: '', // Default to empty string for optional icon
        image: '',
        showInHeader: true,
        showInSidebar: true,
        order: 0,
        isActive: true
    });

    const resetForm = () => {
        setFormData({
            name: '',
            parent: '',
            icon: '',
            image: '',
            showInHeader: true,
            showInSidebar: true,
            order: 0,
            isActive: true
        });
        setEditingCategory(null);
    };

    const handleEdit = (cat: Category) => {
        setEditingCategory(cat);
        setFormData({
            name: cat.name,
            parent: cat.parent || '',
            icon: cat.icon || '',
            image: cat.image || '',
            showInHeader: cat.showInHeader,
            showInSidebar: cat.showInSidebar,
            order: cat.order || 0,
            isActive: cat.isActive
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                parent: formData.parent === '' ? null : formData.parent,
                order: Number(formData.order)
            };

            if (editingCategory) {
                await updateCategory(editingCategory._id, payload);
            } else {
                await createCategory(payload);
            }
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            // Toast handled in hook
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete category "${name}"?`)) {
            await deleteCategory(id);
        }
    };

    // Helper to render nested categories in table
    const renderCategoryRows = (cats: Category[], depth = 0) => {
        const filtered = cats.filter(cat => 
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (cat.children && cat.children.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())))
        );

        return filtered.map((cat) => (
            <React.Fragment key={cat._id}>
                <TableRow>
                    <TableCell style={{ paddingLeft: `${depth * 24 + 16}px` }} className="font-medium">
                        <div className="flex items-center gap-2">
                             {depth > 0 && <span className="text-gray-300">└─</span>}
                             {/* Dynamic Icon or Image */}
                             {(() => {
                                 if (cat.icon) {
                                     const IconComponent = (Icons as any)[cat.icon] || Icons.Circle;
                                     return <IconComponent className="w-4 h-4 text-primary shrink-0" />;
                                 } else if (cat.image) {
                                     return (
                                         <div className="w-6 h-6 rounded-md overflow-hidden relative border border-gray-200 shrink-0">
                                            <Image 
                                                src={cat.image} 
                                                alt={cat.name}
                                                fill
                                                className="object-cover"
                                            />
                                         </div>
                                     );
                                 }
                                 return <Icons.Circle className="w-4 h-4 text-gray-300 shrink-0" />;
                             })()}
                             <Link href={`/dashboard/categories/${cat._id}`} className="hover:underline hover:text-primary transition-colors font-semibold">
                                {cat.name}
                             </Link>
                        </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{cat.slug}</TableCell>
                    <TableCell className="text-center">
                        {cat.showInHeader ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                        {cat.showInSidebar ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(cat)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(cat._id, cat.name)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
                {cat.children && cat.children.length > 0 && renderCategoryRows(cat.children, depth + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className="max-w-7xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div></div>
                
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="flex gap-2">
                            <Plus className="w-4 h-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-2">
                                    <Label>Category Name</Label>
                                    <Input 
                                        required 
                                        value={formData.name} 
                                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                        placeholder="e.g. Laptops"
                                        className="text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Parent Category</Label>
                                    <select 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
                                        value={formData.parent}
                                        onChange={(e) => setFormData({...formData, parent: e.target.value})}
                                    >
                                        <option value="">None (Top Level)</option>
                                        {flatCategories
                                            .filter(c => c._id !== editingCategory?._id) // Prevent self-parenting
                                            .map(c => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Display Priority</Label>
                                    <Input 
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({...formData, order: Number(e.target.value)})}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first (0 = top)</p>
                                </div>
                            </div>

                            {/* Icon & Image Section */}
                            <div className="grid grid-cols-1 gap-6 border-t pt-4">
                                <div>
                                    <Label className="mb-2 block">Category Icon (Optional)</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <IconPicker 
                                                value={formData.icon} 
                                                onChange={(icon) => setFormData({...formData, icon})}
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">Select an icon for menus</p>
                                        </div>
                                        {formData.icon && (
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                size="icon"
                                                onClick={() => setFormData({...formData, icon: ''})}
                                                title="Clear Icon"
                                            >
                                                <XCircle className="w-4 h-4 text-red-500" />
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-2 block">Category Image (Optional)</Label>
                                    <CloudinaryUploader 
                                        onUpload={(url) => setFormData({...formData, image: url})}
                                        currentImage={formData.image}
                                        folder="bestdeal/categories"
                                        className="h-40"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Used for category grids and banners. If no icon is set, this may be used as fallback.</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border space-y-4">
                                <h3 className="font-medium text-sm text-gray-900">Visibility Settings</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Show in Header</Label>
                                        <p className="text-xs text-muted-foreground">Visible in top navigation menu</p>
                                    </div>
                                    <Switch 
                                        checked={formData.showInHeader}
                                        onCheckedChange={(c) => setFormData({...formData, showInHeader: c})}
                                    />
                                </div>
                                <div className="separator border-b border-gray-200"></div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Show in Sidebar</Label>
                                        <p className="text-xs text-muted-foreground">Visible in category sidebar</p>
                                    </div>
                                    <Switch 
                                        checked={formData.showInSidebar}
                                        onCheckedChange={(c) => setFormData({...formData, showInSidebar: c})}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" size="lg" className="w-full md:w-auto">
                                    {editingCategory ? 'Update Category' : 'Create Category'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl border shadow-sm">
                {/* Search Bar */}
                <div className="p-4 border-b bg-gray-50/50 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input 
                            placeholder="Search categories..." 
                            className="pl-9 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="w-[40%]">Category Hierarchy</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-center">Header</TableHead>
                            <TableHead className="text-center">Sidebar</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-16 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p>Loading categories...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-16 text-muted-foreground">
                                    No categories found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            renderCategoryRows(categories)
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

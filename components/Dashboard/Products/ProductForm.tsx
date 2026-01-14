'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useShop } from '@/contexts/ShopProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Trash2, ImageIcon, Save, ArrowLeft, Sparkles } from 'lucide-react';
import { CloudinaryUploader } from '@/components/Upload';
import { categories as staticCategories } from '@/lib/constants';
import { useCategories } from '@/hooks/useCategories';
import { TagsInput } from '@/components/ui/TagsInput';
import { useUI } from '@/contexts/UIProvider';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Product Interface
interface ProductFormData {
  name: string;
  description: string;  // Renamed from 'des'
  manufacturer: string;
  brand: string;
  category: string; // ObjectId
  subCategory: string; // ObjectId
  
  // Pricing
  regularPrice: number;
  salePrice: number;
  costPrice: number;
  
  // Inventory
  sku: string;
  stock: number;
  
  // Media
  images: string[];
  
  // Specifications
  specifications: { key: string; value: string }[];
  
  // Variants
  hasVariants: boolean;
  variantOptions: { name: string; values: string[] }[]; // e.g. [{ name: "Color", values: ["Red", "Blue"] }]
  tags: string[];
}

// Variant Configuration for per-variant pricing/stock/images
interface VariantConfig {
  id: string; // unique key for React
  name: string; // e.g. "Color - Red"
  attributes: Record<string, string>; // { "Color": "Red" }
  regularPrice: number;
  salePrice: number;
  costPrice: number;
  stock: number;
  images: string[];  // Per-variant images
}

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillCategory = searchParams.get('category');
  
  const { flatCategories, createCategory, isLoading: isCatsLoading } = useCategories();
  const { setTitle } = useUI();
  const [isCreatingCat, setIsCreatingCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [isCreatingSubCat, setIsCreatingSubCat] = useState(false);
  const [newSubCatName, setNewSubCatName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState<string[]>(initialData?.images || []);

  // AI Generation State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Tags State
  const [productTags, setProductTags] = useState<string[]>(initialData?.tags || []);
  const [isTagsGenerating, setIsTagsGenerating] = useState(false);
  
  // Product Flags State
  const [featured, setFeatured] = useState(initialData?.flags?.featured || false);
  const [latest, setLatest] = useState(initialData?.flags?.latest || false);
  const [bestseller, setBestseller] = useState(initialData?.flags?.bestseller || false);
  const [special, setSpecial] = useState(initialData?.flags?.special || false);
  
  // Variant Configs State (for per-variant pricing/stock)
  const [variantConfigs, setVariantConfigs] = useState<VariantConfig[]>(() => {
    if (initialData?.variants && initialData.variants.length > 0) {
      return initialData.variants.map((v: any) => ({
        id: v.sku || Math.random().toString(36).substr(2, 9),
        name: v.attributes ? Object.entries(v.attributes).map(([k, val]) => `${k}: ${val}`).join(', ') : 'Variant',
        attributes: v.attributes || {},
        regularPrice: v.regularPrice,
        salePrice: v.salePrice,
        costPrice: v.costPrice,
        stock: v.stock,
        images: v.images || []
      }));
    }
    return [];
  });
  
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: initialData ? {
      ...initialData,
      // Convert ObjectIds to strings for category/subcategory
      category: initialData.category?._id || initialData.category || '',
      subCategory: initialData.subCategory?._id || initialData.subCategory || '',
      // Initialize pricing/stock from first variant if product has variants
      regularPrice: initialData.variants?.[0]?.regularPrice || 0,
      salePrice: initialData.variants?.[0]?.salePrice || 0,
      costPrice: initialData.variants?.[0]?.costPrice || 0,
      stock: initialData.variants?.[0]?.stock || 0,
      sku: initialData.variants?.[0]?.sku || '',
      specifications: initialData.specifications || [{ key: '', value: '' }],
    } : {
      regularPrice: 0,
      salePrice: 0,
      costPrice: 0,
      stock: 0,
      images: [],
      specifications: [{ key: '', value: '' }],
      hasVariants: false,
      variantOptions: [{ name: '', values: [] }],
      category: '',
      subCategory: '',
      cat: prefillCategory || '', 
      subcat: '',
      tags: [],
    }
  });

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: 'specifications'
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variantOptions'
  });

  const hasVariants = watch('hasVariants');
  const regularPrice = watch('regularPrice');
  const salePrice = watch('salePrice');
  const costPrice = watch('costPrice');
  const mainStock = watch('stock');
  
  // Calculate profit based on Sale Price if active, otherwise Regular Price
  const effectivePrice = (salePrice && salePrice > 0) ? salePrice : (regularPrice || 0);
  const profit = effectivePrice - (costPrice || 0);
  const profitMargin = effectivePrice > 0 ? ((profit / effectivePrice) * 100).toFixed(1) : 0;
  
  const productName = watch('name');
  const productDesc = watch('description');

  const selectedCategoryId = watch('category');
  const selectedSubCategoryId = watch('subCategory');
  const subCategories = flatCategories.filter(c => c.parent === selectedCategoryId);


  // Prefill category from URL
  useEffect(() => {
    if (prefillCategory && flatCategories.length > 0 && !selectedCategoryId) {
      const categoryFromUrl = flatCategories.find(c => c.slug === prefillCategory);
      if (categoryFromUrl) {
        setValue('category', categoryFromUrl._id);
      }
    }
  }, [prefillCategory, flatCategories, selectedCategoryId, setValue]);

  // Sync title with global header
  useEffect(() => {
    if (initialData && productName) {
      setTitle(`Edit Product: ${productName}`);
    } else if (initialData) {
      setTitle('Edit Product');
    } else {
      setTitle('Add Product');
    }
    
    // Cleanup on unmount
    return () => setTitle('BestDeal');
  }, [initialData, productName, setTitle]);

  // Reconstruct variantOptions from existing variants if editing
  useEffect(() => {
    if (initialData?.variants?.length > 0 && (!initialData.variantOptions || initialData.variantOptions.length === 0)) {
        // If we have variants but no legacy variantOptions, reconstruct them
        const optionsMap = new Map<string, Set<string>>();
        
        initialData.variants.forEach((v: any) => {
            if (v.attributes && typeof v.attributes === 'object') {
                // Handle Map or Object
                const entries = v.attributes instanceof Map ? v.attributes.entries() : Object.entries(v.attributes);
                for (const [key, val] of entries) {
                    if (!optionsMap.has(key)) optionsMap.set(key, new Set());
                    optionsMap.get(key)?.add(String(val));
                }
            }
        });

        const reconstructedOptions = Array.from(optionsMap.entries()).map(([name, valuesSet]) => ({
            name,
            values: Array.from(valuesSet)
        }));

        if (reconstructedOptions.length > 0) {
            setValue('variantOptions', reconstructedOptions);
            setValue('hasVariants', true);
        }
    } else if (initialData?.variants?.length > 0) {
        // Ensure hasVariants is true if variants exist
        setValue('hasVariants', true);
    }
  }, [initialData, setValue]);

  // Watch variant options
  const watchedVariantOptions = watch('variantOptions');
  
  // Manual generation function for variant combinations
  const handleGenerateVariants = () => {
    const variantOptions = watchedVariantOptions || [];
    
    if (!hasVariants || !variantOptions) {
      toast.error('Please enable variants first');
      return;
    }
    
    // Filter options that have a name and at least one value
    const validOptions = variantOptions.filter(
      opt => opt.name.trim() && opt.values && opt.values.length > 0
    );
    
    if (validOptions.length === 0) {
      toast.error('Please add at least one variant option with values');
      return;
    }
    
    // Generate cartesian product of all variant combinations
    const generateCombinations = (options: { name: string; values: string[] }[]): VariantConfig[] => {
      if (options.length === 0) return [];
      
      const [first, ...rest] = options;
      
      if (rest.length === 0) {
        return first.values.map(val => ({
          id: `${first.name}-${val}`,
          name: `${first.name}: ${val}`,
          attributes: { [first.name]: val },
          regularPrice: regularPrice || 0,
          salePrice: salePrice || 0,
          costPrice: costPrice || 0,
          stock: mainStock || 0,
          images: imageList || [] // Use all main images by default
        }));
      }
      
      const restCombinations = generateCombinations(rest);
      const result: VariantConfig[] = [];
      
      for (const val of first.values) {
        for (const combo of restCombinations) {
          result.push({
            id: `${first.name}-${val}-${combo.id}`,
            name: `${first.name}: ${val}, ${combo.name}`,
            attributes: { [first.name]: val, ...combo.attributes },
            regularPrice: combo.regularPrice,
            salePrice: combo.salePrice,
            costPrice: combo.costPrice,
            stock: combo.stock,
            images: imageList || [], // Use all main images by default
          });
        }
      }
      
      return result;
    };
    
    const newConfigs = generateCombinations(validOptions);
    
    // Preserve existing prices/stock for configs that still exist
    setVariantConfigs(prev => {
      return newConfigs.map(newConfig => {
        const existing = prev.find(p => p.id === newConfig.id);
        if (existing) {
          return { 
            ...newConfig, 
            regularPrice: existing.regularPrice, 
            salePrice: existing.salePrice,
            costPrice: existing.costPrice,
            costPrice: existing.costPrice,
            stock: existing.stock,
            images: existing.images || [] // Preserve existing images
          };
        }
        return newConfig;
      });
    });
    
    toast.success(`Generated ${newConfigs.length} variant combinations`);
  };

  const handleCreateCategory = async () => {
      if (!newCatName.trim()) return;
      try {
          const res = await createCategory({ name: newCatName.trim(), slug: newCatName.trim().toLowerCase().replace(/ /g, '-'), parent: null });
          setValue('category', res.data._id);
          setIsCreatingCat(false);
          setNewCatName('');
          toast.success(`Category "${newCatName}" created!`);
      } catch (e) { }
  };

  const handleCreateSubCategory = async () => {
    if (!newSubCatName.trim() || !selectedCategoryId) return;
    try {
        const res = await createCategory({ name: newSubCatName.trim(), slug: newSubCatName.trim().toLowerCase().replace(/ /g, '-'), parent: selectedCategoryId });
        setValue('subCategory', res.data._id);
        setIsCreatingSubCat(false);
        setNewSubCatName('');
        toast.success(`Subcategory "${newSubCatName}" created!`);
    } catch (e) { }
  };

  const handleGenerateDescription = async () => {
      if (!aiPrompt.trim()) return;
      setIsGenerating(true);
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/generate-description`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: aiPrompt }),
          });
          const data = await res.json();
          if (data.success) {
              setValue('description', data.description);
              toast.success('Description generated!');
              setIsAIModalOpen(false);
          } else {
              toast.error(data.error || 'Generation failed');
          }
      } catch (error) {
          console.error(error);
          toast.error('Failed to generate description');
      } finally {
          setIsGenerating(false);
      }
  };
  
  const handleGenerateTags = async () => {
      if (!productName) {
          toast.error('Please enter a product name first');
          return;
      }
      setIsTagsGenerating(true);
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/generate-tags`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: `${productName}. ${productDesc || ''}` }),
          });
          const data = await res.json();
          if (data.success) {
              // Merge with existing tags, avoiding duplicates
              const newTags = data.tags.filter((t: string) => !productTags.includes(t));
              setProductTags([...productTags, ...newTags]);
              toast.success(`Generated ${newTags.length} tags!`);
          } else {
              toast.error(data.error || 'Generation failed');
          }
      } catch (error) {
          console.error(error);
          toast.error('Failed to generate tags');
      } finally {
          setIsTagsGenerating(false);
      }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      if (data.images.length === 0 && imageList.length === 0) {
        toast.error('Please upload at least one image');
        setIsLoading(false);
        return;
      }

      // Prepare payload
      const payload = {
        ...data,
        images: imageList,
        image: imageList[0], // Main image
        tags: productTags,
        specifications: data.specifications.filter(s => s.key && s.value),
        variantAttributes: data.hasVariants ? 
           data.variantOptions.reduce((acc: any, curr) => {
             if (curr.name) acc[curr.name] = curr.values; // Store as arrays
             return acc;
           }, {}) 
           : {},
        // Include variant configs for per-variant pricing/stock
        variantConfigs: data.hasVariants ? variantConfigs : [{
          id: 'default',
          name: 'Default',
          attributes: {},
          regularPrice: data.regularPrice,
          salePrice: data.salePrice,
          costPrice: data.costPrice,
          stock: data.stock,
          sku: data.sku || '',
          images: []
        }],
        // Include product flags
        featured,
        latest,
        bestseller,
        special,
      };

      const url = initialData 
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/update/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/addproduct`;
        
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(initialData ? 'Product updated!' : 'Product created!');
        router.push('/dashboard/products');
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Operation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-8 w-full pb-10">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button type="submit" disabled={isLoading} className="bg-primary flex-1 sm:flex-none">
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 w-4 h-4" />}
                {initialData ? 'Update' : 'Save'}
            </Button>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-50 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button variant="outline" type="button" onClick={() => router.back()} className="flex-1 h-11">
            Discard
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-primary flex-1 h-11">
            {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 w-4 h-4" />}
            {initialData ? 'Update' : 'Save'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
        
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 2xl:col-span-3 space-y-4 md:space-y-6">
            
            {/* General Info */}
            <Card>
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-6">
                    <CardTitle className="text-base md:text-xl">General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                    <div>
                        <Label>Product Name</Label>
                        <Input {...register('name', { required: 'Name is required' })} placeholder="e.g. Wireless Noise Cancelling Headphones" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                             <Label>Description</Label>
                             <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                                onClick={() => setIsAIModalOpen(true)}
                             >
                                 <Sparkles className="w-3 h-3 mr-1" /> Generate with AI
                             </Button>
                        </div>
                        <Textarea {...register('description')} className="min-h-[120px]" placeholder="Detailed product description..." />
                    </div>
                    
                    {/* Tags Input */}
                    <div>
                        <TagsInput 
                            label="Product Tags"
                            value={productTags}
                            onChange={setProductTags}
                            onGenerate={handleGenerateTags}
                            isGenerating={isTagsGenerating}
                            placeholder="Type tag and press Enter..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Brand</Label>
                            <Input {...register('brand')} placeholder="e.g. Sony" />
                        </div>
                        <div>
                            <Label>Manufacturer</Label>
                            <Input {...register('manufacturer')} placeholder="e.g. Sony Corporation" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Media */}
            <Card>
                <CardHeader className="pb-3 md:pb-6">
                    <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                        {imageList.map((url, idx) => (
                            <div key={idx} className="relative group aspect-square border rounded-lg overflow-hidden">
                                <img src={url} alt="Product" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImageList(imageList.filter((_, i) => i !== idx))}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <CloudinaryUploader
                            onUpload={(url) => setImageList([...imageList, url])}
                            folder="bestdeal/products"
                            currentImage="" // Always empty to allow new uploads
                            autoReset={true}
                        />
                    </div>
                    <p className="text-xs text-gray-500">Upload multiple images. THe first image will be the main thumbnail.</p>
                </CardContent>
            </Card>

            {/* Pricing */}
            <Card className={hasVariants ? 'opacity-60' : ''}>
                <CardHeader className="pb-3 md:pb-6">
                    <CardTitle>Pricing</CardTitle>
                    {hasVariants && (
                        <p className="text-xs text-amber-600">Set prices in the Variants section above</p>
                    )}
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 px-4 md:px-6">
                    <div>
                        <Label>Regular Price ($)</Label>
                        <Input 
                            type="number" 
                            step="0.01" 
                            {...register('regularPrice', { required: !hasVariants, min: 0 })} 
                            disabled={hasVariants}
                        />
                    </div>
                    <div>
                        <Label>Sale Price ($)</Label>
                        <Input 
                            type="number" 
                            step="0.01" 
                            {...register('salePrice', { min: 0 })} 
                            disabled={hasVariants}
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave 0 if not on sale</p>
                    </div>
                    <div>
                        <Label>Cost per Item ($)</Label>
                        <Input 
                            type="number" 
                            step="0.01" 
                            {...register('costPrice', { min: 0 })} 
                            disabled={hasVariants}
                        />
                        {!hasVariants && (
                            <p className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Margin: {profitMargin}%</span>
                                <span>Profit: ${profit.toFixed(2)}</span>
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
                <CardHeader className="pb-3 md:pb-6">
                    <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 px-4 md:px-6">
                    <div>
                        <Label>SKU (Stock Keeping Unit)</Label>
                        <Input {...register('sku')} placeholder="Leave empty to auto-generate" />
                    </div>
                    <div>
                        <Label>Quantity</Label>
                        <Input type="number" {...register('stock', { min: 0 })} />
                    </div>
                </CardContent>
            </Card>
            
            {/* Specifications */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-6">
                    <CardTitle>Specifications</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendSpec({ key: '', value: '' })}>
                        <Plus className="w-4 h-4 mr-1" /> Add Spec
                    </Button>
                </CardHeader>
                <CardContent className="space-y-3 px-4 md:px-6">
                    {specFields.map((field, index) => (
                        <div key={field.id} className="flex gap-3">
                             <Input {...register(`specifications.${index}.key` as const)} placeholder="Name (e.g. Dimensions)" />
                             <Input {...register(`specifications.${index}.value` as const)} placeholder="Value (e.g. 150x20mm)" />
                             <Button type="button" variant="ghost" size="icon" onClick={() => removeSpec(index)}>
                                 <Trash2 className="w-4 h-4 text-red-500" />
                             </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

             {/* Variants */}
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-6">
                    <CardTitle>Variants</CardTitle>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="hasVariants" className="text-sm cursor-pointer">Multiple Variants</Label>
                        <Switch 
                            id="hasVariants" 
                            checked={watch('hasVariants')} 
                            onCheckedChange={(checked) => setValue('hasVariants', checked)}
                        />
                    </div>
                </CardHeader>
                
                {hasVariants && (
                     <CardContent className="space-y-6">
                        {/* Variant Options Input */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">Add options like Size or Color. Use Enter or comma to add values.</p>
                            {variantFields.map((field, index) => (
                                 <div key={field.id} className="p-4 border rounded-lg bg-gray-50/50 space-y-3">
                                     <div className="flex items-center gap-3">
                                         <Input 
                                             {...register(`variantOptions.${index}.name` as const)} 
                                             placeholder="Option Name (e.g. Color)" 
                                             className="w-48 bg-white"
                                         />
                                         <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                                             <Trash2 className="w-4 h-4 text-red-500" />
                                         </Button>
                                     </div>
                                     <Controller
                                         name={`variantOptions.${index}.values` as const}
                                         control={control}
                                         render={({ field: valField }) => (
                                             <TagsInput 
                                                 value={valField.value || []}
                                                 onChange={valField.onChange}
                                                 placeholder="Add values (e.g. Red, Blue)..."
                                             />
                                         )}
                                     />
                                 </div>
                            ))}
                             <Button type="button" variant="outline" size="sm" onClick={() => appendVariant({ name: '', values: [] })}>
                                <Plus className="w-4 h-4 mr-1" /> Add Option
                            </Button>
                        </div>
                        
                        {/* Generate Combinations Button */}
                        <div className="flex items-center justify-center py-4">
                            {variantConfigs.length === 0 ? (
                                <Button 
                                    type="button" 
                                    onClick={handleGenerateVariants}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Generate Variant Combinations
                                </Button>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm text-green-600 font-medium">✓ Variants are generated</p>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        size="sm"
                                        onClick={handleGenerateVariants}
                                        className="text-gray-500 hover:text-red-500 hover:border-red-200"
                                    >
                                        Regenerate (Clears customized prices)
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        {/* Bulk Actions */}
                        {variantConfigs.length > 0 && (
                          <div className="flex justify-end mb-2">
                             <Button
                               type="button"
                               variant="outline"
                               size="sm"
                               onClick={() => {
                                 setVariantConfigs(prev => prev.map(c => ({ ...c, images: imageList })));
                                 toast.success('Applied all main images to variants');
                               }}
                             >
                               <ImageIcon className="w-4 h-4 mr-2" />
                               Use Main Images for All
                             </Button>
                          </div>
                        )}
                        
                        {/* Variant Configuration Table */}
                        {variantConfigs.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm text-gray-700">Variant Configuration</h4>
                                    <p className="text-xs text-gray-500">{variantConfigs.length} combinations</p>
                                </div>
                                
                                {/* Desktop Table */}
                                <div className="hidden lg:block border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="text-left p-3 font-medium">Variant</th>
                                                <th className="text-left p-3 font-medium w-28">Reg. Price</th>
                                                <th className="text-left p-3 font-medium w-28">Sale Price</th>
                                                <th className="text-left p-3 font-medium w-28">Cost Price</th>
                                                <th className="text-left p-3 font-medium w-24">Stock</th>
                                                <th className="text-left p-3 font-medium min-w-[150px]">Images</th>
                                                <th className="text-center p-3 font-medium w-16">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variantConfigs.map((config, idx) => (
                                                <tr key={config.id} className="border-t">
                                                    <td className="p-3 text-gray-700">{config.name}</td>
                                                    <td className="p-3">
                                                        <Input 
                                                            type="number"
                                                            step="0.01"
                                                            value={config.regularPrice}
                                                            onChange={(e) => {
                                                                setVariantConfigs(prev => prev.map((c, i) => 
                                                                    i === idx ? { ...c, regularPrice: parseFloat(e.target.value) || 0 } : c
                                                                ));
                                                            }}
                                                            className="h-8 px-2"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        <Input 
                                                            type="number"
                                                            step="0.01"
                                                            value={config.salePrice}
                                                            onChange={(e) => {
                                                                setVariantConfigs(prev => prev.map((c, i) => 
                                                                    i === idx ? { ...c, salePrice: parseFloat(e.target.value) || 0 } : c
                                                                ));
                                                            }}
                                                            className="h-8 px-2"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        <Input 
                                                            type="number"
                                                            step="0.01"
                                                            value={config.costPrice}
                                                            onChange={(e) => {
                                                                setVariantConfigs(prev => prev.map((c, i) => 
                                                                    i === idx ? { ...c, costPrice: parseFloat(e.target.value) || 0 } : c
                                                                ));
                                                            }}
                                                            className="h-8 px-2"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        <Input 
                                                            type="number"
                                                            value={config.stock}
                                                            onChange={(e) => {
                                                                setVariantConfigs(prev => prev.map((c, i) => 
                                                                    i === idx ? { ...c, stock: parseInt(e.target.value) || 0 } : c
                                                                ));
                                                            }}
                                                            className="h-8 px-2"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex flex-col gap-2">
                                                          {/* Selected Images Preview */}
                                                          {config.images && config.images.length > 0 && (
                                                            <div className="flex gap-1 flex-wrap">
                                                              {config.images.map((img, i) => (
                                                                <div key={i} className="relative w-8 h-8 rounded border overflow-hidden">
                                                                  <img src={img} alt="Variant" className="w-full h-full object-cover" />
                                                                </div>
                                                              ))}
                                                            </div>
                                                          )}
                                                          
                                                          {/* Image Selector Dropdown */}
                                                          <Select
                                                            value=""
                                                            onValueChange={(val) => {
                                                              // Toggle selection
                                                              setVariantConfigs(prev => prev.map((c, i) => {
                                                                if (i !== idx) return c;
                                                                const currentImages = c.images || [];
                                                                const newImages = currentImages.includes(val)
                                                                  ? currentImages.filter(img => img !== val)
                                                                  : [...currentImages, val];
                                                                return { ...c, images: newImages };
                                                              }));
                                                            }}
                                                          >
                                                            <SelectTrigger className="h-8 text-xs">
                                                              <SelectValue placeholder="Select Images" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                              {imageList.length > 0 ? (
                                                                imageList.map((img, i) => (
                                                                  <SelectItem key={i} value={img} className="cursor-pointer">
                                                                    <div className="flex items-center gap-2">
                                                                      <img src={img} className="w-6 h-6 object-cover rounded" />
                                                                      <span className="truncate max-w-[100px]">Image {i + 1}</span>
                                                                      {config.images?.includes(img) && (
                                                                        <span className="text-green-500 ml-auto">✓</span>
                                                                      )}
                                                                    </div>
                                                                  </SelectItem>
                                                                ))
                                                              ) : (
                                                                <div className="p-2 text-xs text-center text-gray-500">Upload images first</div>
                                                              )}
                                                            </SelectContent>
                                                          </Select>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <Button 
                                                            type="button" 
                                                            variant="ghost" 
                                                            size="icon"
                                                            onClick={() => {
                                                                setVariantConfigs(prev => prev.filter((_, i) => i !== idx));
                                                            }}
                                                            className="h-8 w-8"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile/Tablet Card View */}
                                <div className="lg:hidden space-y-4">
                                    {variantConfigs.map((config, idx) => (
                                        <div key={config.id} className="border rounded-xl p-4 bg-gray-50/30 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="font-semibold text-sm text-gray-900 pr-8">{config.name}</div>
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon"
                                                    onClick={() => {
                                                        setVariantConfigs(prev => prev.filter((_, i) => i !== idx));
                                                    }}
                                                    className="h-8 w-8 text-red-500 -mt-1 -mr-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] uppercase text-gray-500">Reg. Price</Label>
                                                    <Input 
                                                        type="number"
                                                        step="0.01"
                                                        value={config.regularPrice}
                                                        onChange={(e) => {
                                                            setVariantConfigs(prev => prev.map((c, i) => 
                                                                i === idx ? { ...c, regularPrice: parseFloat(e.target.value) || 0 } : c
                                                            ));
                                                        }}
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] uppercase text-gray-500">Sale Price</Label>
                                                    <Input 
                                                        type="number"
                                                        step="0.01"
                                                        value={config.salePrice}
                                                        onChange={(e) => {
                                                            setVariantConfigs(prev => prev.map((c, i) => 
                                                                i === idx ? { ...c, salePrice: parseFloat(e.target.value) || 0 } : c
                                                            ));
                                                        }}
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] uppercase text-gray-500">Cost Price</Label>
                                                    <Input 
                                                        type="number"
                                                        step="0.01"
                                                        value={config.costPrice}
                                                        onChange={(e) => {
                                                            setVariantConfigs(prev => prev.map((c, i) => 
                                                                i === idx ? { ...c, costPrice: parseFloat(e.target.value) || 0 } : c
                                                            ));
                                                        }}
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] uppercase text-gray-500">Stock</Label>
                                                    <Input 
                                                        type="number"
                                                        value={config.stock}
                                                        onChange={(e) => {
                                                            setVariantConfigs(prev => prev.map((c, i) => 
                                                                i === idx ? { ...c, stock: parseInt(e.target.value) || 0 } : c
                                                            ));
                                                        }}
                                                        className="h-9"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] uppercase text-gray-500">Variant Images</Label>
                                                <div className="flex gap-2 items-center">
                                                    {config.images && config.images.length > 0 && (
                                                        <div className="flex gap-1 flex-wrap max-w-full overflow-x-auto pb-1">
                                                            {config.images.map((img, i) => (
                                                                <div key={i} className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
                                                                    <img src={img} alt="Variant" className="w-full h-full object-cover" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <Select
                                                        value=""
                                                        onValueChange={(val) => {
                                                            setVariantConfigs(prev => prev.map((c, i) => {
                                                                if (i !== idx) return c;
                                                                const currentImages = c.images || [];
                                                                const newImages = currentImages.includes(val)
                                                                    ? currentImages.filter(img => img !== val)
                                                                    : [...currentImages, val];
                                                                return { ...c, images: newImages };
                                                            }));
                                                        }}
                                                    >
                                                        <SelectTrigger className="h-8 min-w-[100px] text-[10px]">
                                                            <SelectValue placeholder="Add Images" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {imageList.map((img, i) => (
                                                                <SelectItem key={i} value={img}>
                                                                    <div className="flex items-center gap-2">
                                                                        <img src={img} className="w-6 h-6 object-cover rounded" />
                                                                        <span className="truncate max-w-[100px]">Image {i + 1}</span>
                                                                        {config.images?.includes(img) && <span className="text-green-500 ml-auto">✓</span>}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                     </CardContent>
                )}
            </Card>

        </div>

        {/* Right Column - Organization */}
        <div className="space-y-4 md:space-y-6">
            <Card>
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-6">
                    <CardTitle className="text-sm md:text-lg font-semibold">Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                     {/* Category Selector */}
                     <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label>Category</Label>
                            <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-xs text-primary hover:text-primary/80"
                                onClick={() => setIsCreatingCat(!isCreatingCat)}
                            >
                                {isCreatingCat ? 'Cancel' : '+ Create New'}
                            </Button>
                        </div>
                        
                        {isCreatingCat ? (
                            <div className="flex items-center gap-2">
                                <Input 
                                    placeholder="New Category Name" 
                                    value={newCatName} 
                                    onChange={(e) => setNewCatName(e.target.value)}
                                    className="h-9"
                                />
                                <Button type="button" size="sm" onClick={handleCreateCategory} disabled={isCatsLoading}>Save</Button>
                            </div>
                        ) : (
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select 
                                        onValueChange={(val) => field.onChange(val)} 
                                        value={field.value}
                                        disabled={isCatsLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {flatCategories.filter(c => !c.parent).map(c => (
                                                <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                            ))}
                                            {flatCategories.length === 0 && !isCatsLoading && (
                                                <div className="p-2 text-sm text-center text-gray-500">No categories found</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        )}
                    </div>

                     {/* Subcategory Selector */}
                     <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label>Subcategory (Optional)</Label>
                            {selectedCategoryId && !isCreatingCat && (
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 text-xs text-primary hover:text-primary/80"
                                    onClick={() => setIsCreatingSubCat(!isCreatingSubCat)}
                                >
                                    {isCreatingSubCat ? 'Cancel' : '+ Create New'}
                                </Button>
                            )}
                        </div>

                         {isCreatingSubCat ? (
                            <div className="flex items-center gap-2">
                                <Input 
                                    placeholder="New Subcategory Name" 
                                    value={newSubCatName} 
                                    onChange={(e) => setNewSubCatName(e.target.value)}
                                    className="h-9"
                                />
                                <Button type="button" size="sm" onClick={handleCreateSubCategory} disabled={isCatsLoading}>Save</Button>
                            </div>
                        ) : (
                             <Controller
                                name="subCategory"
                                control={control}
                                render={({ field }) => (
                                    <Select 
                                        onValueChange={field.onChange} 
                                        value={field.value}
                                        disabled={!selectedCategoryId || isCatsLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={selectedCategoryId ? "Select Subcategory" : "Select Category First"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subCategories.map(c => (
                                                <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                            ))}
                                            {subCategories.length === 0 && (
                                                <div className="p-2 text-sm text-center text-gray-500">No subcategories found</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        )}
                    </div>

                    {/* Hidden inputs to store legacy string values for fallback if needed */}
                    <input type="hidden" {...register('cat')} />
                    <input type="hidden" {...register('subcat')} />
                </CardContent>
            </Card>
            
            {/* Product Badges */}
            <Card>
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-6">
                    <CardTitle className="text-sm md:text-lg font-semibold">Product Badges</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Control which special sections display this product</p>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Featured</Label>
                            <p className="text-xs text-muted-foreground">Show on homepage carousel</p>
                        </div>
                        <Switch checked={featured} onCheckedChange={setFeatured} />
                    </div>
                    
                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Latest</Label>
                            <p className="text-xs text-muted-foreground">Show in latest products</p>
                        </div>
                        <Switch checked={latest} onCheckedChange={setLatest} />
                    </div>
                    
                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Bestseller</Label>
                            <p className="text-xs text-muted-foreground">Show in bestseller section</p>
                        </div>
                        <Switch checked={bestseller} onCheckedChange={setBestseller} />
                    </div>
                    
                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Special</Label>
                            <p className="text-xs text-muted-foreground">Mark as special offer</p>
                        </div>
                        <Switch checked={special} onCheckedChange={setSpecial} />
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>

      {/* AI Generator Modal */}
      <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Generate Description
            </DialogTitle>
            <DialogDescription>
              Enter a few keywords or details about the product, and AI will write the description for you.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <Textarea 
                placeholder="E.g. Wireless headphones, 30h battery life, noise cancelling, premium leather earcups, bluetooth 5.0..."
                className="min-h-[100px]"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
             />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAIModalOpen(false)}>Cancel</Button>
            <Button onClick={handleGenerateDescription} disabled={isGenerating || !aiPrompt.trim()} className="bg-indigo-600 hover:bg-indigo-700">
                {isGenerating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" /> Generate
                    </>
                )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}

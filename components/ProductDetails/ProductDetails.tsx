'use client';

import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { TbDiscount } from 'react-icons/tb';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

import { useShop } from '@/contexts/ShopProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import ProductCard from '@/components/product/ProductCard';
import ProductReview from './ProductReview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WishlistButton } from '@/components/Wishlist';
import { AIRecommendations } from '@/components/AI';
import { ProductGallery } from './ProductGallery';

function scrollToRef(ref: React.RefObject<HTMLDivElement | null>) {
  if (ref.current) {
    window.scrollTo({ top: ref.current.offsetTop - 170, behavior: 'smooth' });
  }
}

function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [count, setCount] = useState(1);
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [reviewLength, setReviewLength] = useState(0);

  // Variant State
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const { products } = useShop();
  const { cart, setCart } = useUserActivity();
  const reviewRef = useRef<HTMLDivElement>(null);

  // Fetch product details
  const { data: item, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${productId}`);
      if (!res.ok) throw new Error('Product not found');
      return res.json();
    },
    enabled: !!productId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10 && newCount >= 0) {
      setCount(newCount);
    }
  };

  // Initialize variant selection
  const computedVariantOptions = React.useMemo(() => {
     if (item?.variantOptions && item.variantOptions.length > 0) return item.variantOptions;
     
     if (item?.variants && item.variants.length > 0) {
        const optionsMap = new Map<string, Set<string>>();
        item.variants.forEach((v: any) => {
             if (v.attributes) {
                 Object.entries(v.attributes).forEach(([key, val]) => {
                     if (!optionsMap.has(key)) optionsMap.set(key, new Set());
                     optionsMap.get(key)?.add(String(val));
                 });
             }
        });
        
        return Array.from(optionsMap.entries()).map(([name, valuesSet]) => ({
            name,
            values: Array.from(valuesSet)
        }));
     }
     return [];
  }, [item]);



  // Initialize variant selection
  React.useEffect(() => {
    if (item?.variants?.length > 0 && Object.keys(selectedAttributes).length === 0) {
      setSelectedAttributes(item.variants[0].attributes);
    }
  }, [item, selectedAttributes]);

  // Find matching variant
  React.useEffect(() => {
    if (item?.variants) {
      const found = item.variants.find((v: any) =>
        Object.entries(selectedAttributes).every(([key, val]) => v.attributes[key] === val)
      );
      setSelectedVariant(found || null);
    }
  }, [item, selectedAttributes]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const {
    _id,
    name,
    cat,
    brand,
    image,
    images = [],
    spec = [],
    price,
    special,
    discount,
  } = item;

  // Initialize variant selection


  // Derived values
  const currentPrice = selectedVariant ? {
     regularPrice: selectedVariant.regularPrice,
     salePrice: selectedVariant.salePrice
  } : {
     regularPrice: item?.regularPrice || item?.price,
     salePrice: item?.salePrice
  };

  const currentStock = selectedVariant ? selectedVariant.stock : (item?.stock || 0);
  const currentImages = selectedVariant && selectedVariant.images && selectedVariant.images.length > 0
     ? selectedVariant.images
     : (item?.images || []);
  const currentMainImage = currentImages[0] || item?.image;

  let specialprice = currentPrice.regularPrice;
  if (special && discount) {
    specialprice = currentPrice.regularPrice - (currentPrice.regularPrice * discount) / 100;
  }

  // Get related products
  const suggestion = products.filter(
    (p: any) => p.cat === cat && p._id !== _id
  ).slice(0, 4);

  const handleCart = (data: any, qty: number) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = currentCart.find((item: any) => item._id === data._id);

    let updatedCart;
    if (cartItem) {
      updatedCart = currentCart.map((item: any) => {
        if (item._id === data._id) {
          return {
            ...item,
            quantity: qty || item.quantity + 1,
            totalPrice: item.price * (qty || item.quantity + 1),
          };
        }
        return item;
      });
    } else {
      const newCartItem = {
        ...data,
        ... (selectedVariant && { 
             price: selectedVariant.salePrice > 0 ? selectedVariant.salePrice : selectedVariant.regularPrice,
             image: currentMainImage,
             variantId: selectedVariant._id,
             variantName: Object.values(selectedVariant.attributes).join(' / ')
        }),
        quantity: qty || 1,
        totalPrice: (selectedVariant ? (selectedVariant.salePrice > 0 ? selectedVariant.salePrice : selectedVariant.regularPrice) : data.price) * (qty || 1),
      };
      updatedCart = [...currentCart, newCartItem];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuyNow = (data: any, qty: number) => {
    handleCart(data, qty);
    router.push('/checkout');
  };

  const executeScroll = () => scrollToRef(reviewRef);

  return (
    <div className="bg-background pt-10 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link href={`/${cat}`} className="text-muted-foreground hover:text-primary capitalize">{cat}</Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="text-foreground truncate max-w-xs">{name}</li>
          </ol>
        </nav>
      </div>

      {/* Product Details */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 py-10 px-4">
        {/* Product Images Gallery */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-20">
            <WishlistButton productId={_id} size="md" />
          </div>
          <ProductGallery mainImage={currentMainImage} images={currentImages} name={name} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-5 text-lg font-semibold capitalize mb-2">
              <span className="text-primary">{brand}</span>
              <div onClick={executeScroll} className="flex gap-2 cursor-pointer items-center">
                <span className="flex items-center text-yellow-500">{stars}</span>
                <span className="text-sm text-gray-500 hover:text-primary transition-colors">
                  ({reviewLength} Ratings)
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {name}
            </h1>

            {/* Price section - Dynamic based on selection */}
            <div className="flex items-center gap-4 mb-6">
               {(currentPrice.salePrice > 0 || (item.special && item.discount)) ? (
                  <>
                    <span className="text-2xl line-through text-gray-400">
                        ${(currentPrice.regularPrice || item.price).toLocaleString()}
                    </span>
                    <span className="text-4xl font-bold text-primary">
                        ${(currentPrice.salePrice || specialprice).toFixed(2)}
                    </span>
                    <span className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                        <TbDiscount className="w-4 h-4" /> 
                         {currentPrice.salePrice > 0 
                            ? Math.round(((currentPrice.regularPrice - currentPrice.salePrice) / currentPrice.regularPrice) * 100)
                            : item.discount}% OFF
                    </span>
                  </>
               ) : (
                  <span className="text-4xl text-primary font-bold">
                    ${(currentPrice.regularPrice || item.price).toLocaleString()}
                  </span>
               )}
            </div>
          </div>

          {/* Variants Section - New Architecture */}
          {item.variants && item.variants.length > 0 && computedVariantOptions.length > 0 && (
            <div className="space-y-4 mb-4">
               {computedVariantOptions.map((option: any, idx: number) => (
                 <div key={idx}>
                   <p className="font-semibold text-gray-900 mb-2 capitalize">{option.name}:</p>
                   <div className="flex flex-wrap gap-2">
                     {option.values.map((val: string) => {
                       // Check availability: does a variant exist with this value AND currently selected values for OTHER options?
                       const isAvailable = item.variants.some((v: any) => {
                         const matchThis = v.attributes[option.name] === val;
                         const matchOthers = Object.entries(selectedAttributes).every(([key, selectedVal]) => {
                           if (key === option.name) return true; // Ignore current option
                           return v.attributes[key] === selectedVal;
                         });
                         return matchThis && matchOthers && v.stock > 0;
                       });

                       const isSelected = selectedAttributes[option.name] === val;

                       return (
                         <Button
                           key={val}
                           variant={isSelected ? "default" : "outline"}
                           className={`h-auto py-2 px-4 ${!isAvailable && !isSelected ? 'opacity-50 dashed border-gray-300' : ''}`}
                           onClick={() => {
                             setSelectedAttributes(prev => {
                               const next = { ...prev, [option.name]: val };
                               // Reset other attributes if selection becomes invalid? 
                               // For now, simpler approach: just set it. 
                               return next; 
                             });
                           }}
                         >
                           {val}
                         </Button>
                       );
                     })}
                   </div>
                 </div>
               ))}
            </div>
          )}
          
          {/* Legacy Variant Support (Fallback) */}
          {!item.variants && item.variantGroupId && (
            <div className="mb-4">
               <p className="font-semibold text-gray-900 mb-2">Available Options:</p>
               <div className="flex flex-wrap gap-2">
                  {products
                    .filter((p: any) => p.variantGroupId === item.variantGroupId)
                    .map((variant: any) => (
                      <Link 
                        key={variant._id} 
                        href={`/productDetails/${variant._id}/${encodeURIComponent(variant.name).replace(/%20/g, '-')}`}
                      >
                         <Button 
                            variant={variant._id === _id ? "default" : "outline"}
                            className="h-auto py-2 px-4"
                         >
                            {variant.variantAttributes && Object.keys(variant.variantAttributes).length > 0
                                ? Object.values(variant.variantAttributes).join(' / ')
                                : variant.name.replace(name.split(' ')[0], '').trim() || 'Variant'
                            }
                         </Button>
                      </Link>
                  ))}
               </div>
            </div>
          )}

          {/* Key Features / Specs */}
          <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-lg font-bold text-gray-900">Specifications</p>
            
            {/* New Specifications (Key-Value) */}
            {item.specifications && item.specifications.length > 0 ? (
                 <div className="grid grid-cols-1 gap-y-2 text-sm">
                    {item.specifications.map((s: any, idx: number) => (
                        <div key={idx} className="flex border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-600 w-1/3">{s.key}</span>
                            <span className="text-gray-900 w-2/3">{s.value}</span>
                        </div>
                    ))}
                 </div>
            ) : (
                /* Legacy Specs (Array of Strings) */
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2"><span className="font-semibold min-w-[80px]">Model:</span> {name}</li>
                  {spec.map((item: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
            )}
          </div>

          {/* Quantity & Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 mt-2">
            
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg h-14 shrink-0">
              <button
                className="w-12 h-full flex items-center justify-center hover:bg-gray-100 transition-colors rounded-l-lg"
                onClick={() => setCount(Math.max(1, count - 1))}
                disabled={count <= 1}
              >
                <FaMinus className="w-3 h-3 text-gray-600" />
              </button>
              <Input
                type="number"
                className="w-14 h-full text-center border-none focus-visible:ring-0 text-lg font-semibold"
                value={count}
                onChange={handleChange}
                min={1}
                max={10}
              />
              <button
                className="w-12 h-full flex items-center justify-center hover:bg-gray-100 transition-colors rounded-r-lg"
                onClick={() => setCount(Math.min(10, count + 1))}
                disabled={count >= 10}
              >
                <FaPlus className="w-3 h-3 text-gray-600" />
              </button>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-1 gap-4">
              <Button
                onClick={() => handleCart(item, count)}
                className="flex-1 h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Add to Cart
              </Button>

              <Button
                onClick={() => handleBuyNow(item, count)}
                className="flex-1 h-14 text-lg font-bold bg-gray-900 hover:bg-black text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Reviews Section */}
      <div className="container mx-auto mt-10 px-4" ref={reviewRef}>
        <ProductReview
          productId={_id}
          setStars={setStars}
          stars={stars}
          setReviewLength={setReviewLength}
          reviewLength={reviewLength}
        />
      </div>

      {/* AI-Powered Recommendations */}
      <div className="container mx-auto px-4">
        <AIRecommendations 
          productId={_id} 
          title="You May Also Like" 
          limit={4} 
        />
      </div>
    </div>
  );
}

export default ProductDetails;

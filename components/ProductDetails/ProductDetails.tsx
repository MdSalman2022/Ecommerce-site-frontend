"use client";

import React, {useState, useRef, useMemo, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import {TbDiscount} from "react-icons/tb";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";

import {useShop} from "@/contexts/ShopProvider";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import ProductReview from "./ProductReview";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {WishlistButton} from "@/components/Wishlist";
import {AIRecommendations} from "@/components/AI";
import {ProductGallery} from "./ProductGallery";

function scrollToRef(ref: React.RefObject<HTMLDivElement | null>) {
  if (ref.current) {
    window.scrollTo({top: ref.current.offsetTop - 170, behavior: "smooth"});
  }
}

function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productSlug = (params?.slug || params?.id) as string;

  const [count, setCount] = useState(1);
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [reviewLength, setReviewLength] = useState(0);

  // Variant State
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const {products} = useShop();
  const {cart, setCart, trackProductView} = useUserActivity();
  const reviewRef = useRef<HTMLDivElement>(null);

  // Fetch product details by slug
  const {data: item, isLoading} = useQuery({
    queryKey: ["product", productSlug],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/slug/${productSlug}`
      );
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!productSlug,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10 && newCount >= 0) {
      setCount(newCount);
    }
  };

  // Initialize variant selection
  const variants = item?.variants || [];

  const computedVariantOptions = React.useMemo(() => {
    if (variants.length > 0) {
      const optionsMap = new Map<string, Set<string>>();
      variants.forEach((v: any) => {
        if (v.attributes) {
          Object.entries(v.attributes).forEach(([key, val]) => {
            if (!optionsMap.has(key)) optionsMap.set(key, new Set());
            optionsMap.get(key)?.add(String(val));
          });
        }
      });

      return Array.from(optionsMap.entries()).map(([name, valuesSet]) => ({
        name,
        values: Array.from(valuesSet),
      }));
    }
    return [];
  }, [variants]);

  // Default selection
  React.useEffect(() => {
    if (
      variants.length > 0 &&
      Object.keys(selectedAttributes).length === 0 &&
      computedVariantOptions.length > 0
    ) {
      // Select first variant's attributes by default
      setSelectedAttributes(variants[0].attributes || {});
    }
  }, [variants, computedVariantOptions, selectedAttributes]);

  // Find matching variant
  React.useEffect(() => {
    if (variants.length > 0) {
      // If no attributes (single variant product), just pick the first one
      if (computedVariantOptions.length === 0) {
        setSelectedVariant(variants[0]);
        return;
      }

      const found = variants.find((v: any) =>
        Object.entries(selectedAttributes).every(
          ([key, val]) => v.attributes[key] === val
        )
      );
      setSelectedVariant(found || null);
    }
  }, [variants, selectedAttributes, computedVariantOptions]);

  // Track product view for AI recommendations
  useEffect(() => {
    if (item && item._id) {
      const activeVariant = selectedVariant || variants[0] || {};
      const price = activeVariant.salePrice || activeVariant.regularPrice || 0;

      trackProductView({
        _id: item._id,
        category: item.category,
        subCategory: item.subCategory,
        brand: item.brand,
        price,
      });
    }
  }, [item?._id]); // Only track once when product loads

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
        <h1 className="text-2xl font-bold text-foreground">
          Product not found
        </h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const {
    _id,
    name,
    category,
    subCategory,
    brand,
    images = [],
    specifications = [],
    flags = {},
    rating,
  } = item;

  // Category safe access
  const categoryName = category?.name || "";
  const categorySlug = category?.slug || "";

  // Derived values from Active Variant
  const activeVariant = selectedVariant || variants[0] || {};
  const regularPrice = activeVariant.regularPrice || 0;
  const salePrice = activeVariant.salePrice || 0;
  const stock = activeVariant.stock || 0;

  // Images logic: Variant images > Product images
  const variantImages =
    activeVariant.images && activeVariant.images.length > 0
      ? activeVariant.images
      : images;
  const displayImages =
    variantImages.length > 0 ? variantImages : ["/placeholder.png"];
  const mainImage = displayImages[0];

  // Pricing Logic
  const hasDiscount = salePrice > 0 && salePrice < regularPrice;
  const displayPrice = hasDiscount ? salePrice : regularPrice;
  const originalPrice = hasDiscount ? regularPrice : null;
  const discountPercent = hasDiscount
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
    : 0;

  const handleCart = (qty: number) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = currentCart.find(
      (c: any) => c._id === _id && c.variantId === activeVariant._id
    );

    // Prepare item data
    const itemToAdd = {
      _id,
      name,
      slug: item.slug,
      image: mainImage,
      price: displayPrice,
      // Variant info
      variantId: activeVariant._id || "default", // Verify if variants have _id (Mongoose subdocs usually do)
      variantName: activeVariant.attributes
        ? Object.values(activeVariant.attributes).join(" / ")
        : "",
      quantity: qty,
    };

    let updatedCart;
    if (cartItem) {
      updatedCart = currentCart.map((c: any) => {
        if (c._id === _id && c.variantId === itemToAdd.variantId) {
          const newQty = c.quantity + qty;
          return {
            ...c,
            quantity: newQty,
            totalPrice: c.price * newQty,
          };
        }
        return c;
      });
    } else {
      updatedCart = [
        ...currentCart,
        {...itemToAdd, quantity: qty, totalPrice: displayPrice * qty},
      ];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyNow = (qty: number) => {
    handleCart(qty);
    router.push("/checkout");
  };

  const executeScroll = () => scrollToRef(reviewRef);

  return (
    <div className="bg-background pt-10 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
            </li>
            {categoryName && (
              <>
                <li className="text-muted-foreground">/</li>
                <li>
                  <Link
                    href={`/category/${categorySlug}`}
                    className="text-muted-foreground hover:text-primary capitalize"
                  >
                    {categoryName}
                  </Link>
                </li>
              </>
            )}
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
          <ProductGallery
            mainImage={mainImage}
            images={displayImages}
            name={name}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-5 text-lg font-semibold capitalize mb-2">
              <span className="text-primary">{brand || "Generic"}</span>
              <div
                onClick={executeScroll}
                className="flex gap-2 cursor-pointer items-center"
              >
                <span className="flex items-center text-yellow-500">
                  {stars}
                </span>
                <span className="text-sm text-gray-500 hover:text-primary transition-colors">
                  ({reviewLength} Ratings)
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {name}
            </h1>

            {/* Price section */}
            <div className="flex items-center gap-4 mb-6">
              {hasDiscount ? (
                <>
                  <span className="text-2xl line-through text-gray-400">
                    ৳{originalPrice?.toLocaleString()}
                  </span>
                  <span className="text-4xl font-bold text-primary">
                    ৳{displayPrice.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    <TbDiscount className="w-4 h-4" />
                    {discountPercent}% OFF
                  </span>
                </>
              ) : (
                <span className="text-4xl text-primary font-bold">
                  ৳{displayPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Variants Section */}
          {computedVariantOptions.length > 0 && (
            <div className="space-y-4 mb-4">
              {computedVariantOptions.map((option: any, idx: number) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-900 mb-2 capitalize">
                    {option.name}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((val: string) => {
                      // Check availability
                      const isAvailable = variants.some((v: any) => {
                        const matchThis = v.attributes[option.name] === val;
                        const matchOthers = Object.entries(
                          selectedAttributes
                        ).every(([key, selectedVal]) => {
                          if (key === option.name) return true;
                          return v.attributes[key] === selectedVal;
                        });
                        return matchThis && matchOthers && v.stock > 0;
                      });

                      const isSelected =
                        selectedAttributes[option.name] === val;

                      return (
                        <Button
                          key={val}
                          variant={isSelected ? "default" : "outline"}
                          className={`h-auto py-2 px-4 ${
                            !isAvailable && !isSelected
                              ? "opacity-50 dashed border-gray-300"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedAttributes((prev) => ({
                              ...prev,
                              [option.name]: val,
                            }));
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

          {/* Key Features / Specs */}
          <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-lg font-bold text-gray-900">Specifications</p>

            {specifications && specifications.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-2 text-sm">
                {specifications.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold text-gray-600 w-1/3 break-words">
                      {s.key}
                    </span>
                    <span className="text-gray-900 w-2/3 break-words">{s.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No specifications available
              </p>
            )}
          </div>

          {/* Quantity & Action Buttons (Desktop) */}
          <div className="hidden md:flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 mt-2">
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
                onClick={() => handleCart(count)}
                disabled={stock === 0}
                className="flex-1 h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Button
                onClick={() => handleBuyNow(count)}
                disabled={stock === 0}
                className="flex-1 h-14 text-lg font-bold bg-gray-900 hover:bg-black text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
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

      {/* Mobile Fixed Action Bar */}
      <div className="md:hidden fixed bottom-[70px] left-0 right-0 z-40 bg-white border-t border-gray-100 p-2 shadow-upper">
        <div className="flex items-center gap-3">
          {/* Quantity */}
          <div className="flex items-center border border-gray-200 rounded-lg h-10 w-24 shrink-0 bg-gray-50">
            <button
              className="w-8 h-full flex items-center justify-center active:bg-gray-200 rounded-l-lg"
              onClick={() => setCount(Math.max(1, count - 1))}
              disabled={count <= 1}
            >
              <FaMinus className="w-2.5 h-2.5 text-gray-600" />
            </button>
            <div className="flex-1 text-center font-semibold text-sm">{count}</div>
            <button
              className="w-8 h-full flex items-center justify-center active:bg-gray-200 rounded-r-lg"
              onClick={() => setCount(Math.min(10, count + 1))}
              disabled={count >= 10}
            >
              <FaPlus className="w-2.5 h-2.5 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-1 gap-2">
            <Button
              onClick={() => handleCart(count)}
              disabled={stock === 0}
              variant="outline"
              className="flex-1 h-12 text-sm font-bold border-primary text-primary hover:bg-primary/5 rounded-lg disabled:opacity-50 px-2"
            >
              Add to Cart
            </Button>
            <Button
              onClick={() => handleBuyNow(count)}
              disabled={stock === 0}
              className="flex-1 h-12 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded-lg shadow-sm disabled:opacity-50 px-2"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

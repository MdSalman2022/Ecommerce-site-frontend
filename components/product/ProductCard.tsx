import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';
import { WishlistButton } from '@/components/Wishlist';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const encodedName = encodeURIComponent(product.name).replace(/%20/g, '-');
  
  // Calculate display price
  let displayPrice = product.price;
  let originalPrice: number | null = null;
  let discountPercent: number | null = null;
  
  if (product.special && product.discount) {
    originalPrice = product.price;
    displayPrice = Math.round(product.price - (product.price * product.discount / 100));
    discountPercent = product.discount;
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      {/* Image Section */}
      <Link 
        href={`/productDetails/${product._id}/${encodedName}`}
        className="relative block bg-white p-4 aspect-square"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        
        {/* Wishlist Button - Shows on hover */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <WishlistButton productId={product._id} size="sm" />
        </div>
        
        {/* Badges */}
        {discountPercent && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        )}
        
        {product.featured && !discountPercent && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Hot
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 text-sm font-bold uppercase">
              Sold Out
            </span>
          </div>
        )}
      </Link>
      
      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2 flex-grow border-t border-gray-100">
        {/* Product Name */}
        <Link 
          href={`/productDetails/${product._id}/${encodedName}`}
          className="font-medium text-gray-800 hover:text-primary line-clamp-2 text-sm leading-snug min-h-[40px] transition-colors"
        >
          {product.name}
        </Link>

        {/* Category Link */}
        {product.cat && (
          <Link 
            href={`/category/${product.cat.toLowerCase()}`}
            className="text-xs text-primary hover:underline"
          >
            {product.subcat || product.cat}
          </Link>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-primary font-bold text-lg">
            {displayPrice.toLocaleString()}৳
          </span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {originalPrice.toLocaleString()}৳
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton product={product} disabled={isOutOfStock} />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserActivity } from '@/contexts/UserActivityProvider';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WishlistButton({ productId, className, size = 'md' }: WishlistButtonProps) {
  const { user } = useAuth();
  const { wishlist, toggleWishlist: toggleContextWishlist } = useUserActivity();
  const [isLoading, setIsLoading] = useState(false);

  const isInWishlist = wishlist?.includes(productId) ?? false;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.email) {
      toast.error('Please login to use wishlist');
      return;
    }

    setIsLoading(true);
    await toggleContextWishlist(productId);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-200',
        'bg-white/90 hover:bg-white shadow-md hover:shadow-lg',
        'border border-gray-100',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(
          iconSizes[size],
          'transition-all duration-200',
          isInWishlist
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-400'
        )}
      />
    </button>
  );
}

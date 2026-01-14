'use client';

import React, { useState, useEffect } from 'react';
import { Tag, X, Check, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface PromoResult {
  success: boolean;
  discount: number;
  newTotal: number;
  promoCode?: {
    code: string;
    description: string;
    discountType: string;
    discountValue: number;
  };
  error?: string;
}

interface PromoSuggestion {
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  potentialSavings: number;
  requirements: string[];
  gap: {
    amount?: number;
    items?: number;
  };
  progress: number;
  isUnlocked: boolean;
}

interface CartItem {
  productId: string;
  categoryIds: string[];
  price: number;
  quantity: number;
}

interface PromoCodeInputProps {
  orderTotal: number;
  itemCount: number;
  categoryIds: string[];
  productIds: string[];
  cartItems: CartItem[];
  onApply: (discount: number, code: string) => void;
  onRemove: () => void;
  appliedCode?: string;
  appliedDiscount?: number;
}

export default function PromoCodeInput({
  orderTotal,
  itemCount,
  categoryIds,
  productIds,
  cartItems,
  onApply,
  onRemove,
  appliedCode,
  appliedDiscount,
}: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<PromoSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  // Fetch suggestions when cart changes
  useEffect(() => {
    if (!appliedCode && orderTotal > 0) {
      fetchSuggestions();
    }
  }, [orderTotal, itemCount, categoryIds, productIds, appliedCode]);

  const fetchSuggestions = async () => {
    try {
      const categoryParam = categoryIds.join(',');
      const productParam = productIds.join(',');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/suggestions?cartTotal=${orderTotal}&itemCount=${itemCount}&categoryIds=${categoryParam}&productIds=${productParam}`
      );
      const data = await res.json();
      if (data.success) {
        // Sort suggestions: Unlocked first, then by highest progress
        const sorted = (data.suggestions || []).sort((a: PromoSuggestion, b: PromoSuggestion) => {
          if (a.isUnlocked && !b.isUnlocked) return -1;
          if (!a.isUnlocked && b.isUnlocked) return 1;
          return b.progress - a.progress;
        });
        setSuggestions(sorted);
      }
    } catch (err) {
      console.error('Failed to fetch promo suggestions:', err);
    }
  };

  const handleValidate = async (codeToUse?: string) => {
    const codeToValidate = codeToUse || code;
    
    if (!codeToValidate.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: codeToValidate.trim(), 
          orderTotal,
          cartItems 
        }),
      });

      const data: PromoResult = await res.json();

      if (data.success) {
        onApply(data.discount, codeToValidate.trim().toUpperCase());
        setCode('');
        toast.success(`Applied! Saved ৳${data.discount.toLocaleString()}`);
      } else {
        setError(data.error || 'Invalid code');
        toast.error(data.error || 'Invalid promo code');
      }
    } catch (err) {
      setError('Failed to validate');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuggestion = (suggestionCode: string) => {
    setCode(suggestionCode);
    handleValidate(suggestionCode);
  };

  const handleRemoveCode = () => {
    onRemove();
    setCode('');
    setError('');
    toast.success('Code removed');
  };

  // If a code is already applied
  if (appliedCode && appliedDiscount) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-white p-1.5 rounded-full">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-green-800 text-sm">
                {appliedCode}
              </p>
              <p className="text-xs text-green-600">
                You saved ৳{appliedDiscount.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveCode}
            className="text-green-600 hover:text-green-800 p-1 opacity-70 hover:opacity-100"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Tag className="w-3 h-3" />
          Promo Code
        </label>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="ENTER CODE"
              className={cn(
                "uppercase h-9 text-sm",
                error ? 'border-red-300 focus-visible:ring-red-200' : ''
              )}
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            />
          </div>
          <Button
            onClick={() => handleValidate()}
            disabled={isLoading || !code.trim()}
            size="sm"
            className="bg-primary hover:bg-primary/90 h-9 px-4"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              'Apply'
            )}
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>

      {/* Suggestions Slider */}
      {suggestions.length > 0 && showSuggestions && (
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-purple-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Available Offers</span>
            </div>
          </div>

          <div className="overflow-hidden -mx-1" ref={emblaRef}>
            <div className="flex touch-pan-y pl-1">
              {suggestions.map((suggestion, idx) => (
                <div 
                  key={idx} 
                  className="flex-[0_0_70%] sm:flex-[0_0_45%] min-w-0 pr-2" 
                >
                  <div 
                    className={cn(
                      "h-full rounded-lg border p-2.5 transition-colors relative group flex flex-col justify-between",
                      suggestion.isUnlocked 
                        ? "bg-purple-50/50 border-purple-200 hover:border-purple-300"
                        : "bg-gray-50/50 border-gray-200"
                    )}
                  >
                    <div className="mb-2">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-xs truncate" title={suggestion.code}>
                          {suggestion.code}
                        </span>
                        {suggestion.isUnlocked && (
                          <span className="shrink-0 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                            READY
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 leading-tight line-clamp-2 min-h-[2.5em]">
                        {suggestion.description || `Save ${suggestion.discountType === 'percentage' ? suggestion.discountValue + '%' : '৳' + suggestion.discountValue}`}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-end text-[10px]">
                        <span className="font-medium text-gray-700 truncate max-w-[70%]">
                           {suggestion.isUnlocked ? (
                             <span className="text-green-600 flex items-center gap-1">
                               <Check className="w-3 h-3" /> Save ৳{Math.round(suggestion.potentialSavings)}
                             </span>
                           ) : (
                             <span className="text-gray-600 flex items-center gap-1">
                               {suggestion.gap?.amount ? (
                                  <>Add ৳{suggestion.gap.amount}</>
                               ) : (
                                  <>Add {suggestion.gap?.items} items</>
                               )}
                             </span>
                           )}
                        </span>
                        <span className="text-purple-600 font-bold">
                          {Math.round(suggestion.progress)}%
                        </span>
                      </div>
                      
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            suggestion.isUnlocked ? "bg-green-500" : "bg-purple-500"
                          )}
                          style={{ width: `${suggestion.progress}%` }}
                        />
                      </div>

                      {suggestion.isUnlocked && (
                        <Button
                          size="sm"
                          onClick={() => handleApplySuggestion(suggestion.code)}
                          className="w-full h-6 text-[10px] bg-purple-600 hover:bg-purple-700 mt-1"
                        >
                          Apply Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

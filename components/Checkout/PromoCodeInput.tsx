'use client';

import React, { useState } from 'react';
import { Tag, X, Check, Loader2, Percent, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

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

interface PromoCodeInputProps {
  orderTotal: number;
  onApply: (discount: number, code: string) => void;
  onRemove: () => void;
  appliedCode?: string;
  appliedDiscount?: number;
}

export default function PromoCodeInput({
  orderTotal,
  onApply,
  onRemove,
  appliedCode,
  appliedDiscount,
}: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = async () => {
    if (!code.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), orderTotal }),
      });

      const data: PromoResult = await res.json();

      if (data.success) {
        onApply(data.discount, code.trim().toUpperCase());
        setCode('');
        toast.success(`Promo code applied! You saved ৳${data.discount.toLocaleString()}`);
      } else {
        setError(data.error || 'Invalid promo code');
        toast.error(data.error || 'Invalid promo code');
      }
    } catch (err) {
      setError('Failed to validate promo code');
      toast.error('Failed to validate promo code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCode = () => {
    onRemove();
    setCode('');
    setError('');
    toast.success('Promo code removed');
  };

  // If a code is already applied
  if (appliedCode && appliedDiscount) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white p-2 rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-green-800">
                {appliedCode}
              </p>
              <p className="text-sm text-green-600">
                You save ৳{appliedDiscount.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveCode}
            className="text-green-600 hover:text-green-800 p-1"
            title="Remove promo code"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Tag className="w-4 h-4" />
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
            placeholder="Enter promo code"
            className={`uppercase ${error ? 'border-red-300' : ''}`}
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
          />
          {code && !isLoading && (
            <button
              onClick={() => setCode('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleValidate}
          disabled={isLoading || !code.trim()}
          className="bg-primary hover:bg-primary/90 px-6"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Apply'
          )}
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Available Codes Teaser */}
      <p className="text-xs text-gray-500 flex items-center gap-1">
        <Gift className="w-3 h-3" />
        Try: WELCOME10, SAVE20
      </p>
    </div>
  );
}

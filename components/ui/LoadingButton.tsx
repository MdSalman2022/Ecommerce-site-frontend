"use client";

import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  children,
  isLoading,
  loadingText,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn("relative transition-all active:scale-[0.98]", className)}
      disabled={isLoading || disabled}
      {...props}
    >
      <div className={cn(
        "flex items-center justify-center gap-2 transition-opacity",
        isLoading ? "opacity-0 invisible" : "opacity-100 visible"
      )}>
        {children}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          {loadingText && (
            <span className="text-sm font-medium animate-pulse">
              {loadingText}
            </span>
          )}
        </div>
      )}
    </Button>
  );
}

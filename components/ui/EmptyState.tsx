"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-card rounded-2xl border border-dashed border-gray-200 dark:border-gray-800",
      className
    )}>
      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        {description}
      </p>
      {actionLabel && actionLink && (
        <Link href={actionLink}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}

'use client';

import { Suspense } from 'react';
import Register from '@/components/Shared/Register/Register';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
      <Register />
    </Suspense>
  );
}

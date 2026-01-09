'use client';

import { Suspense } from 'react';
import Login from '@/components/Shared/Login/Login';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
      <Login />
    </Suspense>
  );
}

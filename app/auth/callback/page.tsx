'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

/**
 * OAuth Callback Page
 * Handles redirect from Google/Facebook OAuth
 * The backend sets cookies and redirects here with ?success=true
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const success = searchParams.get('success');
      const error = searchParams.get('error');

      if (success === 'true') {
        // OAuth successful, refresh user data
        await refreshUser();
        router.push('/');
      } else if (error) {
        // OAuth failed
        router.push(`/login?error=${error}`);
      } else {
        // Unknown state, redirect to home
        router.push('/');
      }
    };

    handleCallback();
  }, [searchParams, refreshUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

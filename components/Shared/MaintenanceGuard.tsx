'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useAuth } from '@/contexts/AuthProvider';

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const { settings, isLoading } = useSiteSettings();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !settings) return;

    const isMaintenanceMode = settings.maintenance?.enabled;
    const isAdmin = user && (user.role === 'admin' || user.role === 'moderator');
    
    // Public paths that should remain accessible even during maintenance
    const isPublicPath = [
      '/maintenance',
      '/login',
      '/register',
      '/dashboard', // Dashboard usually has its own auth guard, but allow it here to avoid blocking admin
    ].some(path => pathname.startsWith(path));

    if (isMaintenanceMode && !isAdmin && !isPublicPath) {
      router.push('/maintenance');
    }
    
    // If not in maintenance, but on maintenance page, redirect to home
    if (!isMaintenanceMode && pathname === '/maintenance') {
      router.push('/');
    }

  }, [settings, user, pathname, router, isLoading]);

  return <>{children}</>;
}

'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import QueryProvider from './QueryProvider';
import AuthProvider from '@/contexts/AuthProvider';
import { ShopProvider } from '@/contexts/ShopProvider';
import { SearchProvider } from '@/contexts/SearchProvider';
import { UserActivityProvider } from '@/contexts/UserActivityProvider';
import { UIProvider } from '@/contexts/UIProvider';
import MaintenanceGuard from '@/components/Shared/MaintenanceGuard';
import StripeProvider from './StripeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <UIProvider>
        <AuthProvider>
          <ShopProvider>
            <SearchProvider>
              <UserActivityProvider>
                <StripeProvider>
                  <MaintenanceGuard>
                    {children}
                  </MaintenanceGuard>
                  <Toaster position="top-center" reverseOrder={false} />
                </StripeProvider>
              </UserActivityProvider>
            </SearchProvider>
          </ShopProvider>
        </AuthProvider>
      </UIProvider>
    </QueryProvider>
  );
}

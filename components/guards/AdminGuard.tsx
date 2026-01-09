'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { Loader2 } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace('/login');
            return;
        }

        if (!['admin', 'moderator'].includes(user.role)) {
            router.replace('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50/50 backdrop-blur-sm z-50">
                <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium text-gray-500">Verifying permissions...</p>
                </div>
            </div>
        );
    }

    if (!user || !['admin', 'moderator'].includes(user.role)) return null;
    
    return <>{children}</>;
}

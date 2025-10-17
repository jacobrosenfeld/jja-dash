'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

type AuthLevel = 'none' | 'user' | 'admin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLevel?: AuthLevel;
}

export default function ProtectedRoute({
  children,
  requiredLevel = 'user'
}: ProtectedRouteProps) {
  const { authLevel, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (authLevel === 'none') {
        router.push('/login');
        return;
      }

      if (requiredLevel === 'admin' && authLevel !== 'admin') {
        router.push('/');
        return;
      }
    }
  }, [authLevel, isLoading, requiredLevel, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (authLevel === 'none') {
    return null; // Will redirect
  }

  if (requiredLevel === 'admin' && authLevel !== 'admin') {
    return null; // Will redirect
  }

  return <>{children}</>;
}
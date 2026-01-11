'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'aluno' | 'tutor';
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { isAuthenticated, userType, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(routes.login);
      return;
    }

    // if (requiredUserType && userType !== requiredUserType) {
    //   const redirectPath = userType === 'aluno' ? routes.aluno.dashboard : routes.tutor.dashboard;
    //   router.push(redirectPath);
    // }
  }, [isAuthenticated, userType, requiredUserType, isLoading, router]);

  if (isLoading || !isAuthenticated || (requiredUserType && userType !== requiredUserType)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return <>{children}</>;
}

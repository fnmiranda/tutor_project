'use client';

import { useRouter } from 'next/navigation';
import { routes } from '@/routes/routes';
import { useAuth } from '@/context/authContext';

export function useNavigation() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const navigateTo = (path: string) => {
    if (routes.isProtectedRoute(path) && !isAuthenticated) {
      router.push(routes.login);
      return;
    }
    router.push(path);
  };

  return {
    navigateTo,
    goToDashboard: (type: 'aluno' | 'tutor') => navigateTo(routes[type].dashboard),
    goToProfile: (type: 'aluno' | 'tutor') => navigateTo(routes[type].perfil),
    goToLogin: () => router.push(routes.login),
  };
}

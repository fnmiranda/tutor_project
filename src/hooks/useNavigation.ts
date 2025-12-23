'use client';

import { routes } from '@/routes/routes';
import { useAuth } from '@/context/authContext';

export function useNavigation() {
  const { isAuthenticated } = useAuth();

  const navigateTo = (path: string) => {
    if (routes.isProtectedRoute(path) && !isAuthenticated) {
      routes.navigateTo.login();
      return false;
    }
    window.location.href = path;
    return true;
  };

  return {
    navigateTo,
    goToDashboard: () => navigateTo(routes.aluno.dashboard),
    goToProfile: () => navigateTo(routes.aluno.perfil),
    goToLogin: () => navigateTo(routes.login),
  };
}

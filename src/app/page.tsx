'use client';

import { useEffect } from 'react';
import { routes } from '@/routes/routes';

export default function HomePage() {
  useEffect(() => {
    // Simula verificação de autenticação
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

    if (isLoggedIn) {
      routes.navigateTo.alunoDashboard();
    } else {
      routes.navigateTo.login();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecionando...</p>
    </div>
  );
}

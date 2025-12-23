'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Simula verificação de autenticação
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');

    if (savedUser && savedRole) {
      console.log('Usuário encontrado no localStorage, redirecionando...');
      router.push(`/${savedRole}/dashboard`);
    } else {
      console.log('Nenhum usuário logado, redirecionando para login');
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
        <p className="text-gray-600">Redirecionando para a página correta</p>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation'; // ADICIONE ESTE IMPORT

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'aluno' | 'professor';
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { isAuthenticated, userType, isLoading } = useAuth();
  const router = useRouter(); // USE O ROUTER DO NEXT

  useEffect(() => {
    // Não faz nada enquanto carrega
    if (isLoading) return;

    console.log('🔒 Verificando proteção:', {
      isAuthenticated,
      userType,
      requiredUserType,
      isLoading
    });

    // Se não está autenticado, redireciona para login
    if (!isAuthenticated) {
      console.log('❌ Não autenticado, redirecionando para login...');
      router.push('/login');
      return;
    }

    // Se precisa de tipo específico e não corresponde
    if (requiredUserType && userType !== requiredUserType) {
      console.log(`❌ Tipo de usuário incorreto. Esperado: ${requiredUserType}, Atual: ${userType}`);

      // Redireciona para dashboard correto
      if (userType === 'aluno') {
        router.push('/aluno/dashboard');
      } else if (userType === 'professor') {
        router.push('/professor/dashboard');
      }
      return;
    }

    console.log('✅ Acesso permitido!');
  }, [isAuthenticated, userType, requiredUserType, isLoading, router]);

  // Enquanto carrega, mostra loading
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  // Se não está autenticado, não mostra nada (já redirecionou)
  if (!isAuthenticated) {
    return null;
  }

  // Se precisa de tipo específico e não corresponde, não mostra nada
  if (requiredUserType && userType !== requiredUserType) {
    return null;
  }

  // Tudo ok, mostra os children
  return <>{children}</>;
}

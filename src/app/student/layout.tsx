'use client';

import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { userData, userType, logout } = useAuth();
  const router = useRouter();
  /*
  useEffect(() => {
      if (userType !== 'aluno') {
  
        console.log('❌ Acesso negado. UserType atual:', userType);
        alert('Acesso restrito a alunos!');
        router.push('/login');
      }
    }, [router, userType]);
  */


  return (
    <div className="bg-gray-50">
      {/* Navbar do Aluno */}


      {/* Conteúdo Principal */}
      <main className=" flex-1 p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Área do Aluno - Sistema Educacional © 2024</p>
      </footer>
    </div>
  );
}

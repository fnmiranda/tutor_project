'use client';

import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { userData, userType, logout } = useAuth();
  const router = useRouter();
  /*
    useEffect(() => {
      if (userType !== 'professor') {
        console.log('❌ Acesso negado. UserType atual:', userType);
        alert('Acesso restrito a professores!');
        router.push('/login');
      }
    }, [router, userType]);
  */
  const handleLogout = () => {
    logout();
  };

  if (userType !== 'professor') {
    return null;
  }

  return (
    <div className=" bg-gray-50">
      {/* Navbar do Professor */}


      {/* Conteúdo Principal */}
      <main className="container p-2">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Área do Professor - Sistema Educacional © 2024</p>
      </footer>
    </div>
  );
}

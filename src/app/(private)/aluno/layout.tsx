'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import TopBar from '@/components/TopBar/TabBar';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentLayout({ children }: { children: React.ReactNode }) {

  let quant = 30

  return (

    <ProtectedRoute requiredUserType='aluno'>
      <div className="h-full w-full flex flex-col bg-gray-50">
        {/* Navbar do Aluno */}
        <TopBar saldo={quant} />

        {/* Conteúdo Principal */}
        <main className="flex-1 px-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-[#8b2cf5] to-[#611bb3] text-white p-4 text-center">
          <p>Área do Aluno - Sistema Educacional Tunno © 2024</p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}

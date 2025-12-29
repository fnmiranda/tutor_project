'use client';

import CabecalhoAluno from '@/components/alunoDashboard/CabecalhoAluno';
import ProtectedRoute from '@/components/ProtectedRoute';
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
        <header>
          <CabecalhoAluno quantidade={quant} nomeAluno="Lucas Quiuqui" />
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 px-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>Área do Aluno - Sistema Educacional Tunno © 2024</p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}

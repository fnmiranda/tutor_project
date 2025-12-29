'use client';

import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";
import TopBar from '@/components/professorDashboard/TopBar';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let saldo = 100;
  return (
    <ProtectedRoute requiredUserType='tutor'>
      <div className="flex flex-col w-full h-full bg-gray-50" >

        {/* Navbar do Professor */}
        <TopBar saldo={saldo} nomeProfessor="Lucas Quiuqui" />

        {/* Conteúdo Principal */}
        <main className="flex-1 p-2 mt-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>Área do Professor - Sistema Educacional Tunno © 2024</p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}

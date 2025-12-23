"use client";
import React from "react";
import Link from "next/link"; // Usado para navegação entre páginas
import "./TopBar.css";
import { useAuth } from '@/context/authContext';

interface TopBarProps {
  saldo: number;
  nomeProfessor: string;
}

export default function TopBar({ saldo, nomeProfessor }: TopBarProps) {

  const { userData, userType, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="topbar">
      <div className="topbar-container">

        {/* 1. LADO ESQUERDO: Logo e Menu */}
        <div className="topbar-left">
          <div className="brand-logo">🎓 Tunno</div>

          <nav className="topbar-nav">
            <Link href="/teacher/dashboard" className="nav-link active">Home</Link>
            <Link href="/teacher/finances" className="nav-link">Financeiro</Link>
            <Link href="/teacher/students" className="nav-link">Meus Alunos</Link>
          </nav>
        </div>

        {/* 2. LADO DIREITO: Dinheiro e Perfil */}
        <div className="topbar-right">

          {/* Mostrador de Dinheiro */}
          <div className="balance-badge">
            <span className="balance-label">Saldo</span>
            <span className="balance-value">R$ {saldo.toFixed(2).replace('.', ',')}</span>
          </div>

          {/* Divisor Vertical */}
          <div className="divider"></div>

          {/* Área do Usuário */}
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{nomeProfessor}</span>
              <Link href="/teacher/perfil" className="user-settings-link">Configurações</Link>
            </div>
            {/* Avatar (Círculo com inicial) */}
            <div className="user-avatar" onClick={handleLogout}>
              {nomeProfessor.charAt(0)}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

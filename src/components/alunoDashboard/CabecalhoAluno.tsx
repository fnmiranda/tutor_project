import * as React from "react";
import Link from "next/link";
import './cabecalhoAluno.css';

import { useAuth } from '@/context/authContext';

// Define os tipos para as propriedades que o componente espera receber.
interface CabecalhoAlunoProps {
    quantidade?: number;
    nomeAluno: string;
};

/**
 * Componente de cabeçalho para o dashboard do aluno.
 * Contém a navegação principal (abas), informações do utilizador e o menu mobile.
 */
export default function CabecalhoAluno({ quantidade = 150, nomeAluno }: CabecalhoAlunoProps) {
    const { userData, userType, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };


    return (
        <div className="topbar">
            <div className="topbar-container">

                {/* 1. LADO ESQUERDO: Logo e Menu */}
                <div className="topbar-left">
                    <div className="brand-logo">🎓 Tunno</div>

                    <nav className="topbar-nav">
                        <Link href="/aluno/dashboard" className="nav-link active">Home</Link>
                        <Link href="/aluno/perfil" className="nav-link">Perfil</Link>
                    </nav>
                </div>

                {/* 2. LADO DIREITO: Dinheiro e Perfil */}
                <div className="topbar-right">

                    {/* Mostrador de Dinheiro */}
                    <div className="balance-badge">
                        <span className="balance-label">N° Dúvidas</span>
                        <span className="balance-value">{quantidade}</span>
                    </div>

                    {/* Divisor Vertical */}
                    <div className="divider"></div>

                    {/* Área do Usuário */}
                    <div className="user-profile">
                        <div className="user-info">
                            <span className="user-name">{nomeAluno}</span>
                            <Link href="/aluno/perfil" className="user-settings-link">Configurações</Link>
                        </div>
                        {/* Avatar (Círculo com inicial) */}
                        <div className="user-avatar" onClick={handleLogout}>
                            {nomeAluno.charAt(0)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

};


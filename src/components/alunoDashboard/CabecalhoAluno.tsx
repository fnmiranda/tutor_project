import * as React from "react";
import Link from "next/link";
import './cabecalhoAluno.css';

import { useAuth } from '@/context/authContext';

interface Duvida {
    id: number;
    titulo: string;
    materia: string;
    status: string;
    conteudo: string;
    respondidoPor?: string | null;
    tempo: string;
}

// Define os tipos para as propriedades que o componente espera receber.
type CabecalhoAlunoProps = {
    activeTab: string;
    setActiveTab: (tab: "duvidas" | "perfil") => void;
    dados: { nome: string; email: string; duvidas: Duvida[] }
};

/**
 * Componente de cabeçalho para o dashboard do aluno.
 * Contém a navegação principal (abas), informações do utilizador e o menu mobile.
 */
const CabecalhoAluno = ({ activeTab, setActiveTab, dados }: CabecalhoAlunoProps) => {
    const { userData, userType, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    const handleTabChange = (tab: "duvidas" | "perfil") => {
        setActiveTab(tab);
    };

    return (
        <header className="topbar">
            <div className="topbar-container">

                {/* 1. LADO ESQUERDO: Logo e Menu */}
                <div className="topbar-left">
                    <div className="brand-logo">🎓 Tunno</div>

                    <nav className="topbar-nav">
                        <Link href="/student/dashboard" className="nav-link active">Home</Link>
                        <Link href="/student/perfil" className="nav-link">Perfil</Link>
                    </nav>
                </div>

                {/* 2. LADO DIREITO: Dinheiro e Perfil */}
                <div className="topbar-right">

                    {/* Mostrador de Dinheiro */}
                    <div className="balance-badge">
                        <span className="balance-label">N° Dúvidas</span>
                        <span className="balance-value">{dados.duvidas.length}</span>
                    </div>

                    {/* Divisor Vertical */}
                    <div className="divider"></div>

                    {/* Área do Usuário */}
                    <div className="user-profile">
                        <div className="user-info">
                            <span className="user-name">{dados.nome}</span>
                            <Link href="/student/perfil" className="user-settings-link">Configurações</Link>
                        </div>
                        {/* Avatar (Círculo com inicial) */}
                        <div className="user-avatar" onClick={handleLogout}>
                            {dados.nome.charAt(0)}
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );

};

export default CabecalhoAluno;

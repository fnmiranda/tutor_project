import * as React from "react";
// Importe seu novo arquivo CSS
import './cabecalhoAluno.css';

// Define os tipos para as propriedades que o componente espera receber.
type CabecalhoAlunoProps = {
    activeTab: string;
    setActiveTab: (tab: "duvidas" | "perfil") => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
    dados: {nome:string; email:string;}
};

/**
 * Componente de cabeçalho para o dashboard do aluno.
 * Contém a navegação principal (abas), informações do utilizador e o menu mobile.
 */
const CabecalhoAluno = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, dados}: CabecalhoAlunoProps) => {

    const handleTabChange = (tab: "duvidas" | "perfil") => {
        setActiveTab(tab);
        setMobileMenuOpen(false); // Fecha o menu mobile ao selecionar uma opção
    };

    return (
        // Usa as classes semânticas definidas no arquivo CSS
        <header className="cabecalho-aluno">
            <div className="container">
                <div className="navbar">
                    {/* Secção do Logo e Título */}
                    <div className="logo-section">
                        <div className="logo-container">
                            {/* Em produção, use uma imagem real. Placeholder para desenvolvimento. */}
                            <img src="https://placehold.co/60x60/E2E8F0/4A5568?text=Logo" alt="Logo" className="logo-img" />
                            <span className="logo-text">TiraDúvidas</span>
                        </div>
                    </div>

                    {/* Navegação para Desktop */}
                    <div className="nav-desktop">
                        <button
                            onClick={() => handleTabChange("duvidas")}
                            className={`nav-button ${activeTab === "duvidas" ? "active" : ""}`}
                        >
                            Minhas Dúvidas
                        </button>
                        <button
                            onClick={() => handleTabChange("perfil")}
                            className={`nav-button ${activeTab === "perfil" ? "active" : ""}`}
                        >
                            Meu Perfil
                        </button>
                        <button className="nav-button">
                            Configurações
                        </button>
                    </div>

                    {/* Secção do Perfil e Botão do Menu Mobile */}
                    <div className="perfil-section">
                        <div className="perfil-desktop">
                            <span className="perfil-nome">{dados.nome}</span>
                            <div className="perfil-avatar-container">
                                <img src="https://placehold.co/32x32/E2E8F0/4A5568?text=S" alt="Foto do Aluno" className="perfil-avatar" />
                            </div>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="menu-mobile-toggle"
                            aria-label="Abrir menu"
                        >
                            <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile Expansível */}
            {mobileMenuOpen && (
                <div className="menu-mobile-dropdown">
                    <div className="menu-mobile-nav">
                        <button
                            onClick={() => handleTabChange("duvidas")}
                            className={`menu-mobile-button ${activeTab === "duvidas" ? "active" : ""}`}
                        >
                            Minhas Dúvidas
                        </button>
                        <button
                            onClick={() => handleTabChange("perfil")}
                            className={`menu-mobile-button ${activeTab === "perfil" ? "active" : ""}`}
                        >
                            Meu Perfil
                        </button>
                        <button className="menu-mobile-button">
                            Configurações
                        </button>
                    </div>
                    <div className="menu-mobile-perfil-container">
                        <div className="menu-mobile-perfil">
                            <div className="perfil-avatar-container">
                                <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=JP" alt="Foto do Aluno" className="perfil-avatar-mobile" />
                            </div>
                            <div className="perfil-info-mobile">
                                <div className="perfil-nome-mobile">${dados.nome}</div>
                                <div className="perfil-email-mobile">%{dados.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default CabecalhoAluno;

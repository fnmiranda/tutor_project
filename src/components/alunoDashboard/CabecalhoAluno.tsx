import * as React from "react";

// Define os tipos para as propriedades que o componente espera receber.
// Isto garante que 'activeTab' seja uma string e 'setActiveTab' seja uma função de estado do React.
type CabecalhoAlunoProps = {
    activeTab: string;
    setActiveTab: (tab: "duvidas" | "perfil") => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
};

/**
 * Componente de cabeçalho para o dashboard do aluno.
 * Contém a navegação principal (abas), informações do utilizador e o menu mobile.
 */
const CabecalhoAluno = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }: CabecalhoAlunoProps) => {

    const handleTabChange = (tab: "duvidas" | "perfil") => {
        setActiveTab(tab);
        setMobileMenuOpen(false); // Fecha o menu mobile ao selecionar uma opção
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Secção do Logo e Título */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            {/* Em produção, use uma imagem real. Placeholder para desenvolvimento. */}
                            <img src="https://placehold.co/60x60/E2E8F0/4A5568?text=Logo" alt="Logo" className="rounded-full" />
                            <span className="ml-3 text-xl font-semibold text-gray-900">TiraDúvidas</span>
                        </div>
                    </div>

                    {/* Navegação para Desktop */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        <button onClick={() => handleTabChange("duvidas")} className={`px-3 py-2 rounded-md text-sm font-medium ${ activeTab === "duvidas" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900" }`}>
                            Minhas Dúvidas
                        </button>
                        <button onClick={() => handleTabChange("perfil")} className={`px-3 py-2 rounded-md text-sm font-medium ${ activeTab === "perfil" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900" }`}>
                            Meu Perfil
                        </button>
                        <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            Configurações
                        </button>
                    </div>

                    {/* Secção do Perfil e Botão do Menu Mobile */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center">
                            <span className="mr-3 text-sm text-gray-700">João Pereira</span>
                            <div className="relative">
                                <img src="https://placehold.co/32x32/E2E8F0/4A5568?text=JP" alt="Foto do Aluno" className="rounded-full" />
                            </div>
                        </div>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none" aria-label="Abrir menu">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile Expansível */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => handleTabChange("duvidas")} className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${ activeTab === "duvidas" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900" }`}>
                            Minhas Dúvidas
                        </button>
                        <button onClick={() => handleTabChange("perfil")} className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${ activeTab === "perfil" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900" }`}>
                            Meu Perfil
                        </button>
                        <button className="block px-3 py-2 rounded-md text-base font-medium w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            Configurações
                        </button>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=JP" alt="Foto do Aluno" className="rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">João Pereira</div>
                                <div className="text-sm font-medium text-gray-500">joao.pereira@aluno.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default CabecalhoAluno;

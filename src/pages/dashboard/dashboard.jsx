"use client";
import { useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import dynamic from "next/dynamic";

const ProfileForm = dynamic(
  () => import("../../components/perfil/ProfileForm"),
  { ssr: false }
);

const ProfessorDashboard = () => {
  const [activeTab, setActiveTab] = useState("duvidas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dados de exemplo
  const stats = [
    { value: 47, label: "Dúvidas Respondidas" },
    { value: 8, label: "Dúvidas Ativas" },
    { value: 23, label: "Alunos Ajudados" },
  ];

  const duvidas = [
    {
      id: 1,
      titulo: "Dúvida sobre derivadas",
      materia: "Matemática",
      status: "Nova mensagem",
      conteudo:
        "Não estou conseguindo entender como calcular derivadas de funções compostas.",
      aluno: "Ana Silva",
      tempo: "212d atrás",
      respondida: false,
      fechada: false,
    },
    {
      id: 2,
      titulo: "Leis de Newton",
      materia: "Física",
      status: "Respondido",
      conteudo:
        "Preciso de ajuda para entender a aplicação das leis de Newton em exercícios.",
      aluno: "Carlos Santos",
      tempo: "211d atrás",
      respondida: true,
      fechada: false,
    },
    {
      id: 3,
      titulo: "Análise sintática",
      materia: "Português",
      status: "Fechada",
      conteudo:
        "Tenho dificuldade em identificar sujeito e predicado em frases complexas.",
      aluno: "Maria Costa",
      tempo: "212d atrás",
      respondida: false,
      fechada: true,
    },
  ];

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Cabeçalho */}
        <header className="bg-white shadow-sm gap-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex justify-between h-16">
              {/* Logo e título */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <span className="ml-3 text-xl font-semibold text-gray-900">
                    TiraDúvidas
                  </span>
                </div>
              </div>

              {/* Menu Desktop */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <button
                  onClick={() => setActiveTab("duvidas")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "duvidas"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  Dúvidas
                </button>
                <button
                  onClick={() => setActiveTab("perfil")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "perfil"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  Perfil
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Configurações
                </button>
              </div>

              {/* Perfil e Mobile Menu Button */}
              <div className="flex items-center">
                <div className="hidden md:flex items-center">
                  <span className="mr-3 text-sm text-gray-700">
                    Professor Silva
                  </span>
                  <div className="relative">
                    <Image
                      src="/professor-silva.jpg"
                      alt="Professor"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Botão Mobile */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {mobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Menu Mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button
                  onClick={() => {
                    setActiveTab("duvidas");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeTab === "duvidas"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  Dúvidas
                </button>
                <button
                  onClick={() => {
                    setActiveTab("perfil");
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeTab === "perfil"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  Perfil
                </button>
                <button className="block px-3 py-2 rounded-md text-base font-medium w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  Configurações
                </button>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      src="/professor-silva.jpg"
                      alt="Professor"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Professor Silva
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      prof.silva@escola.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
        {/* <header className="mb-8">
            <div className='flex flex-row gap-3'>
                <Image 
                    src={Logo} 
                    alt="Professor Silva"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">MeuGurime - Professor</h1>
                    <p className="text-lg text-gray-600">Bem-vindo, Professor Silva</p>

                </div>

            </div>
        </header> */}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Abas */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("duvidas")}
              className={`py-4 px-1 font-medium text-sm ${
                activeTab === "duvidas"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Dúvidas dos Alunos
            </button>
            <button
              onClick={() => setActiveTab("perfil")}
              className={`py-4 px-1 font-medium text-sm ${
                activeTab === "perfil"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Perfil
            </button>
          </nav>
        </div>
        <div className="mt-6">
          {activeTab === "perfil" ? (
            <ProfileForm />
          ) : (
            <>{/* ...aqui fica sua lista de Dúvidas... */}</>
            /* Tem que mudar o state das duvidas, ela mantem aparecendo no perfil (teste pull request) */
          )}
        </div>

        {/* Lista de Dúvidas */}
        {activeTab === "duvidas" && (
          <>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Dúvidas dos Alunos
              </h2>

              {duvidas.map((duvida) => (
                <div
                  key={duvida.id}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {duvida.titulo}
                    </h3>
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          duvida.status === "Nova mensagem"
                            ? "bg-blue-100 text-blue-800"
                            : duvida.status === "Respondido"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {duvida.status}
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {duvida.materia}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{duvida.conteudo}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`aluno-${duvida.id}`}
                        className="rounded text-blue-600"
                        checked={duvida.respondida}
                        readOnly
                      />
                      <label htmlFor={`aluno-${duvida.id}`}>
                        {duvida.aluno}
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      {!duvida.respondida && !duvida.fechada && (
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Responder
                        </button>
                      )}
                      <span>{duvida.tempo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard;

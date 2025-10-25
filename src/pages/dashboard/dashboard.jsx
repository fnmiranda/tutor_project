"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";

// ---- Dados de exemplo ----
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

export default function ProfessorDashboard() {
  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <header className="bg-white shadow-sm rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo e título */}
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="Logo"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    TiraDúvidas
                  </h1>
                  <p className="text-sm text-gray-500">Painel do Professor</p>
                </div>
              </div>

              {/* Perfil (estático) */}
              <div className="hidden md:flex items-center">
                <span className="mr-3 text-sm text-gray-700">
                  Professor Silva
                </span>
                <Image
                  src="/professor-silva.jpg"
                  alt="Professor"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Estatísticas */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lista de Dúvidas */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dúvidas dos Alunos (PÁGINA PURAMENTE ILUSTRATIVA, NÃO INTEGRE NADA
            NESTA)
          </h2>

          <div className="space-y-4">
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
                      className={
                        `px-2 py-1 text-xs rounded-full ` +
                        (duvida.status === "Nova mensagem"
                          ? "bg-blue-100 text-blue-800"
                          : duvida.status === "Respondido"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800")
                      }
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
                    <label htmlFor={`aluno-${duvida.id}`}>{duvida.aluno}</label>
                  </div>

                  <div className="flex space-x-4 items-center">
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
        </section>
      </div>
    </div>
  );
}

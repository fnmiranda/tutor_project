"use client"; // Diretiva necessária porque este componente utiliza estado (useState).

import * as React from "react";
import dynamic from "next/dynamic";

// Importa os componentes que compõem a página.
import CabecalhoAluno from "../../components/alunoDashboard/CabecalhoAluno";
import DuvidaCard from "../../components/alunoDashboard/DuvidaCard";
import AvaliacaoCard from "../../components/alunoDashboard/AvaliacaoCard";

// O ProfileForm é importado de forma dinâmica para otimizar o carregamento inicial.
// Assume-se que este ficheiro existe em: components/perfil/ProfileForm.tsx
const ProfileForm = dynamic(
  () => import("../../components/perfil/ProfileForm"),
  { ssr: false }
);

// Define as interfaces para a tipagem dos dados.
interface Duvida {
    id: number;
    titulo: string;
    materia: string;
    status: string;
    conteudo: string;
    respondidoPor?: string | null;
    tempo: string;
}

interface Avaliacao {
    id: number;
    avaliado: string;
    nota: number;
    comentario: string;
    data: string;
}

/**
 * Componente principal da página do dashboard do aluno.
 * Orquestra o estado e a renderização dos componentes de cabeçalho e conteúdo.
 */
const AlunoDashboard = () => {
  // Estado para controlar qual aba ("duvidas" ou "perfil") está visível.
  const [activeTab, setActiveTab] = React.useState<"duvidas" | "perfil">("duvidas");
  // Estado para controlar a visibilidade do menu em dispositivos móveis.
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // --- DADOS DE EXEMPLO ---
  // Numa aplicação real, estes dados viriam de uma chamada de API (ex: useEffect).
  const stats = [
    { value: 12, label: "Dúvidas Enviadas" },
    { value: 9, label: "Dúvidas Resolvidas" },
    { value: 3, label: "Dúvidas em Aberto" },
  ];

  const duvidas: Duvida[] = [
    { id: 1, titulo: "Dúvida sobre derivadas", materia: "Matemática", status: "Respondida", conteudo: "Não estou conseguindo entender como calcular derivadas de funções compostas.", respondidoPor: "Prof. Silva", tempo: "2d atrás" },
    { id: 2, titulo: "Ajuda em Leis de Newton", materia: "Física", status: "Aguardando Monitor", conteudo: "Preciso de ajuda para entender a aplicação da segunda lei de Newton.", respondidoPor: null, tempo: "5h atrás" },
    { id: 3, titulo: "Análise sintática de oração", materia: "Português", status: "Fechada", conteudo: "Tive dificuldade em identificar o sujeito e predicado nesta frase, mas o monitor me ajudou!", respondidoPor: "Monitora Bia", tempo: "1 sem atrás" },
  ];

  const avaliacoesEnviadas: Avaliacao[] = [
    { id: 1, avaliado: "Monitora Bia", nota: 5, comentario: "Excelente explicação sobre análise sintática, muito clara e paciente.", data: "1 sem atrás" },
    { id: 2, avaliado: "Prof. Silva", nota: 4, comentario: "O professor ajudou com a dúvida de derivadas, mas a resposta demorou um pouco.", data: "3 sem atrás" },
    { id: 3, avaliado: "Monitor Carlos", nota: 5, comentario: "Muito atencioso e prestativo na resolução dos exercícios de física.", data: "1 mês atrás" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <CabecalhoAluno
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Renderização condicional do conteúdo com base na aba ativa */}
        {activeTab === "duvidas" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Minhas Dúvidas</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors">
                  + Nova Dúvida
                </button>
              </div>
              {duvidas.map((duvida) => (
                <DuvidaCard key={duvida.id} duvida={duvida} />
              ))}
            </div>
          </>
        )}

        {activeTab === "perfil" && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Informações do Perfil
              </h2>
              <ProfileForm />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Minhas Avaliações Enviadas
              </h2>
              <div className="space-y-4">
                {avaliacoesEnviadas.map((avaliacao) => (
                  <AvaliacaoCard key={avaliacao.id} avaliacao={avaliacao} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AlunoDashboard;

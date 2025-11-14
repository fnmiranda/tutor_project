"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import styles from "./aluno.module.css";

import CabecalhoAluno from "../../components/alunoDashboard/CabecalhoAluno";
import DuvidaCard from "../../components/alunoDashboard/DuvidaCard";
import NovaDuvida from "../../components/alunoDashboard/NovaDuvida";
import FiltroCards from "../../components/alunoDashboard/FiltroCards";

const ProfileForm = dynamic(
  () => import("../../components/perfil_professor/ProfileForm"),
  { ssr: false }
);

interface Duvida {
  id: number;
  titulo: string;
  materia: string;
  status: string;
  conteudo: string;
  respondidoPor?: string | null;
  tempo: string;
}

interface Dados {
  nome: string;
  email: string;
  duvidas: Duvida[];
}

// --- DADOS DE EXEMPLO ---
const dados: Dados = {
  nome: "Silva",
  email: "aluno.silva@gmail.com",
  duvidas: [
    {
      "id": 1,
      "titulo": "Dúvida sobre derivadas",
      "materia": "Matemática",
      "status": "Respondida",
      "conteudo": "Não estou conseguindo entender como calcular derivadas de funções compostas.",
      "respondidoPor": "Prof. Silva",
      "tempo": "2d atrás"
    },
    {
      "id": 2,
      "titulo": "Ajuda em Leis de Newton",
      "materia": "Física",
      "status": "Aguardando Monitor",
      "conteudo": "Preciso de ajuda para entender a aplicação da segunda lei de Newton.",
      "respondidoPor": null,
      "tempo": "5h atrás"
    },
    {
      "id": 3,
      "titulo": "Análise sintática de oração",
      "materia": "Português",
      "status": "Fechada",
      "conteudo": "Tive dificuldade em identificar o sujeito e predicado nesta frase, mas o monitor me ajudou!",
      "respondidoPor": "Monitora Bia",
      "tempo": "1 sem atrás"
    },
    {
      "id": 4,
      "titulo": "Revolução Francesa - Causas",
      "materia": "História",
      "status": "Aguardando Monitor",
      "conteudo": "Quais foram os principais fatores econômicos que levaram à Revolução Francesa?",
      "respondidoPor": null,
      "tempo": "20min atrás"
    },
    {
      "id": 5,
      "titulo": "Balanceamento de equação química",
      "materia": "Química",
      "status": "Respondida",
      "conteudo": "Estou com dificuldade no método de oxirredução para balancear esta equação: ...",
      "respondidoPor": "Monitor Carlos",
      "tempo": "1d atrás"
    },
    {
      "id": 6,
      "titulo": "Diferença entre Mitose e Meiose",
      "materia": "Biologia",
      "status": "Respondida",
      "conteudo": "Alguém pode me explicar de forma simples as principais diferenças?",
      "respondidoPor": "Profa. Ana",
      "tempo": "3d atrás"
    },
    {
      "id": 7,
      "titulo": "Problema com 'git push'",
      "materia": "Programação",
      "status": "Aguardando Monitor",
      "conteudo": "Estou recebendo um erro de autenticação ao tentar enviar meu código para o GitHub.",
      "respondidoPor": null,
      "tempo": "1h atrás"
    },
    {
      "id": 8,
      "titulo": "Uso da crase",
      "materia": "Português",
      "status": "Respondida",
      "conteudo": "Quando devo usar crase antes de nomes de lugares? Ex: 'Vou à Bahia' vs 'Vou a Recife'.",
      "respondidoPor": "Monitora Bia",
      "tempo": "6h atrás"
    },
    {
      "id": 9,
      "titulo": "Conceito de Molaridade",
      "materia": "Química",
      "status": "Aguardando Monitor",
      "conteudo": "Não entendi a fórmula de molaridade (M = n/V). O que 'n' representa?",
      "respondidoPor": null,
      "tempo": "45min atrás"
    },
    {
      "id": 10,
      "titulo": "Tempos verbais em Inglês",
      "materia": "Inglês",
      "status": "Fechada",
      "conteudo": "Diferença entre 'Past Simple' e 'Present Perfect'. Já entendi, obrigado!",
      "respondidoPor": "Monitor Dave",
      "tempo": "5d atrás"
    },
    {
      "id": 11,
      "titulo": "Problema com Eletromagnetismo",
      "materia": "Física",
      "status": "Respondida",
      "conteudo": "Como a regra da mão direita funciona para campos magnéticos?",
      "respondidoPor": "Prof. Marcos",
      "tempo": "2d atrás"
    },
    {
      "id": 12,
      "titulo": "Figuras de Linguagem",
      "materia": "Literatura",
      "status": "Aguardando Monitor",
      "conteudo": "Qual a diferença entre metáfora e metonímia? Poderiam dar exemplos?",
      "respondidoPor": null,
      "tempo": "3h atrás"
    },
    {
      "id": 13,
      "titulo": "Instalação do Python",
      "materia": "Programação",
      "status": "Fechada",
      "conteudo": "Não estava conseguindo adicionar o Python ao PATH do Windows, mas consegui resolver reinstalando.",
      "respondidoPor": "Aluno (resolvido)",
      "tempo": "1 sem atrás"
    },
    {
      "id": 14,
      "titulo": "Calculando pH",
      "materia": "Química",
      "status": "Respondida",
      "conteudo": "Como calculo o pH de uma solução de ácido forte? Ex: HCl 0.01M",
      "respondidoPor": "Monitor Carlos",
      "tempo": "8h atrás"
    },
    {
      "id": 15,
      "titulo": "Guerra Fria - Resumo",
      "materia": "História",
      "status": "Aguardando Monitor",
      "conteudo": "Preciso de um resumo dos principais conflitos indiretos da Guerra Fria.",
      "respondidoPor": null,
      "tempo": "1d atrás"
    },
    {
      "id": 16,
      "titulo": "Logaritmos",
      "materia": "Matemática",
      "status": "Aguardando Monitor",
      "conteudo": "Não entendi a propriedade de mudança de base em logaritmos.",
      "respondidoPor": null,
      "tempo": "2h atrás"
    },
    {
      "id": 17,
      "titulo": "Fotossíntese - Fase escura",
      "materia": "Biologia",
      "status": "Respondida",
      "conteudo": "Onde ocorre o Ciclo de Calvin e quais são seus produtos?",
      "respondidoPor": "Profa. Ana",
      "tempo": "4d atrás"
    },
    {
      "id": 18,
      "titulo": "Interpretação de 'Dom Casmurro'",
      "materia": "Literatura",
      "status": "Respondida",
      "conteudo": "Afinal, Capitu traiu ou não Bentinho? Qual a visão da crítica sobre isso?",
      "respondidoPor": "Prof. Jorge",
      "tempo": "1d atrás"
    },
    {
      "id": 19,
      "titulo": "Dúvida sobre 'const' em JavaScript",
      "materia": "Programação",
      "status": "Respondida",
      "conteudo": "Se eu declaro um objeto com 'const', por que consigo alterar suas propriedades?",
      "respondidoPor": "Monitora Gabi",
      "tempo": "9h atrás"
    },
    {
      "id": 20,
      "titulo": "Movimento Uniforme Variado (MUV)",
      "materia": "Física",
      "status": "Aguardando Monitor",
      "conteudo": "Qual equação devo usar para encontrar a velocidade final sem saber o tempo? (Torricelli?)",
      "respondidoPor": null,
      "tempo": "15min atrás"
    }
  ],
};

const AlunoDashboard = () => {
  const [activeTab, setActiveTab] = useState<"duvidas" | "perfil">("duvidas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState("Todas"); 
  
  const handleFiltroChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = evento.target.value;
    setFiltro(novoValor);
  };

  let duvidasEnviadas = 0,
    duvidasResolvidas = 0,
    duvidasAberto = 0;

  for (const duvida of dados.duvidas) {
    duvidasEnviadas++; 
    if (duvida.status === "Respondida" || duvida.status === "Fechada") {
      duvidasResolvidas++;
    } else if (duvida.status === "Aguardando Monitor") {
      duvidasAberto++;
    }
  }

  const stats = [
    {
      value: duvidasEnviadas,
      label: "Enviadas",
      filterValue: "Todas",
    },
    {
      value: duvidasResolvidas,
      label: "Resolvidas",
      filterValue: "Resolvidas", 
    },
    {
      value: duvidasAberto,
      label: "Em Aberto",
      filterValue: "Aguardando Monitor", 
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <CabecalhoAluno
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        dados={dados}
      />

      <main className={styles.mainContent}>
        {activeTab === "duvidas" && (
          <>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.card}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.filterValue === "Todas" ? "Dúvidas Enviadas" : `Dúvidas ${stat.label}`}</p>
                </div>
              ))}
            </div>

            <div className={styles.duvidasSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Minhas Dúvidas</h2>
                <NovaDuvida />
              </div>

              <FiltroCards
                valorSelecionado={filtro}
                aoMudarValor={handleFiltroChange}
                stats={stats}
              />

              {dados.duvidas
                .filter((duvida) => {
                  if (filtro === "Todas") {
                    return true;
                  }
                  if (filtro === "Resolvidas") {
                    return (
                      duvida.status === "Respondida" ||
                      duvida.status === "Fechada"
                    );
                  }
                  return duvida.status === filtro;
                })
                .map((duvida) => (
                  <DuvidaCard key={duvida.id} duvida={duvida} />
                ))}
            </div>
          </>
        )}

        {activeTab === "perfil" && (
          <div className={styles.perfilContainer}>
            <div className={styles.card}>
              <h2
                className={`${styles.sectionTitle} ${styles.sectionTitleMargin}`}
              >
                Informações do Perfil
              </h2>
              <ProfileForm />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AlunoDashboard;
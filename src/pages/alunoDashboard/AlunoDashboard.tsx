"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import styles from "./aluno.module.css";

import CabecalhoAluno from "../../components/alunoDashboard/CabecalhoAluno";
import DuvidaCard from "../../components/alunoDashboard/DuvidaCard";
import AvaliacaoCard from "../../components/alunoDashboard/AvaliacaoCard";
import NovaDuvida from "../../components/alunoDashboard/NovaDuvida";

const ProfileForm = dynamic(
  () => import("../../components/perfil/ProfileForm"),
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

interface Avaliacao {
  id: number;
  avaliado: string;
  nota: number;
  comentario: string;
  data: string;
}


interface Dados {
  nome: string;
  email: string;
  duvidas: Duvida[];
  avaliacoesEnviadas: Avaliacao[];
}


// --- DADOS DE EXEMPLO ---
const dados: Dados ={
  nome: 'Silva', 
  email:'aluno.silva@gmail.com',
  duvidas: [
    { id: 1, titulo: "Dúvida sobre derivadas", materia: "Matemática", status: "Respondida", conteudo: "Não estou conseguindo entender como calcular derivadas de funções compostas.", respondidoPor: "Prof. Silva", tempo: "2d atrás" },
    { id: 2, titulo: "Ajuda em Leis de Newton", materia: "Física", status: "Aguardando Monitor", conteudo: "Preciso de ajuda para entender a aplicação da segunda lei de Newton.", respondidoPor: null, tempo: "5h atrás" },
    { id: 3, titulo: "Análise sintática de oração", materia: "Português", status: "Fechada", conteudo: "Tive dificuldade em identificar o sujeito e predicado nesta frase, mas o monitor me ajudou!", respondidoPor: "Monitora Bia", tempo: "1 sem atrás" },
  ],
  avaliacoesEnviadas: [
    { id: 1, avaliado: "Monitora Bia", nota: 5, comentario: "Excelente explicação sobre análise sintática, muito clara e paciente.", data: "1 sem atrás" },
    { id: 2, avaliado: "Prof. Silva", nota: 4, comentario: "O professor ajudou com a dúvida de derivadas, mas a resposta demorou um pouco.", data: "3 sem atrás" },
    { id: 3, avaliado: "Monitor Carlos", nota: 5, comentario: "Muito atencioso e prestativo na resolução dos exercícios de física.", data: "1 mês atrás" },
  ]
};

const AlunoDashboard = () => {
  const [activeTab, setActiveTab] = useState<"duvidas" | "perfil">("duvidas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let duvidasEnviadas=0, duvidasResolvidas=0, duvidasAberto=0;
  for(let c=0;c<dados.duvidas.length;c++){
    if(dados.duvidas[c].status==="Respondida" || dados.duvidas[c].status==="Fechada"){duvidasEnviadas++; duvidasResolvidas++}
    else if(dados.duvidas[c].status==="Aguardando Monitor"){duvidasEnviadas++; duvidasAberto++}
  }

   const stats = [
    { value: duvidasEnviadas, label: "Dúvidas Enviadas" },
    { value: duvidasResolvidas, label: "Dúvidas Resolvidas" },
    { value: duvidasAberto, label: "Dúvidas em Aberto" },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <CabecalhoAluno
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        dados = {dados}
      />

      <main className={styles.mainContent}>
        {activeTab === "duvidas" && (
          <>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.card}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.duvidasSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Minhas Dúvidas</h2>
                <NovaDuvida/>
              </div>
              {dados.duvidas.map((duvida) => (
                <DuvidaCard key={duvida.id} duvida={duvida} />
              ))}
            </div>
          </>
        )}

        {activeTab === "perfil" && (
          <div className={styles.perfilContainer}>
            <div className={styles.card}>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleMargin}`}>
                Informações do Perfil
              </h2>
              <ProfileForm />
            </div>

            <div className={styles.card}>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleMargin}`}>
                Avaliações Enviadas
              </h2>
              <div className={styles.listContainer}>
                {dados.avaliacoesEnviadas.map((avaliacao) => (
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
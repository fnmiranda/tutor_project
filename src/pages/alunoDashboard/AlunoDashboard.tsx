"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./aluno.module.css";

import { useAuth } from '@/context/authContext';
import NovaDuvida from "../../components/alunoDashboard/NovaDuvida";
import FiltroCards from "../../components/alunoDashboard/FiltroCards";
import DuvidaCard from "../../components/alunoDashboard/DuvidaCard";

// Importamos a tipagem e o mockDB corrigido
import { mockDB, Duvida } from "../../database/mockDatabase";

const ProfileForm = dynamic(
  () => import("../../components/perfil_professor/ProfileForm"),
  { ssr: false }
);

const AlunoDashboard = () => {
  const [activeTab, setActiveTab] = useState<"duvidas" | "perfil">("duvidas");
  const [filtro, setFiltro] = useState("Todas");

  const { userData, isLoading: authLoading } = useAuth();
  const [minhasDuvidas, setMinhasDuvidas] = useState<Duvida[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);

  const handleFiltroChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(evento.target.value);
  };

  useEffect(() => {
    async function carregarDuvidas() {
      // Usamos o ID do usuário logado no contexto para buscar as dúvidas dele
      if (!authLoading && userData?.uid) {
        try {
          const dados = await mockDB.getDuvidasByAluno(userData.uid);
          setMinhasDuvidas(dados);
        } catch (error) {
          console.error("Erro ao carregar dúvidas:", error);
        } finally {
          setLoadingDados(false);
        }
      }
    }
    carregarDuvidas();
  }, [userData, authLoading]);

  // --- CÁLCULO DE ESTATÍSTICAS BASEADO NAS DÚVIDAS DO ALUNO ---
  const duvidasEnviadas = minhasDuvidas.length;
  const duvidasResolvidas = minhasDuvidas.filter(d => d.status === "concluida").length;
  const duvidasAberto = minhasDuvidas.filter(d => d.status === "aberta").length;

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
      filterValue: "aberta", // Alinhado com o status do mock
    },
  ];

  if (authLoading || loadingDados) {
    return <div className={styles.loading}>Carregando painel...</div>;
  }

  return (
    <div style={{ flex: 1, padding: 0, minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          {activeTab === "duvidas" && (
            <>
              <div className={styles.statsGrid}>
                {stats.map((stat) => (
                  <div key={stat.label} className={styles.card}>
                    <p className={styles.statValue}>{stat.value}</p>
                    <p className={styles.statLabel}>
                      {stat.filterValue === "Todas" ? "Dúvidas Enviadas" : `Dúvidas ${stat.label}`}
                    </p>
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

                {minhasDuvidas
                  .filter((duvida) => {
                    if (filtro === "Todas") return true;
                    if (filtro === "Resolvidas") return duvida.status === "concluida";
                    return duvida.status === filtro;
                  })
                  .map((duvida) => (
                    <DuvidaCard key={duvida.id} duvida={duvida} />
                  ))}

                {minhasDuvidas.length === 0 && (
                  <p className={styles.emptyMessage}>Você ainda não possui dúvidas registradas.</p>
                )}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlunoDashboard;

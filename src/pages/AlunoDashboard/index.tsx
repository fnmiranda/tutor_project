"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./aluno.module.css";
import { NovaDuvida, FiltroCards, DuvidaCard } from "@/components/AlunoDashboard";

import { useAuth } from '@/context/authContext';
import { getMinhasDuvidas } from "@/services/duvidas";

import { Duvida } from "@/@types/index"; 

const AlunoDashboard = () => {
  const { userData, isLoading: authLoading } = useAuth();

  const [filtro, setFiltro] = useState("Todas");
  const [minhasDuvidas, setMinhasDuvidas] = useState<Duvida[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);

  const handleFiltroChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(evento.target.value);
  };

  const fetchDuvidas = useCallback(async () => {
    if (userData?.id) {
      try {
        const dados = await getMinhasDuvidas();
        setMinhasDuvidas(dados);
      } catch (error) {
        console.error("Erro ao buscar dúvidas:", error);
      } finally {
        setLoadingDados(false);
      }
    }
  }, [userData?.id]);


  useEffect(() => {
    if (!authLoading){
      fetchDuvidas();
    }
  }, [userData, fetchDuvidas]);

  // Cálculos de estatísticas (agora baseados em dados reais do banco)
  const duvidasEnviadas = minhasDuvidas.length;
  const duvidasResolvidas = minhasDuvidas.filter(d => d.status === "concluida").length;
  const duvidasAberto = minhasDuvidas.filter(d => d.status === "aberta").length;

  const stats = [
    { value: duvidasEnviadas, label: "Enviadas", filterValue: "Todas" },
    { value: duvidasResolvidas, label: "Resolvidas", filterValue: "Resolvidas" },
    { value: duvidasAberto, label: "Em Aberto", filterValue: "aberta" },
  ];

  if (authLoading || loadingDados) {
    return <div className={styles.loading}>Carregando painel seguro...</div>;
  }

  return (
    <div style={{ flex: 1, padding: 0, minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Visão Geral</h1>
            <p className={styles.pageSubtitle}>
              Bem-vindo de volta, {userData?.nome || 'Estudante'}!
            </p>
          </div>

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
                  <NovaDuvida onSucesso={fetchDuvidas} />
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
                  <p className={styles.emptyMessage}>Você ainda não possui dúvidas no banco de dados.</p>
                )}
              </div>
            </>
        </div>
      </div>
    </div>
  );
};

export default AlunoDashboard;

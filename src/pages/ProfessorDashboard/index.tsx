"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Alterado para CSS Modules
import { DoubtCard, StatsCard, StatusFilter } from "@/components/ProfessorDashboard";
import { Duvida } from "@/@types/index"; 
import { getAllDuvidas } from "@/services/duvidas";
import { useAuth } from "@/context/authContext";

const statusPriority = {
  'aberta': 2,
  'em_andamento': 3,
  'concluida': 4
};

export default function ProfessorDashboardPage() {
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const { userData, isLoading: authLoading } = useAuth();
  const [loadingDados, setLoadingDados] = useState(true);
  const [saldo, setSaldo] = useState<number>(150.00);
  const [statusFilter, setStatusFilter] = useState<'aberta' | 'em_andamento' | 'concluida'>('aberta');

  useEffect(() => {
    async function carregarDuvidas() {
      if (!authLoading && userData?.id) {
        try {
          const dados = await getAllDuvidas();
          setDuvidas(dados as Duvida[]);
        } catch (error) {
          console.error("Erro ao carregar dúvidas:", error);
        } finally {
          setLoadingDados(false);
        }
      }
    }
    carregarDuvidas();
  }, [userData, authLoading]);

  if (authLoading || loadingDados) {
    return <div>Carregando painel seguro...</div>;
  }

  // Lógica de filtragem
  const duvidasFiltradas = duvidas.filter(duvida => {
    return duvida.status === statusFilter;
  });

  // Lógica de ordenação
  const duvidasOrdenadas = [...duvidasFiltradas].sort((a, b) => {
    const priorityA = statusPriority[a.status];
    const priorityB = statusPriority[b.status];

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const dateA = a.deadLine.getTime();
    const dateB = b.deadLine.getTime();
    return dateB - dateA;
  });

  // --- Lógica de Estatísticas ---
  const totalDoubts = duvidas.length;
  const totalAnswered = duvidas.filter(d => d.status === 'concluida').length;
  const responseRate = Math.round((totalAnswered / totalDoubts) * 100);
  const materiaComMaisDuvidas = "Cálculo I";
  const totalDuvidasMateria = duvidas.filter(d => d.materia === 'Cálculo I').length;
  const totalAlunos = new Set(duvidas.map(d => d.aluno.nome)).size;
  // ---

  return (
    <div className={styles.container}>
      {/* === SEÇÃO DO CABEÇALHO === */}
      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Visão Geral</h1>
          <p className={styles.pageSubtitle}>
            Bem-vindo de volta, {userData.nome}!
          </p>
        </div>
        <div className={styles.headerActions}>
          {/* Botão para testar o aumento do saldo na TopBar */}
          <button
            className={styles.btnPrimary}
            onClick={() => setSaldo(saldo + 50)}
          >
            + Simular Depósito (R$ 50)
          </button>
        </div>
      </header>

      {/* === SEÇÃO DE ESTATÍSTICAS === */}
      <section className={styles.statsGrid}>
        <StatsCard 
          title="Dúvidas Totais" 
          value={totalDoubts} 
          description="Este mês" 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatsCard 
          title="Taxa de Resposta" 
          value={`${responseRate}%`} 
          description="Dúvidas respondidas" 
          trend={{ value: 5, isPositive: true }} 
        />
        <StatsCard 
          title="Matéria com Mais Dúvidas" 
          value={materiaComMaisDuvidas} 
          description={`${totalDuvidasMateria} dúvidas`} 
          trend={{ value: 15, isPositive: false }} 
        />
        <StatsCard 
          title="Alunos Atendidos" 
          value={totalAlunos} 
          description="Este mês" 
        />
      </section>

      {/* === SEÇÃO DE FILTROS === */}
      <section className={styles.filterSection}>
        <StatusFilter
          activeStatus={statusFilter}
          onChange={setStatusFilter}
        />
      </section>

      {/* === SEÇÃO DO DASHBOARD === */}
      <section className={styles.dashboardSection}>
        <h2 className={styles.sectionTitle}>Gerenciamento de Dúvidas</h2>
        <div className={styles.cardsGridLayout}>
          {duvidasOrdenadas.map((doubt) => (
            <DoubtCard key={doubt.id} doubt={doubt} />
          ))}
        </div>
      </section>
    </div>
  );
}
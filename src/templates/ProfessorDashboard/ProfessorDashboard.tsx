"use client";
import React, { useEffect, useState } from "react";
import styles from "./professorDashboard.module.css";
import {
  DoubtCard,
  StatsCard,
  StatusFilter,
} from "@/components/ProfessorDashboard";
import { Duvida, StatusDuvidaOption } from "@/@types/index";
import { getAllDuvidas } from "@/services/duvidas";
import { useAuth } from "@/context/authContext";
import Loading from "@/components/ui/Spinner";

const statusPriority = {
  aberta: 2,
  em_negociacao: 3,
  aceita: 0,
  concluida: 4,
};

export default function ProfessorDashboardPage() {
  const { userData, isLoading: authLoading } = useAuth();

  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);
  const [saldo, setSaldo] = useState<number>(150.0);

  const [statusFilter, setStatusFilter] =
    useState<StatusDuvidaOption>("aberta");

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
    return (
      <div>
        <Loading message="Aguarde" />
      </div>
    );
  }

  // Lógica de filtragem
  const duvidasFiltradas = duvidas.filter((duvida) => {
    return duvida.status === statusFilter;
  });

  // Lógica de ordenação
  const duvidasOrdenadas = [...duvidasFiltradas].sort((a, b) => {
    const priorityA = statusPriority[a.status];
    const priorityB = statusPriority[b.status];

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const dateA = a.createdAt.getTime();
    const dateB = b.createdAt.getTime();
    return dateB - dateA;
  });

  // --- Lógica de Estatísticas ---
  const totalDoubts = duvidas.length;
  const totalAnswered = duvidas.filter((d) => d.status === "concluida").length;
  const responseRate = Math.round((totalAnswered / totalDoubts) * 100);
  const materiaComMaisDuvidas = "Cálculo I";
  const totalDuvidasMateria = duvidas.filter(
    (d) => d.materia === "Cálculo I",
  ).length;
  const totalAlunos = new Set(duvidas.map((d) => d.aluno.nome)).size;
  // ---

  return (
    <div className={styles.container}>
      {/* === SEÇÃO DO CABEÇALHO === */}
      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Visão Geral</h1>
          <p className={styles.pageSubtitle}>
            Bem-vindo de volta, {userData?.nome}!
          </p>
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
      <h2 className={styles.sectionTitle}>Gerenciamento de Dúvidas</h2>
      <section className={styles.filterSection}>
        <StatusFilter activeStatus={statusFilter} onChange={setStatusFilter} />
      </section>

      {/* === SEÇÃO DO DASHBOARD === */}
      <section className={styles.dashboardSection}>
        {duvidasOrdenadas.length > 0 ? (
          <div className={styles.cardsGridLayout}>
            {duvidasOrdenadas.map((doubt) => (
              <DoubtCard key={doubt.id} doubt={doubt} />
            ))}
          </div>
        ) : (
          <div className="text-xm text-gray-600 font-bold ml-8">Nenhuma duvida</div>
        )}
      </section>
    </div>
  );
}

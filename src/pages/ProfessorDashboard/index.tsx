"use client";
import React, { useEffect, useState } from "react";
import "./styles.css";
import {DoubtCard, StatsCard, StatusFilter} from "@/components/ProfessorDashboard";

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

  // 2. ESTADO PARA O SALDO (Começa com R$ 150,00)


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
    <div className="container">

      {/* === SEÇÃO DO CABEÇALHO === */}
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Visão Geral</h1>
          <p className="page-subtitle">
            Bem-vindo de volta, {userData.nome}!
          </p>
        </div>
        <div className="header-actions">
          {/* Botão para testar o aumento do saldo na TopBar */}
          <button
            className="btn-primary"
            onClick={() => setSaldo(saldo + 50)}
          >
            + Simular Depósito (R$ 50)
          </button>
        </div>
      </header>

      {/* === SEÇÃO DE ESTATÍSTICAS === */}
      <section className="stats-grid">
        <StatsCard title="Dúvidas Totais" value={totalDoubts} description="Este mês" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Taxa de Resposta" value={`${responseRate}%`} description="Dúvidas respondidas" trend={{ value: 5, isPositive: true }} />
        <StatsCard title="Matéria com Mais Dúvidas" value={materiaComMaisDuvidas} description={`${totalDuvidasMateria} dúvidas`} trend={{ value: 15, isPositive: false }} />
        <StatsCard title="Alunos Atendidos" value={totalAlunos} description="Este mês" />
      </section>

      {/* === SEÇÃO DE FILTROS === */}
      <section className="filter-section">
        <StatusFilter
          activeStatus={statusFilter}
          onChange={setStatusFilter}
        />
      </section>

      {/* === SEÇÃO DO DASHBOARD === */}
      <section className="dashboard-section">
        <h2 className="section-title">Gerenciamento de Dúvidas</h2>

        <div className="cards-grid-layout">
          {duvidasOrdenadas.map((doubt) => (
            <DoubtCard key={doubt.id} doubt={doubt} />
          ))}
        </div>
      </section>
    </div>
  );
}

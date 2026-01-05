"use client";
import React, { useEffect, useState } from "react";
import "./ProfessorDashboardTeste.css";
import DoubtCard from "../../components/professorDashboard/DoubtCard";
import { StatusFilter } from "../../components/professorDashboard/StatusFilter";
import StatsCard from "../../components/professorDashboard/StatsCard";

import { Duvida, mockDB } from "@/database/mockDatabase";
import { useAuth } from "@/context/authContext";

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const statusPriority = {
  'aberta': 2,
  'em_andamento': 3,
  'concluida': 4
};

export default function ProfessorDashboardPage() {

  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const { userData, isLoading: authLoading } = useAuth();

  useEffect(() => {
    async function carregarDuvidas() {
      try {
        const dados = await mockDB.getmockAllDuvidas();
        setDuvidas(dados);
      } catch (error) {

        console.error("Erro ao carregar dúvidas:", error);
      }
    }
    carregarDuvidas();
  }), [authLoading];

  // 2. ESTADO PARA O SALDO (Começa com R$ 150,00)
  const [saldo, setSaldo] = useState(150.00);
  const [statusFilter, setStatusFilter] = useState<'aberta' | 'em_andamento' | 'concluida'>('aberta');

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

    const dateA = parseDate(a.deadLine).getTime();
    const dateB = parseDate(b.deadLine).getTime();
    return dateB - dateA;
  });

  // --- Lógica de Estatísticas ---
  const totalDoubts = duvidas.length;
  const totalAnswered = duvidas.filter(d => d.status === 'concluida').length;
  const responseRate = Math.round((totalAnswered / totalDoubts) * 100);
  const materiaComMaisDuvidas = "Cálculo I";
  const totalDuvidasMateria = duvidas.filter(d => d.materia === 'Cálculo I').length;
  const totalAlunos = new Set(duvidas.map(d => d.alunoNome)).size;
  // ---

  return (
    <div className="container">

      {/* === SEÇÃO DO CABEÇALHO === */}
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Visão Geral</h1>
          <p className="page-subtitle">
            Bem-vindo de volta, {userData.name}!
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
            <DoubtCard key={doubt.id} {...doubt} />
          ))}
        </div>
      </section>
    </div>
  );
}

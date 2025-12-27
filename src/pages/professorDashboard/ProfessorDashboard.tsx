"use client";
import React, { useState } from "react";
import "./ProfessorDashboardTeste.css";
import DoubtCard from "../../components/professorDashboard/DoubtCard";
import { StatusFilter } from "../../components/professorDashboard/StatusFilter";
import StatsCard from "../../components/professorDashboard/StatsCard";

type Doubt = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "em_proposta" | "in_progress" | "answered";
  price: number;
};

const mockDoubts: Doubt[] = [
  { id: "1", title: "Como resolver equações diferenciais?", studentName: "Ana Silva", subject: "Cálculo I", date: "20/10/2025", status: "new", price: 50 },
  { id: "2", title: "Dúvida sobre leis de Newton", studentName: "Pedro Santos", subject: "Física I", date: "19/10/2025", status: "em_proposta", price: 70 },
  { id: "3", title: "Problema com vetores no R³", studentName: "Carlos Oliveira", subject: "Álgebra Linear", date: "18/10/2025", status: "in_progress", price: 60 },
  { id: "4", title: "Aplicação de integrais duplas", studentName: "Marina Costa", subject: "Cálculo I", date: "21/10/2025", status: "new", price: 80 },
  { id: "5", title: "Ondulatória - princípio de Huygens", studentName: "João Mendes", subject: "Física II", date: "17/10/2025", status: "answered", price: 90 },
  { id: "6", title: "Transformações lineares", studentName: "Luiza Ferreira", subject: "Álgebra Linear", date: "16/10/2025", status: "in_progress", price: 55 },
  { id: "7", title: "Cálculo de limites", studentName: "Rafael Gomes", subject: "Cálculo I", date: "15/10/2025", status: "answered", price: 65 },
  { id: "8", title: "Leis de conservação em física", studentName: "Beatriz Almeida", subject: "Física I", date: "14/10/2025", status: "em_proposta", price: 75 },
  { id: "9", title: "Autovalores e autovetores", studentName: "Felipe Rocha", subject: "Álgebra Linear", date: "13/10/2025", status: "new", price: 85 },
  { id: "10", title: "Teorema de Green", studentName: "Camila Nunes", subject: "Cálculo I", date: "12/10/2025", status: "answered", price: 95 },
];

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const statusPriority = {
  'new': 1,
  'em_proposta': 2,
  'in_progress': 3,
  'answered': 4
};

export default function ProfessorDashboardPage() {

  // 2. ESTADO PARA O SALDO (Começa com R$ 150,00)
  const [saldo, setSaldo] = useState(150.00);

  const [statusFilter, setStatusFilter] = useState<'new' | 'em_proposta' | 'in_progress' | 'answered'>('new');

  // Lógica de filtragem
  const duvidasFiltradas = mockDoubts.filter(duvida => {
    return duvida.status === statusFilter;
  });

  // Lógica de ordenação
  const duvidasOrdenadas = [...duvidasFiltradas].sort((a, b) => {
    const priorityA = statusPriority[a.status];
    const priorityB = statusPriority[b.status];

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return dateB - dateA;
  });

  // --- Lógica de Estatísticas ---
  const totalDoubts = mockDoubts.length;
  const totalAnswered = mockDoubts.filter(d => d.status === 'answered').length;
  const responseRate = Math.round((totalAnswered / totalDoubts) * 100);
  const materiaComMaisDuvidas = "Cálculo I";
  const totalDuvidasMateria = mockDoubts.filter(d => d.subject === 'Cálculo I').length;
  const totalAlunos = new Set(mockDoubts.map(d => d.studentName)).size;
  // ---

  return (
    <div className="container">


      {/* === SEÇÃO DO CABEÇALHO === */}
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Visão Geral</h1>
          <p className="page-subtitle">
            Bem-vindo de volta, Professor!
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

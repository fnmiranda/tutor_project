"use client";
import React from "react";
import "../../components/professorDashboard/professorCSS.css";
import DoubtQueueColumn from "../../components/professorDashboard/DoubtQueueColumn";
import { FiltroMateria } from "../../components/professorDashboard/FiltroMateria";
import StatsCard from "../../components/professorDashboard/StatsCard";

type Doubt = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "in_progress" | "answered";
};

// Dados mockados expandidos para Semana 1
const mockDoubts: Doubt[] = [
  {
    id: "1",
    title: "Como resolver equações diferenciais?",
    studentName: "Ana Silva",
    subject: "Cálculo I",
    date: "20/10/2025",
    status: "new",
  },
  {
    id: "2",
    title: "Dúvida sobre leis de Newton",
    studentName: "Pedro Santos", 
    subject: "Física I",
    date: "19/10/2025",
    status: "in_progress",
  },
  {
    id: "3",
    title: "Problema com vetores no R³",
    studentName: "Carlos Oliveira",
    subject: "Álgebra Linear", 
    date: "18/10/2025",
    status: "answered",
  },
  {
    id: "4",
    title: "Aplicação de integrais duplas",
    studentName: "Marina Costa",
    subject: "Cálculo I",
    date: "20/10/2025", 
    status: "new",
  },
  {
    id: "5",
    title: "Ondulatória - princípio de Huygens",
    studentName: "João Mendes",
    subject: "Física II",
    date: "17/10/2025",
    status: "answered",
  },
];

export default function ProfessorDashboardPage() {
  // Filtrar dúvidas por status
  const newDoubts = mockDoubts.filter(d => d.status === "new");
  const inProgressDoubts = mockDoubts.filter(d => d.status === "in_progress");
  const answeredDoubts = mockDoubts.filter(d => d.status === "answered");

  // Estatísticas mockadas
  const totalDoubts = mockDoubts.length;
  const responseRate = Math.round((answeredDoubts.length / totalDoubts) * 100);
  const materiaComMaisDuvidas = "Cálculo I";
  const totalDuvidasMateria = 8;

  return (
    <main className="page">
      <div className="container">
        {/* Cabeçalho Aprimorado */}
        <header className="page-header">
          <div className="header-content">
            <h1 className="page-title">Dashboard do Professor</h1>
            <p className="page-subtitle">
              Gerencie dúvidas, acompanhe métricas e ajude seus alunos
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">Exportar Relatório</button>
            <button className="btn-primary">Nova Resposta em Lote</button>
          </div>
        </header>

        {/* Cartões de Estatísticas - NOVO na Semana 1 */}
        <section className="stats-grid">
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
            trend={{ value: 15, isPositive: false }} // Aumento de dúvidas = alerta
           />

          <StatsCard 
            title="Alunos Atendidos" 
            value={8} 
            description="Este mês"
          />
        </section>

        {/* Filtro de Matéria */}
        <section className="filter-section">
          <FiltroMateria />
          <div className="filter-actions">
            <button className="btn-outline">Ordenar por Data</button>
            <button className="btn-outline">Filtrar por Prioridade</button>
          </div>
        </section>

        {/* Grid com as colunas de dúvidas */}
        <section className="dashboard-section">
          <h2 className="section-title">Gerenciamento de Dúvidas</h2>
          <div className="dashboard-grid">
            <DoubtQueueColumn title="Novas Dúvidas" doubts={newDoubts} />
            <DoubtQueueColumn title="Em Progresso" doubts={inProgressDoubts} />
            <DoubtQueueColumn title="Respondidas" doubts={answeredDoubts} />
          </div>
        </section>
      </div>
    </main>
  );
}
"use client";
import React, { useState } from "react"; 
import "../../components/professorDashboard/professorCSS.css";
import DoubtCard from "../../components/professorDashboard/DoubtCard"; 
// import { FiltroMateria } from "../../components/professorDashboard/FiltroMateria"; // REMOVIDO
import { StatusFilter } from "../../components/professorDashboard/StatusFilter"; // ADICIONADO
import StatsCard from "../../components/professorDashboard/StatsCard";

type Doubt = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "in_progress" | "answered";
  priority?: 'high' | 'medium' | 'low';
};

const mockDoubts: Doubt[] = [
  { id: "1", title: "Como resolver equações diferenciais?", studentName: "Ana Silva", subject: "Cálculo I", date: "20/10/2025", status: "new", priority: 'medium' },
  { id: "2", title: "Dúvida sobre leis de Newton", studentName: "Pedro Santos", subject: "Física I", date: "19/10/2025", status: "in_progress" },
  { id: "3", title: "Problema com vetores no R³", studentName: "Carlos Oliveira", subject: "Álgebra Linear", date: "18/10/2025", status: "answered", priority: 'high' },
  { id: "4", title: "Aplicação de integrais duplas", studentName: "Marina Costa", subject: "Cálculo I", date: "21/10/2025", status: "new", priority: 'high' },
  { id: "5", title: "Ondulatória - princípio de Huygens", studentName: "João Mendes", subject: "Física II", date: "17/10/2025", status: "answered" },
];

const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
};

const statusPriority = {
  'new': 1,
  'in_progress': 2,
  'answered': 3
};

export default function ProfessorDashboardPage() {
  
  // MODIFICADO: Trocamos o filtro de matéria pelo filtro de status
  // const [filtroMateria, setFiltroMateria] = useState(""); // REMOVIDO
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'in_progress' | 'answered'>('all'); // ADICIONADO
  
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high'>('all');

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  const togglePriorityFilter = () => {
    setPriorityFilter(prevFilter => (prevFilter === 'all' ? 'high' : 'all'));
  };

  // MODIFICADO: Lógica de filtragem agora usa 'statusFilter'
  const duvidasFiltradas = mockDoubts.filter(duvida => {
    // 1. Checa o Status (NOVO)
    const statusMatch = (statusFilter === 'all') || (duvida.status === statusFilter);

    // 2. Checa a Prioridade (igual a antes)
    const priorityMatch = (priorityFilter === 'all') || (duvida.priority === 'high');

    return statusMatch && priorityMatch;
  });

  // Lógica de ordenação (Funciona perfeitamente como estava)
  // Se 'statusFilter' for 'all', ele ordena por status.
  // Se 'statusFilter' for 'new', ele pula para a ordenação por data.
  const duvidasOrdenadas = [...duvidasFiltradas].sort((a, b) => {
    const priorityA = statusPriority[a.status];
    const priorityB = statusPriority[b.status];

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // --- Lógica de Estatísticas (continua a mesma) ---
  const totalDoubts = mockDoubts.length;
  const totalAnswered = mockDoubts.filter(d => d.status === 'answered').length;
  const responseRate = Math.round((totalAnswered / totalDoubts) * 100);
  const materiaComMaisDuvidas = "Cálculo I";
  const totalDuvidasMateria = mockDoubts.filter(d => d.subject === 'Cálculo I').length;
  const totalAlunos = new Set(mockDoubts.map(d => d.studentName)).size;
  // ---

  return (
    <main className="page">
      <div className="container">
        
        {/* === SEÇÃO DO CABEÇALHO === */}
        <header className="page-header">
          {/* ... (cabeçalho completo) ... */}
          <div className="header-content">
            <h1 className="page-title">Dashboard do Professor</h1>
            <p className="page-subtitle">
              Gerencie dúvidas, acompanhe métricas e ajude seus alunos
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">Botton2</button>
            <button className="btn-primary">Botton1</button>
          </div>
        </header>

        {/* === SEÇÃO DE ESTATÍSTICAS === */}
        <section className="stats-grid">
           {/* ... (StatsCards completos) ... */}
          <StatsCard title="Dúvidas Totais" value={totalDoubts} description="Este mês" trend={{ value: 12, isPositive: true }} />
          <StatsCard title="Taxa de Resposta" value={`${responseRate}%`} description="Dúvidas respondidas" trend={{ value: 5, isPositive: true }} />
          <StatsCard title="Matéria com Mais Dúvidas" value={materiaComMaisDuvidas} description={`${totalDuvidasMateria} dúvidas`} trend={{ value: 15, isPositive: false }} />
          <StatsCard title="Alunos Atendidos" value={totalAlunos} description="Este mês" />
        </section>

        {/* === SEÇÃO DE FILTROS (MODIFICADA) === */}
        <section className="filter-section">
          {/* SUBSTITUÍDO: O <FiltroMateria> saiu e o <StatusFilter> entrou */}
          <StatusFilter 
            activeStatus={statusFilter}
            onChange={setStatusFilter}
          />
          
          <div className="filter-actions">
            <button className="btn-outline" onClick={toggleSortOrder}>
              Ordenar por Data ({sortOrder === 'desc' ? 'Mais Novas' : 'Mais Antigas'})
            </button>
            <button className="btn-outline" onClick={togglePriorityFilter}>
              Filtrar: {priorityFilter === 'all' ? 'Todas' : 'Prioridade Alta'}
            </button>
          </div>
        </section>

        {/* === SEÇÃO DO DASHBOARD (LISTA ÚNICA) === */}
        <section className="dashboard-section">
          <h2 className="section-title">Gerenciamento de Dúvidas</h2>
          
          <div className="cards-grid-layout">
            {duvidasOrdenadas.map((doubt) => (
              <DoubtCard key={doubt.id} doubt={doubt} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
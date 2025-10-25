"use client";
import React from "react";
import "../../components/professorDashboard/professorCSS.css";

// --- Tipo de dados ---
type Doubt = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "in_progress" | "answered";
};

// --- Dados mockados ---
const mockDoubts: Doubt[] = [
  {
    id: "1",
    title: "Como funciona o App Router no Next.js 13?",
    studentName: "José Arthur",
    subject: "Next.js",
    date: "20/10/2025",
    status: "new",
  },
  {
    id: "2",
    title: "Qual a melhor forma de usar o useEffect?",
    studentName: "Vitor Ramos",
    subject: "React",
    date: "20/10/2025",
    status: "new",
  },
  {
    id: "3",
    title: "Dúvida sobre responsividade em CSS",
    studentName: "Thiago",
    subject: "CSS",
    date: "19/10/2025",
    status: "in_progress",
  },
  {
    id: "4",
    title: "Como configurar o NextAuth com Google Provider?",
    studentName: "Gerente/Dev E",
    subject: "NextAuth",
    date: "18/10/2025",
    status: "answered",
  },
  {
    id: "5",
    title: "Problema com types no TypeScript",
    studentName: "José Arthur",
    subject: "TypeScript",
    date: "19/10/2025",
    status: "in_progress",
  },
];

// --- Subcomponentes ---

const DoubtCard = ({ doubt }: { doubt: Doubt }) => {
  return (
    <div className="card doubt-card">
      <h3 className="card-title">{doubt.title}</h3>
      <p className="card-text">
        <strong>Aluno:</strong> {doubt.studentName}
      </p>
      <p className="card-text">
        <strong>Matéria:</strong> {doubt.subject}
      </p>
      <div className="card-footer">
        <span className="card-date">{doubt.date}</span>
        <span className={`status ${doubt.status}`}>
          {doubt.status === "new"
            ? "Nova"
            : doubt.status === "in_progress"
            ? "Em Progresso"
            : "Respondida"}
        </span>
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filtrar por Matéria:</span>
      <button className="filter-btn">Next.js</button>
      <button className="filter-btn">React</button>
      <button className="filter-btn">Todos</button>
    </div>
  );
};

const DoubtQueueColumn = ({
  title,
  doubts,
}: {
  title: string;
  doubts: Doubt[];
}) => {
  return (
    <div className="column">
      <h2 className="column-title">
        {title} <span className="column-count">({doubts.length})</span>
      </h2>
      <div className="column-content">
        {doubts.map((doubt) => (
          <DoubtCard key={doubt.id} doubt={doubt} />
        ))}
      </div>
    </div>
  );
};

// --- Componente principal ---
export default function ProfessorDashboard() {
  const newDoubts = mockDoubts.filter((d) => d.status === "new");
  const inProgressDoubts = mockDoubts.filter((d) => d.status === "in_progress");
  const answeredDoubts = mockDoubts.filter((d) => d.status === "answered");

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">Dashboard do Professor</h1>
        <p className="page-subtitle">
          Gerencie as dúvidas dos alunos de forma eficiente.
        </p>
      </header>

      <Filters />

      <div className="dashboard-grid">
        <DoubtQueueColumn title="Novas Dúvidas" doubts={newDoubts} />
        <DoubtQueueColumn title="Em Progresso" doubts={inProgressDoubts} />
        <DoubtQueueColumn title="Respondidas" doubts={answeredDoubts} />
      </div>
    </main>
  );
}

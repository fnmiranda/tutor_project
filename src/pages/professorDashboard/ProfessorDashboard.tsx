"use client";
import React from "react";
import "../../components/professorDashboard/professorCSS.css"; // Certifique-se que o caminho está correto

// Definindo o tipo para os dados, uma boa prática com TypeScript
type Doubt = {
  id: number;
  aluno: string;
  materia: string;
  status: 'new' | 'in_progress' | 'answered'; // Status padronizados
  data: string; // Formato "DD/MM/YYYY"
};

// Objeto para mapear o status para texto e classe CSS
const statusMap = {
  new: { text: 'Nova', className: 'new' },
  in_progress: { text: 'Em Progresso', className: 'in_progress' },
  answered: { text: 'Respondida', className: 'answered' },
};

// Função para converter a data string em um objeto Date para ordenação
const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    // O mês no objeto Date é baseado em zero (0 = Janeiro, 11 = Dezembro)
    return new Date(year, month - 1, day);
};

export default function ProfessorDashboard() {
  // Dados mockados com datas diferentes para testar a ordenação
  const duvidasMock: Doubt[] = [
    { id: 1, aluno: "Ana", materia: "Cálculo I", status: "new", data: "19/10/2025" },
    { id: 2, aluno: "Pedro", materia: "Física I", status: "answered", data: "18/10/2025" },
    { id: 3, aluno: "Marina", materia: "Álgebra Linear", status: "in_progress", data: "17/10/2025" },
    { id: 4, aluno: "Vitor", materia: "React Avançado", status: "new", data: "18/10/2025" },
    { id: 5, aluno: "José", materia: "Banco de Dados", status: "new", data: "20/10/2025" },
  ];

  // Filtra e depois ordena cada lista por data, da mais nova para a mais antiga
  const newDoubts = duvidasMock
    .filter((d) => d.status === 'new')
    .sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime());

  const inProgressDoubts = duvidasMock
    .filter((d) => d.status === 'in_progress')
    .sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime());

  const answeredDoubts = duvidasMock
    .filter((d) => d.status === 'answered')
    .sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime());

  return (
    <main className="page">
      <div className="container">
        {/* Cabeçalho */}
        <header className="page-header">
          <h1 className="page-title">Dashboard do Professor</h1>
          <p className="page-subtitle">
            Acompanhe, gerencie e responda dúvidas enviadas pelos alunos.
          </p>
        </header>

        {/* Filtro de Matéria */}
        <div className="filter-bar">
            <label className="filter-label">Filtrar por Matéria:</label>
            <button className="filter-btn">Todas</button>
            <button className="filter-btn">Cálculo I</button>
            <button className="filter-btn">Física I</button>
        </div>

        {/* Grid que organiza as colunas */}
        <div className="dashboard-grid">

          {/* Coluna 1: Novas Dúvidas (Ordenada) */}
          <div className="column">
            <h2 className="column-title">
              Novas Dúvidas <span className="column-count">{newDoubts.length}</span>
            </h2>
            <div className="column-content">
              {newDoubts.map((duvida) => (
                <div key={duvida.id} className="card">
                  <h3 className="card-title">{duvida.materia}</h3>
                  <p className="card-text">Aluno: {duvida.aluno}</p>
                  <div className="card-footer">
                    <span className="card-date">{duvida.data}</span>
                    <span className={`status ${statusMap[duvida.status].className}`}>
                      {statusMap[duvida.status].text}
                    </span>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '16px' }}>Ver Detalhes</button>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Em Progresso */}
          <div className="column">
            <h2 className="column-title">
              Em Progresso <span className="column-count">{inProgressDoubts.length}</span>
            </h2>
            <div className="column-content">
              {inProgressDoubts.map((duvida) => (
                <div key={duvida.id} className="card">
                  <h3 className="card-title">{duvida.materia}</h3>
                  <p className="card-text">Aluno: {duvida.aluno}</p>
                  <div className="card-footer">
                    <span className="card-date">{duvida.data}</span>
                    <span className={`status ${statusMap[duvida.status].className}`}>
                      {statusMap[duvida.status].text}
                    </span>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '16px' }}>Ver Detalhes</button>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 3: Respondidas */}
          <div className="column">
            <h2 className="column-title">
              Respondidas <span className="column-count">{answeredDoubts.length}</span>
            </h2>
            <div className="column-content">
              {answeredDoubts.map((duvida) => (
                <div key={duvida.id} className="card">
                  <h3 className="card-title">{duvida.materia}</h3>
                  <p className="card-text">Aluno: {duvida.aluno}</p>
                  <div className="card-footer">
                    <span className="card-date">{duvida.data}</span>
                    <span className={`status ${statusMap[duvida.status].className}`}>
                      {statusMap[duvida.status].text}
                    </span>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '16px' }}>Ver Detalhes</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
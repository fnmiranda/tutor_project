"use client";
import React, { useState } from "react";
import "../../components/professorDashboard/professorCSS.css";
import "../../components/professorDashboard/TopBar.css";
import "./DuvidaDetalhe.css";
import { useRouter } from "next/navigation";

import { FaAngleLeft } from "react-icons/fa";

interface DuvidaDetalheProps {
  duvidaId?: string;
}

type Duvida = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "em_proposta" | "in_progress" | "answered";
  description: string;
  anexos?: string[];
  valorPropostoAluno: number;
};

export default function DuvidaDetalhe({ duvidaId }: DuvidaDetalheProps) {
  const router = useRouter();
  const [saldo, setSaldo] = useState(150.00);
  const [contraProposta, setContraProposta] = useState("");

  const duvida: Duvida = {
    id: duvidaId || "1",
    title: "Como resolver equações diferenciais de primeira ordem?",
    studentName: "Ana Silva",
    subject: "Cálculo I",
    date: "20/10/2025",
    status: "new",
    description: "Estou com dificuldade em entender como resolver equações diferenciais do tipo y' = f(x)g(y). Pode explicar o método de separação de variáveis com exemplos práticos? \n\n (Texto de exemplo para demonstrar o layout de duas colunas preenchendo a tela de forma mais agradável.)",
    anexos: ["exercicio.pdf"],
    valorPropostoAluno: 50.00
  };

  const handleAceitarProposta = () => {
    alert(`Proposta de R$ ${duvida.valorPropostoAluno.toFixed(2)} aceita!`);
    router.back();
  };

  const handleEnviarContraProposta = () => {
    if (!contraProposta || isNaN(Number(contraProposta))) {
      alert("Por favor, insira um valor válido.");
      return;
    }
    alert(`Contra-proposta de R$ ${contraProposta} enviada!`);
    setContraProposta("");
    router.back();
  };

  return (
    <main style={{ padding: 0, minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>

      <div className="page" style={{ paddingTop: '10px' }}>
        <div className="container">

          {/* === CABEÇALHO === */}
          <header className="flex flex-1 items-center flex-row gap-6 mb-6" >
            <button
              className="btn-back-styled"
              onClick={() => router.back()}
            >
              <FaAngleLeft />
            </button>

            <div className="header-content">
              <h1 className="page-title">Detalhe da Dúvida</h1>
              <span className={`status ${duvida.status}`} style={{ marginTop: '8px' }}>
                {duvida.status === "new" ? "Nova" :
                  duvida.status === "em_proposta" ? "Em Proposta" :
                    duvida.status === "in_progress" ? "Em Progresso" : "Respondida"}
              </span>
            </div>

            <div className="header-actions">
              {/* Espaço reservado para manter alinhamento se necessário */}
            </div>
          </header>

          {/* === LAYOUT DE 2 COLUNAS === */}
          <div className="detalhe-layout">

            {/* Coluna da Esquerda: Detalhes */}
            <section className="duvida-section-col">
              <div className="duvida-card">
                <div className="duvida-header">
                  <h2 className="duvida-title">{duvida.title}</h2>
                  <div className="duvida-meta">
                    <span className="duvida-aluno">Aluno: {duvida.studentName}</span>
                    <span className="duvida-materia">Matéria: {duvida.subject}</span>
                    <span className="duvida-data">{duvida.date}</span>
                  </div>
                </div>
                <div className="duvida-content">
                  <h3>Descrição da Dúvida:</h3>
                  <p className="duvida-description" style={{ whiteSpace: 'pre-wrap' }}>
                    {duvida.description}
                  </p>

                  {duvida.anexos && duvida.anexos.length > 0 && (
                    <div className="duvida-anexos">
                      <h4>Anexos:</h4>
                      <div className="anexos-list">
                        {duvida.anexos.map((anexo, index) => (
                          <button key={index} className="btn-anexo">
                            📎 {anexo}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Coluna da Direita: Proposta */}
            <section className="proposta-section-col">
              <div className="proposta-card">
                <h2 className="proposta-title">Proposta e Negociação</h2>
                <div className="proposta-aluno">
                  <span className="proposta-label">Valor oferecido:</span>
                  <span className="proposta-valor-aluno">
                    R$ {duvida.valorPropostoAluno.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button
                  className="btn-success btn-aceitar"
                  onClick={handleAceitarProposta}
                >
                  ✅ Aceitar Proposta
                </button>
                <div className="proposta-divisor">
                  <span>OU</span>
                </div>
                <div className="proposta-form">
                  <label htmlFor="contraproposta">Faça sua contra-proposta:</label>
                  <div className="input-group">
                    <span>R$</span>
                    <input
                      type="number"
                      id="contraproposta"
                      className="input-valor"
                      placeholder="Ex: 75.00"
                      value={contraProposta}
                      onChange={(e) => setContraProposta(e.target.value)}
                    />
                    <button
                      className="btn-primary"
                      onClick={handleEnviarContraProposta}
                      disabled={!contraProposta}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
          {/* Fim do detalhe-layout */}

        </div>
      </div>
    </main>
  );
}

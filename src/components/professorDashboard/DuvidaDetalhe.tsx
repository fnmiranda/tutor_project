"use client";
import React, { useEffect, useState } from "react";
import "../../components/professorDashboard/professorCSS.css";
import "../../components/professorDashboard/TopBar.css";
import "./DuvidaDetalhe.css";
import { useRouter } from "next/navigation";
import { Duvida, mockDB } from "@/database/mockDatabase";
import { useAuth } from "@/context/authContext";

import { FaAngleLeft } from "react-icons/fa";
import { formatDateBrazil } from "@/helpers/converterData";

interface DuvidaDetalheProps {
  duvidaId: string;
}

export default function DuvidaDetalhe({ duvidaId }: DuvidaDetalheProps) {
  const router = useRouter();
  const [contraProposta, setContraProposta] = useState("");

  const [duvida, setDuvida] = useState<Duvida>();
  const { userData, isLoading: authLoading } = useAuth();

  useEffect(() => {
    async function carregarDuvidas() {
      try {
        const dados = await mockDB.getDuvidaById(duvidaId);
        setDuvida(dados);
      } catch (error) {
        console.error("Erro ao carregar dúvidas:", error);
      }
    }
    carregarDuvidas();
  }), [authLoading];


  const handleAceitarProposta = () => {
    //    alert(`Proposta de R$ ${duvida.valorPropostoAluno.toFixed(2)} aceita!`);
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
    <main style={{ minWidth: 1200, padding: 0, minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>

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
              <span className={`status ${duvida?.status}`} style={{ marginTop: '8px' }}>
                {duvida && duvida.status === "aberta" ? "Aberta" :
                  duvida && duvida.status === "em_andamento" ? "Em Andamento" : "concluida"
                }
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
                  <h2 className="duvida-title">{duvida?.titulo}</h2>
                  <div className="duvida-meta">
                    <span className="duvida-aluno">Aluno: {duvida?.alunoNome}</span>
                    <span className="duvida-materia">Matéria: {duvida?.materia}</span>
                    <span className="duvida-data">{formatDateBrazil(duvida?.deadLine)}</span>
                  </div>
                </div>
                <div className="duvida-content">
                  <h3>Descrição da Dúvida:</h3>
                  <p className="duvida-description" style={{ whiteSpace: 'pre-wrap' }}>
                    {duvida?.descricao}
                  </p>
                  {/*
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
                  )}*/}
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
                    R$ 100,00 {/*duvida.valorPropostoAluno.toFixed(2).replace('.', ',')*/}
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

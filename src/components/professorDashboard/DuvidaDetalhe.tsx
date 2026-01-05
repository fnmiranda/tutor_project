"use client";
import React, { useEffect, useState } from "react";
import "./DuvidaDetalhe.css";
import { FaAngleLeft, FaCheck } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { Duvida, mockDB } from "@/database/mockDatabase";
import { useAuth } from "@/context/authContext";

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

    <div className="page">
      <div className="container">

        {/* === CABEÇALHO === */}
        <header className="header-styled">
          <button className="btn-back-styled" onClick={() => router.back()}>
            <FaAngleLeft />
          </button>

          <div className="header-content">
            <h1 className="page-title">Detalhe da Dúvida</h1>
            <span className={`status ${duvida?.status || 'aberta'}`}>
              {duvida?.status === "aberta" ? "Aberta" :
                duvida?.status === "em_andamento" ? "Em Andamento" : "Concluída"}
            </span>
          </div>
        </header>

        {/* === LAYOUT DE 2 COLUNAS === */}
        <div className="detalhe-layout">

          {/* Coluna da Esquerda: Detalhes */}
          <section className="duvida-section-col">
            <div className="duvida-card">
              <div className="duvida-header">
                <h2 className="duvida-title">{duvida?.titulo || "Revolução Francesa - Causas"}</h2>
                <div className="duvida-meta">
                  <span className="duvida-aluno">Aluno: {duvida?.alunoNome || "Napoleão B."}</span>
                  <span className="duvida-materia">Matéria: {duvida?.materia || "História"}</span>
                  <span className="duvida-data">29/10/2023</span>
                </div>
              </div>

              <div className="duvida-content">
                <h3>Descrição da Dúvida:</h3>
                <p className="duvida-description">
                  {duvida?.descricao || "Quais foram os principais fatores econômicos que levaram à Revolução Francesa?"}
                </p>
              </div>
            </div>
          </section>

          {/* Coluna da Direita: Proposta */}
          <section className="proposta-section-col">
            <div className="proposta-card">
              <h2 className="proposta-title">Proposta e Negociação</h2>

              <div className="proposta-aluno">
                <span className="proposta-label">Valor oferecido:</span>
                <span className="proposta-valor-aluno">R$ 100,00</span>
              </div>

              <button className="btn-aceitar" onClick={() => console.log('Aceitou')}>
                <FaCheck /> Aceitar Proposta
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
                    className="btn-enviar-contra"
                    disabled={!contraProposta}
                    onClick={() => console.log('Enviou contra-proposta')}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

  );
}

"use client";
import React, { useEffect } from "react";
import "../professorCSS.css";
import { useRouter } from "next/navigation";

import { Duvida } from "@/@types/index"; // Certifique-se de usar a interface global
import { formatDateBrazil, parseDate } from "@/utils/converterData";

interface DoubtCardProps {
  doubt: Duvida;
}

export default function DoubtCard({doubt}: DoubtCardProps) {
  const router = useRouter();

  // ATUALIZADO: Inclui 'em_proposta'
  const statusMap = {
    aberta: { text: "Aberta", className: "em_proposta" }, 
    em_andamento: { text: "Em Progresso", className: "in_progress" },
    concluida: { text: "Respondida", className: "answered" },
  };

  const handleVerDetalhes = () => {
    router.push(`/tutor/dashboard/duvida/${doubt.id}`);
  };

  // Verificação de segurança
  const statusInfo = statusMap[doubt.status] || { text: "Indefinido", className: "" };

  return (
    <div className="card">
      {/* CRIAMOS UM CABEÇALHO FLEXÍVEL PARA TÍTULO E PREÇO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h3 className="card-title" style={{ margin: 0, flex: 1 }}>{doubt.titulo}</h3>

        {/* AQUI ESTÁ O PREÇO */}
        <span style={{
          backgroundColor: '#dcfce7', // Fundo verdinho claro
          color: '#166534',           // Texto verde escuro
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',       // Não deixa quebrar linha
          marginLeft: '8px'
        }}>
          R$ 100,00 {/*doubt.price.toFixed(2).replace('.', ',')*/}
        </span>
      </div>

      <p className="card-text">Aluno: {doubt.aluno.nome}</p>
      <p className="card-text">Matéria: {doubt.materia}</p>

      <div className="card-footer">
        <span className="card-date">{parseDate(doubt.deadLine)}</span>
        <span className={`status ${statusInfo.className}`}>
          {statusInfo.text}
        </span>
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: "auto" }}
        onClick={handleVerDetalhes}
      >
        Ver Detalhes
      </button>
    </div>
  );
}

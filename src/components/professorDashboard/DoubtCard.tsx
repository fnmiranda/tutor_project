"use client";
import React from "react";
import "./professorCSS.css";
import { useRouter } from "next/navigation";

type Doubt = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  // ATUALIZADO: Inclui 'em_proposta'
  status: "new" | "em_proposta" | "in_progress" | "answered";
  price: number;
};

interface DoubtCardProps {
  doubt: Doubt;
}

export default function DoubtCard({ doubt }: DoubtCardProps) {
  const router = useRouter();

  // ATUALIZADO: Inclui 'em_proposta'
  const statusMap = {
    new: { text: "Nova", className: "new" },
    em_proposta: { text: "Em Proposta", className: "em_proposta" }, // <-- LINHA ADICIONADA
    in_progress: { text: "Em Progresso", className: "in_progress" },
    answered: { text: "Respondida", className: "answered" },
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
        <h3 className="card-title" style={{ margin: 0, flex: 1 }}>{doubt.title}</h3>

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
          R$ {doubt.price.toFixed(2).replace('.', ',')}
        </span>
      </div>

      <p className="card-text">Aluno: {doubt.studentName}</p>
      <p className="card-text">Matéria: {doubt.subject}</p>

      <div className="card-footer">
        <span className="card-date">{doubt.date}</span>
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

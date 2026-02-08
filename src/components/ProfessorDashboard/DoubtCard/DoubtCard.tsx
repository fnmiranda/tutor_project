"use client";
import React from "react";
import "../professorCSS.css";
import { useRouter } from "next/navigation";

import { Duvida } from "@/@types/index"; // Certifique-se de usar a interface global
import { parseDate, parseTime } from "@/utils/converterData";
import { FaCalendarWeek } from "react-icons/fa";

interface DoubtCardProps {
  doubt: Duvida;
}

export default function DoubtCard({ doubt }: DoubtCardProps) {
  const router = useRouter();

  const statusMap = {
    aberta: { text: "Aberta", className: "aberta" },
    em_negociacao: { text: "Em Progresso", className: "em_negocicao" },
    aceita: { text: "Aceita", className: "aceita" },
    concluida: { text: "Respondida", className: "concluida" },
  };

  const handleVerDetalhes = () => {
    router.push(`/tutor/dashboard/duvida/${doubt.id}`);
  };

  // Verificação de segurança
  const statusInfo = statusMap[doubt.status] || {
    text: "Indefinido",
    className: "",
  };

  return (
    <div className="card">
      <div className="flex flex-col justify-between h-64">
        <div>
          {/* CRIAMOS UM CABEÇALHO FLEXÍVEL PARA TÍTULO E PREÇO */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-row gap-2 items-center ">
              {/* <h3 className="card-title" style={{ margin: 0, flex: 1 }}> */}
              <h3 className="text-xl text-shadow-blue-700 font-bold" style={{ margin: 0, flex: 1 }}>
                {/* {doubt.titulo.slice(0,65)} {doubt.titulo.length > 30 &&(<span>...</span>)} */}
                {doubt.materia}
              </h3>
            </div>

            {/* AQUI ESTÁ O PREÇO */}
            <span
              style={{
                backgroundColor: "#dcfce7", // Fundo verdinho claro
                color: "#166534", // Texto verde escuro
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: "bold",
                whiteSpace: "nowrap", // Não deixa quebrar linha
                marginLeft: "8px",
              }}
            >
              R$ {doubt.valorSugerido?.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* <p className="card-text">Aluno: {doubt.aluno.nome}</p> */}
          <p className="card-text gap-2">
            <span className="text-sm font-semibold">Titulo:</span>{" "}
            {doubt.titulo.slice(0, 105)} 
          </p>
          <p className="card-text gap-2">
            <span className="text-sm font-semibold">Descrição:</span>{" "}
            {doubt.descricao.slice(0, 130)} ...
          </p>
          
        </div>
        <div className="card-footer mb-2">
          <span className="card-date flex flex-row items-center gap-2">
            <FaCalendarWeek/>
            {parseDate(doubt.deadLine)} até às {parseTime(doubt.deadLine)}
          </span>
          <span className={`status ${statusInfo.className}`}>
            {statusInfo.text}
          </span>
        </div>
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

"use client";
import React from "react";
import "./professorCSS.css";

type Doubt = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "in_progress" | "answered";
};

interface DoubtCardProps {
  doubt: Doubt;
}

export default function DoubtCard({ doubt }: DoubtCardProps) {
  const statusMap = {
    new: { text: "Nova", className: "new" },
    in_progress: { text: "Em Progresso", className: "in_progress" },
    answered: { text: "Respondida", className: "answered" },
  };

  return (
    <div className="card">
      <h3 className="card-title">{doubt.title}</h3>
      <p className="card-text">Aluno: {doubt.studentName}</p>
      <p className="card-text">Matéria: {doubt.subject}</p>
      <div className="card-footer">
        <span className="card-date">{doubt.date}</span>
        <span className={`status ${statusMap[doubt.status].className}`}>
          {statusMap[doubt.status].text}
        </span>
      </div>
      <button className="btn-primary" style={{ marginTop: "16px" }}>
        Ver Detalhes
      </button>
    </div>
  );
}
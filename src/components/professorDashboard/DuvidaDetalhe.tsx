"use client";
import React, { useState } from "react";
import "../../components/professorDashboard/professorCSS.css";
import { useRouter } from "next/navigation";

interface DuvidaDetalheProps {
  duvidaId?: string;
}

type Duvida = {
  id: string;
  title: string;
  studentName: string;
  subject: string;
  date: string;
  status: "new" | "in_progress" | "answered";
  description: string;
  anexos?: string[];
  respostas?: {
    id: string;
    professor: string;
    data: string;
    texto: string;
  }[];
};

export default function DuvidaDetalhe({ duvidaId }: DuvidaDetalheProps) {
  const router = useRouter();
  const [resposta, setResposta] = useState("");
  const [estaRespondendo, setEstaRespondendo] = useState(false);

  // Dados mockados
  const duvida: Duvida = {
    id: duvidaId || "1",
    title: "Como resolver equações diferenciais de primeira ordem?",
    studentName: "Ana Silva",
    subject: "Cálculo I",
    date: "20/10/2025",
    status: "new",
    description: "Estou com dificuldade em entender como resolver equações diferenciais do tipo y' = f(x)g(y). Pode explicar o método de separação de variáveis com exemplos práticos?",
    anexos: ["exercicio.pdf"],
    respostas: []
  };

  const handleResponder = () => {
    if (resposta.trim()) {
      setEstaRespondendo(false);
      setResposta("");
      alert("Resposta enviada com sucesso!");
    }
  };

  const handleFecharDuvida = () => {
    alert("Dúvida marcada como resolvida!");
    router.back();
  };

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <button 
              className="btn-back"
              onClick={() => router.back()}
            >
              ← Voltar para Dashboard
            </button>
            <h1 className="page-title">Detalhe da Dúvida</h1>
          </div>
          <div className="header-actions">
            <span className={`status ${duvida.status}`}>
              {duvida.status === "new" ? "Nova" : 
               duvida.status === "in_progress" ? "Em Progresso" : "Respondida"}
            </span>
          </div>
        </header>

        <section className="duvida-section">
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
              <p className="duvida-description">{duvida.description}</p>

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

        <section className="respostas-section">
          <div className="respostas-header">
            <h2>Respostas</h2>
            {duvida.status !== "answered" && (
              <button 
                className="btn-primary"
                onClick={() => setEstaRespondendo(!estaRespondendo)}
              >
                {estaRespondendo ? "Cancelar" : "Responder Dúvida"}
              </button>
            )}
          </div>

          {estaRespondendo && (
            <div className="resposta-form">
              <textarea
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                placeholder="Digite sua resposta aqui..."
                className="resposta-textarea"
                rows={6}
              />
              <div className="resposta-actions">
                <button 
                  className="btn-primary"
                  onClick={handleResponder}
                  disabled={!resposta.trim()}
                >
                  Enviar Resposta
                </button>
                <button 
                  className="btn-success"
                  onClick={handleFecharDuvida}
                >
                  ✅ Marcar como Resolvida
                </button>
              </div>
            </div>
          )}

          <div className="respostas-list">
            {duvida.respostas && duvida.respostas.length > 0 ? (
              duvida.respostas.map((resposta) => (
                <div key={resposta.id} className="resposta-card">
                  <div className="resposta-header">
                    <span className="resposta-professor">{resposta.professor}</span>
                    <span className="resposta-data">{resposta.data}</span>
                  </div>
                  <p className="resposta-texto">{resposta.texto}</p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Nenhuma resposta ainda. Seja o primeiro a ajudar!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
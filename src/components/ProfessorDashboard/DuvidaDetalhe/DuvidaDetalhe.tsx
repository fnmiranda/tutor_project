"use client";

import React, { useEffect, useState } from "react";
import styles from "./DuvidaDetalhe.module.css";
import { FaAngleLeft, FaTrash, FaHistory, FaCheck } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

import { getDuvidaById } from "@/services/duvidas";
import { criarProposta, excluirProposta } from "@/services/propostas";

import { formatTimeDifference, parseDate } from "@/utils/converterData";
import { Duvida } from "@/@types";

interface DuvidaDetalheProps {
  duvidaId: string;
}

export function DuvidaDetalhe({ duvidaId }: DuvidaDetalheProps) {
  const router = useRouter();
  const { userData } = useAuth();

  const [duvida, setDuvida] = useState<Duvida>();

  const [contraProposta, setContraProposta] = useState("");
  const [message, setMessage] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [data, setData] = useState("");

  const [excluindoId, setExcluindoId] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDuvida() {
      if (!duvidaId) return;

      try {
        const dados = await getDuvidaById(duvidaId);
        setDuvida(dados as Duvida);
        if (duvida?.createdAt) {
          setData(formatTimeDifference(duvida?.createdAt));
        }
      } catch (error) {
        console.error("Erro ao carregar dúvida:", error);
      }
    }
    carregarDuvida();
  }, [duvidaId, userData]);

  const handleFazerProposta = async () => {
    if (!contraProposta || Number(contraProposta) <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    setEnviando(true);

    try {
      const resultado = await criarProposta(
        duvidaId,
        Number(contraProposta),
        message,
      );

      if (resultado.success) {
        alert("Proposta enviada com sucesso!");
        setContraProposta("");
        setMessage("");
      } else {
        alert(resultado.error);
      }
    } catch (err) {
      alert("Erro inesperado ao enviar proposta.");
    } finally {
      setEnviando(false);
    }
  };

  const handleAceitarPropostaDoAluno = async () => {
    try {
      const resultado = await criarProposta(
        duvidaId,
        Number(duvida?.valorSugerido),
        `o Tutor ${userData.nome} aceitou o seu valor sugerido`,
      );

      if (resultado.success) {
        alert("Proposta enviada com sucesso!");
        setContraProposta("");
        setMessage("");
      } else {
        alert(resultado.error);
      }
    } catch (error) {
      alert("Erro inesperado ao enviar proposta.");
    }
  };

  //Deletar Proposta Related:
  const minhasPropostas = duvida?.propostas?.filter(
    (p) => p.tutorId === userData.id,
  );

  // if (minhasPropostas?.length === 0) return null;

  const handleDeletar = async (id: string) => {
    if (!confirm("Tem certeza que deseja retirar sua proposta?")) return;

    setExcluindoId(id);
    const res = await excluirProposta(id, duvidaId);

    if (!res.success) alert(res.error);
    setExcluindoId(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* === CABEÇALHO === */}
        <header className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FaAngleLeft />
          </button>
          <div className={styles.headerTitleGroup}>
            <h1 className={styles.pageTitle}>Detalhe da Dúvida</h1>
            <div className="flex flex-col gap-2 items-center">
              <span
                className={`${styles.statusBadge} ${
                  styles[duvida?.status || "aberta"]
                }`}
              >
                {duvida?.status === "aberta"
                  ? "Aberta"
                  : duvida?.status === "em_negociacao"
                    ? "Em Andamento"
                    : duvida?.status === "aceita"
                      ? "Aceita"
                      : "Concluída"}
              </span>

              {duvida?.createdAt && (
                <span className="text-black text-xs font-light">
                  {" "}
                  {formatTimeDifference(duvida?.createdAt)}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* === LAYOUT DE 2 COLUNAS === */}
        <div className={styles.mainLayout}>
          {/* Coluna da Esquerda: Detalhes */}
          <section className={styles.detailsColumn}>
            <div className={styles.card}>
              <h2 className={styles.duvidaTitle}>
                {duvida?.titulo || "Carregando..."}
              </h2>
              <div className={styles.metaGroup}>
                <span className={styles.metaBadge}>
                  Aluno:{" "}
                  <span className="font-medium">
                    {duvida?.aluno?.nome || "---"}
                  </span>
                </span>
                <span className={styles.metaBadge}>
                  Matéria:{" "}
                  <span className="font-medium">
                    {duvida?.materia || "---"}
                  </span>
                </span>
                <span className={styles.metaBadge}>
                  Prazo:{" "}
                  <span className="font-medium">
                    {duvida ? parseDate(duvida.deadLine) : "---"}
                  </span>
                </span>
              </div>
              <div className={styles.descriptionSection}>
                <h3>Descrição da Dúvida:</h3>
                <p>{duvida?.descricao || "Buscando detalhes da dúvida..."}</p>
              </div>
              <div
                className={`${styles.descriptionSection} flex flex-row gap-3 items-baseline pt-8`}
              >
                <h3>ID da Dúvida:</h3>
                <p>{duvida?.id || "Buscando ID da dúvida..."}</p>
              </div>
            </div>
          </section>
          {/* Coluna da Direita: Proposta */}
          <section className={styles.negotiationColumn}>
            <div className={styles.card}>
              <h3 className={styles.cardSubtitle}>Proposta e Negociação</h3>
              <span className={styles.valueLabel}>
                Abaixo esta exibido o valor proposto por {userData.nome}:
              </span>

              <div className={styles.valueDisplay}>
                <span className={styles.valueLabel}>Valor proposto:</span>

                {duvida?.status === "aceita" ? (
                  <div>
                    <span className={styles.valueLabel}>Valor proposto:</span>

                    <span className={styles.valueAmount}>
                      R${" "}
                      {duvida?.propostas
                        ?.find((prop) => prop.tutorId === duvida.tutorId)
                        ?.valor.toFixed(2)
                        .replace(".", ",")}
                    </span>
                    <div className="text-sm items-cente text-center border-2 rounded-2xl bg-amber-100 text-amber-600 font-medium">
                      Duvida Aceita
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row w-68 gap-4 items-center justify-between">
                    <span className={styles.valueAmount}>
                      R$ {duvida?.valorSugerido?.toFixed(2).replace(".", ",")}
                    </span>
                    <div className="flex flex-col w-36 gap-2">
                      <button
                        className={styles.acceptButton}
                        onClick={handleAceitarPropostaDoAluno}
                      >
                        <FaCheck /> Aceitar Proposta
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.divider}>
                <span>OU</span>
              </div>

              <div className="flex flex-col mt-4 mb-4 text-gray-600">
                <h4 className="flex flex-row gap-2 mb-2 items-center">
                  <FaHistory /> Suas ofertas anteriores
                </h4>
                {minhasPropostas && minhasPropostas?.length > 0 ? (
                  <div className=" border-gray-200 shadow-sm border-2 rounded-2xl px-1 mb-2 gap-2">
                    {minhasPropostas?.map((prop) => (
                      <div
                        key={prop.id}
                        className="flex flex-row h-14 items-center justify-between p-4 gap-2"
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <span className="text-sm w-30 items-center">
                            R$ {prop.valor.toFixed(2)}
                          </span>
                          <span className="text-xs text-left w-full">
                            {prop.mensagem || "Sem mensagem"}
                          </span>
                        </div>
                        <button
                          className="cursor-pointer bg-blue-500 text-white rounded-2xl p-2"
                          onClick={() => handleDeletar(prop.id)}
                          disabled={excluindoId === prop.id}
                          title="Apagar proposta"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex mt-2 text-sm items-center justify-center">
                    Nenhuma Proposta enviada
                  </div>
                )}
              </div>
              {/* CONTRAPROPOSTA */}

              <div className={styles.formGroup}>
                <label htmlFor="contraproposta">Faça uma nova proposta:</label>
                <span className="flex mt-2 mb-2 text-xm text-gray-500 font-normal">
                  Valor:
                </span>
                <div className={styles.inputWrapper}>
                  <span className={styles.currencyPrefix}>R$</span>
                  <input
                    type="number"
                    id="contraproposta"
                    className={styles.valueInput}
                    placeholder="Ex: 75.00"
                    value={contraProposta}
                    onChange={(e) => setContraProposta(e.target.value)}
                  />
                  <button
                    className={styles.sendButton}
                    disabled={!contraProposta || enviando}
                    onClick={handleFazerProposta}
                  >
                    {enviando ? "Enviando..." : "Enviar"}
                  </button>
                </div>

                <div className="flex flex-col mt-4">
                  <span className="flex mt-2 text-xm text-gray-500 font-normal">
                    mensagem:
                  </span>

                  <div className="flex flex-col p-1 gap-1 mb-1 items-center justify-center">
                    <input
                      className="flex w-full m-3 h-11 border-2 border-gray-200 text-sm bg-gray-50 rounded-md px-2 p-1"
                      type="text"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

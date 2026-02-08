"use client";

import React, { useEffect, useState } from "react";
import styles from "./DuvidaDetalheAluno.module.css";
import { FaAngleLeft, FaCheck, FaUser, FaClock, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { formatTimeDifference, parseDate } from "@/utils/converterData";
import { getDuvidaWithProposta } from "@/services/get-duvida";
import { Duvida, Proposta } from "@/@types";
import Loading from "@/components/ui/Spinner";
import { aceitarPropostaAction } from "@/services/propostas";
import InfoTutor from "../InfoTutor/InfoTutor";

interface Props {
  duvidaId: string;
}

export function DuvidaDetalheAluno({ duvidaId }: Props) {
  const router = useRouter();
  const [duvida, setDuvida] = useState<Duvida>();
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      if (!duvidaId) return;
      try {
        const dados = await getDuvidaWithProposta(duvidaId);
        setDuvida(dados as Duvida);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, [duvidaId]);

  const handleAceitarProposta = async (propostaId: string, tutorId: string) => {
    // Confirmação para evitar cliques acidentais
    if (!confirm("Deseja fechar negócio com este tutor?")) return;

    setProcessando(true);
    const resultado = await aceitarPropostaAction(
      propostaId,
      duvidaId,
      tutorId,
    );

    if (resultado.success) {
      alert("Proposta aceita com sucesso!");
      // Opcional: Redirecionar para uma tela de chat ou acompanhamento
      // router.push(`/aluno/dashboard`);
    } else {
      alert(resultado.error);
    }
    setProcessando(false);
  };

  if (carregando)
    return (
      <div className={styles.loading}>
        <Loading /> Carregando detalhes...
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Cabeçalho */}
        <header className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FaAngleLeft />
          </button>
          <div className={styles.headerTitleGroup}>
            <h1 className={styles.pageTitle}>Minha Dúvida</h1>
            <span
              className={`${styles.statusBadge} ${styles[duvida?.status || "aberta"]}`}
            >
              {duvida?.status.replace("_", " ")}
            </span>
          </div>
        </header>

        <div className={styles.mainLayout}>
          {/* Lado Esquerdo: Info da Dúvida */}
          <section className={styles.detailsColumn}>
            <div className={styles.card}>
              <h2 className="text-lg font-semibold mt-2 mb-4">{duvida?.titulo}</h2>
              <div className={styles.metaGroup}>
                <span className={styles.metaBadge}>
                  Matéria: <b>{duvida?.materia}</b>
                </span>
                <span className={styles.metaBadge}>
                  Prazo: <b>{duvida ? parseDate(duvida.deadLine) : ""}</b>
                </span>
                <span className={styles.metaBadge}>
                  Meu Orçamento: <b>R$ {duvida?.valorSugerido?.toFixed(2)}</b>
                </span>
              </div>
              <div className={styles.descriptionSection}>
                <h3>O que eu perguntei:</h3>
                <p>{duvida?.descricao}</p>
              </div>
            </div>
          </section>

          {/* Lado Direito: Propostas Recebidas */}
          <section className={styles.proposalsColumn}>
            <div className={styles.card}>
              {duvida?.status !== "aceita" ? (
                <div>
                  <h3 className={styles.cardSubtitle}>
                    Propostas ({duvida?.propostas?.length || 0})
                  </h3>
                  <div className={styles.proposalsList}>
                    {duvida?.propostas && duvida.propostas.length > 0 ? (
                      duvida.propostas.map((prop) => (
                        <div  key={prop.id} className="flex flex-row w-full gap-1 items-center justify-between">
                          <div className={styles.proposalCard}>
                            <div className={styles.propHeader}>
                              <div className={styles.tutorInfo}>
                                <FaUser className={styles.tutorIcon} />
                                <div>
                                  <span className={styles.tutorName}>
                                    {prop.tutor?.nome}
                                  </span>
                                  <span className='flex flex-row text-sm text-gray-600'>
                                    {prop.tutor?.instituicao} - {prop.tutor?.curso} - {prop.tutor?.formacao}
                                  </span>
                                  <span className={styles.propTime}>
                                    {formatTimeDifference(prop.createdAt)}
                                  </span>
                                </div>
                              </div>
                              <span className={styles.propValue}>
                                R$ {prop.valor.toFixed(2).replace('.', ',')}
                              </span>
                            </div>

                            <p className={styles.propMessage}>
                              "
                              {prop.mensagem ||
                                "Olá! Posso te ajudar com essa questão."}
                              "
                            </p>
                          </div>
                          <div className={styles.propActions}>
                            <button
                              className={styles.acceptBtn}
                              disabled={processando}
                              onClick={() =>
                                handleAceitarProposta(prop.id, prop.tutorId)
                              }
                            >
                              <FaCheck />
                              {processando ? "Processando..." : "Escolher"}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.emptyProposals}>
                        <FaClock className={styles.emptyIcon} />
                        <p>Aguardando propostas de tutores...</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <InfoTutor
                    tutor={{
                      nome: duvida.tutor?.nome,
                      email: duvida.tutor?.email,
                      bio: duvida.tutor?.bio,
                      rating: 5.0
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

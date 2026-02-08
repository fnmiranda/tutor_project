import styles from "./DuvidaCard.module.css";
import { HiUserCircle } from "react-icons/hi";
import { Duvida } from "@/@types/index";
import { parseDate } from "@/utils/converterData";
import { useState } from "react";
import { ChatConversa } from "../Chat/Chat";
import { useRouter } from "next/navigation";

type DuvidaCardProps = {
  duvida: Duvida;
};

const getStatusClass = (status: string) => {
  if (status === "Respondida" || status === "concluida") {
    return styles.respondida;
  }
  if (status === "Aguardando Monitor" || status === "aberta") {
    return styles.aguardando;
  }
  if (status === "Em Negocição" || status === "em_negociacao") {
    return styles.em_negociacao;
  }
  return styles.default;
};

const DuvidaCard = ({ duvida }: DuvidaCardProps) => {
  const router = useRouter();

  if (!duvida) {
    return null;
  }

  const handleVerDetalhes = () => {
    router.push(`/aluno/dashboard/duvida/${duvida.id}`);
  };

  const [duvidaSelecionada, setDuvidaSelecionada] = useState<Duvida | null>(
    null
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        
        <h3 className={styles.titulo} onClick={handleVerDetalhes}>{duvida.titulo}</h3>
        <div className={styles.tags}>
          <span
            className={`${styles.tag} ${styles.statusTag} ${getStatusClass(
              duvida.status
            )}`}
          >
            {duvida.status === "concluida"
              ? "Respondida"
              : duvida.status === "aberta"
              ? "Aguardando Monitor"
              : duvida.status === 'em_negociacao'
              ? 'Em Negociação'
              : duvida.status}
          </span>
          <span className={`${styles.tag} ${styles.tagMateria}`}>
            {duvida.materia}
          </span>
        </div>
      </div>

      <p className={styles.conteudo}>{duvida.descricao}</p>

      <div className={styles.footer}>
        <div className={styles.footerInfoMonitor}>
          {duvida.tutorId ? (
            <>
              <HiUserCircle className={styles.iconMonitor} />
              <span>
                Respondido por:{" "}
                <strong className={styles.monitorNome}>{duvida.tutorId}</strong>
              </span>
            </>
          ) : (
            <span className={styles.aguardandoTexto}>
              Aguardando uma resposta...
            </span>
          )}
        </div>

        <div className={styles.footerAcoes}>
          <span className={styles.tempo}>{parseDate(duvida.deadLine)}</span>
          <button
            className={styles.btnVerConversa}
            onClick={() => setDuvidaSelecionada(duvida)}
          >
            Ver Conversa
          </button>
        </div>
      </div>

      {/* Lógica do Chat */}
      {duvidaSelecionada && (
        <div className={styles.chatOverlay}>
          <ChatConversa
            professorNome={duvidaSelecionada.tutorId || "Professor"}
            onClose={() => setDuvidaSelecionada(null)}
          />
        </div>
      )}
    </div>
  );
};

export { DuvidaCard };

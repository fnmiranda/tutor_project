import React from "react";
import styles from "./PayModal.module.css";
import { GoBook } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import Button from "@/components/botao/botao";

type Question = {
  id: string;
  title: string;
  details: string;
  subject: string;
  date: string;          // renomeei para date (inglês)
  priceSuggest: number;  // número para facilitar formatação
  priceAccepted?: number;
};

type QuestionProps = Omit<Question, "id">;

const currency = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const QuestionCard: React.FC<QuestionProps> = ({
  title,
  details,
  subject,
  date,
  priceSuggest,
  priceAccepted,
}) => {
  return (
    <article className={styles.question}>
      <header className={styles.qHeader}>
        <div className={styles.qTitle}>
          <span className={styles.iconWrap} aria-hidden>
            <GoBook />
          </span>
          <div>
            <span className={styles.evidence}>Sua questão</span>
            <div className={styles.qTitleText}>{title}</div>
          </div>
        </div>
      </header>

      <p className={styles.qDetails}>
        <span className={styles.evidence}>Detalhes Adicionais</span><br />
        {details}
      </p>

      <div className={styles.qMeta}>
        <div className={styles.meta}>
          <span className={styles.iconWrap} aria-hidden>
            <GoBook />
          </span>
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>Matéria</span>
            <span className={styles.evidence}>{subject}</span>
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.iconWrap} aria-hidden>
            <FaCalendarAlt />
          </span>
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>Submetido</span>
            <span className={styles.evidence}>{date}</span>
          </div>
        </div>
      </div>

      <div className={styles.prices}>
        <div className={styles.priceRow}>
          <span>Sua sugestão de preço</span>
          <span className={styles.priceValue}>{currency(priceSuggest)}</span>
        </div>
        <div className={styles.priceRow}>
          <span>Preço aceito pelo Professor</span>
          <span className={styles.priceValue}>
            {currency(priceAccepted ?? priceSuggest)}
          </span>
        </div>
      </div>
    </article>
  );
};

const PayModal: React.FC = () => {
  const questions: Question[] = [
    {
      id: "1",
      title: "Cálculo de Área com Integral Definida",
      details:
        "Calcule a área da região limitada pelas curvas y = x² e y = 2x - x² no intervalo [0,2]. Mostre todos os passos.",
      subject: "Matemática",
      date: "11/10/2025",
      priceSuggest: 10,
      priceAccepted: 12,
    },
    {
      id: "2",
      title: "Minha questão",
      details: "Faça X",
      subject: "Matemática",
      date: "11/10/2025",
      priceSuggest: 10,
    },
  ];

  const approved = true; // futuro backend

  return (
    <div className={styles.container} role="dialog" aria-modal="true" aria-labelledby="pay-title">
      <header className={styles.header}>
        <h2 id="pay-title" className={styles.headerText}>Complete seu pagamento</h2>
        <p className={styles.headerSubText}>
          Pague pela sua questão e receba uma resolução de um professor qualificado.
        </p>
      </header>

      <section className={styles.paymentSection}>
        <div className={approved ? styles.paymentStatusOk : styles.paymentStatusWarn}>
          {approved ? "✅ Pagamento aprovado" : "⚠️ Pagamento pendente"}
        </div>

        <div className={styles.questionsList}>
          {<QuestionCard {...questions[0]} />}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Professor X irá responder sua pergunta<br />
          Formado em Matemática — Álgebra
        </p>
        <Button type="submit"> Confirmar</Button>
      </footer>
    </div>
  );
};

export default PayModal;

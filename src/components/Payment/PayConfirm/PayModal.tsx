import React from 'react';
import styles from './PayModal.module.css';
import { GoBook } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";

interface Question {
  id: string;
  title: string;
  details: string;
  subject: string;
  data: string;
  priceSuggest: string;
}

interface QuestionProps {
  id: string;
  title: string;
  details: string;
  subject: string;
  data: string;
  priceSuggest: string;
}

const PayModal: React.FC = () => {
  const questions: Question[] = [
    {
      id: "1",
      title: "Cálculo de Área com Integral Definida",
      details: "Calcule a área da região limitada pelas curvas y = x² e y = 2x - x² no intervalo [0,2]. Mostre todos os passos da resolução, incluindo a montagem da integral, o cálculo da primitiva e o resultado final.",
      subject: "Matemática",
      data: "11/10/2025",
      priceSuggest: "10"
    },
    {
      id: "2",
      title: "Minha questão",
      details: "Faça X",
      subject: "Matemática",
      data: "11/10/2025",
      priceSuggest: "10"
    }
  ];

  const QuestionComponent: React.FC<QuestionProps> = ({
    title,
    details,
    subject,
    data,
    priceSuggest
  }) => {
    return (
      <div className={styles.questionContent}>
        <div className={styles.questionTitle}>
          <div className={styles.icon}>
            <GoBook />
          </div>
          <div>
            <span className={styles.titleEvidence}>Sua questão</span><br />
            {title}
          </div>
        </div>
        <div className={styles.questionDetails}>
          <span className={styles.titleEvidence}>Detalhes Adicionais <br /></span>
          {details}
        </div>
        <div className={styles.questionMeta}>
          <div className={styles.metaItems}>
            <div className={styles.icon}>
              <GoBook />
            </div>
            <div className={styles.metaItem}>
              Matéria <br />

              <span className={styles.titleEvidence}>{subject}</span>
            </div>
          </div>
          <div className={styles.metaItems}>
            <div className={styles.icon}>
              <FaCalendarAlt />
            </div>
            <div className={styles.metaItem}>
              Submetido<br />

              <span className={styles.titleEvidence}>{data}</span>
            </div>
          </div>
        </div>
        <div className={styles.price}>
          <span>Sua sugestão de preço</span>
          <span>
            R$ {priceSuggest}
          </span>
        </div>
        <div className={styles.price}>
          <span>Preço aceito pelo Professor</span>
          <span>
            R$ {priceSuggest}
          </span>
        </div>

      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          Complete seu pagamento
        </div>
        <div className={styles.headerSubText}>
          Pague pela sua questão e receba uma resolução de um professor qualificado.
        </div>

      </div>
      <div className={styles.paymentSection}>
        <div className={styles.paymentStatus}>
          ✅ Pagamento da questão ID XX - Aprovado
        </div>

        <div className={styles.questionsList}>

          <QuestionComponent
            key={questions[0].id}
            {...questions[0]}
          />

        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerText}>
          Professor X irá responder sua pergunta<br />
          Formado em Matemática - Algebra
        </div>
      </div>
    </div>
  );
};

export default PayModal;

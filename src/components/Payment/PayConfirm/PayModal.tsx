import React from 'react';
import styles from './PayModal.module.css';

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
      title: "Minha questão",
      details: "Faça X",
      subject: "Matemática",
      data: "11/10/2025",
      priceSuggest: "10 R$"
    },
    {
      id: "2",
      title: "Minha questão",
      details: "Faça X",
      subject: "Matemática",
      data: "11/10/2025",
      priceSuggest: "10 R$"
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
        <div className={styles.questionTitle}>{title}</div>
        <div className={styles.questionDetails}>{details}</div>
        <div className={styles.questionMeta}>
          <div className={styles.metaItem}>
            📚 {subject}
          </div>
          <div className={styles.metaItem}>
            📅 {data}
          </div>
        </div>
        <div className={styles.price}>💵 {priceSuggest}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Complete seu pagamento
      </div>

      <div className={styles.paymentSection}>
        <div className={styles.paymentStatus}>
          ✅ Pagamento da questão ID XX - Aprovado
        </div>

        <div className={styles.questionsList}>
          {questions.map(question => (
            <QuestionComponent
              key={question.id}
              id={question.id}
              title={question.title}
              details={question.details}
              subject={question.subject}
              data={question.data}
              priceSuggest={question.priceSuggest}
            />
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerText}>
          Professor X aceitou o pagamento
        </div>
      </div>
    </div>
  );
};

export default PayModal;

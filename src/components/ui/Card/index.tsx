import React from 'react';
import styles from './Cards.module.css';

// Um Card precisa renderizar conteúdo dentro dele ('children').
// Também podemos adicionar uma prop opcional 'title'.
// E herdamos as props de uma <div>, como 'className', para maior flexibilidade.
type CardProps = {
  children: React.ReactNode;
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({ children, title, ...props }) => {
  return (
    // Passamos o 'className' e as outras props para a div principal
    <div className={styles.card} {...props}>
      {title && <h2 className={styles.cardTitle}>{title}</h2>}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export {Card};
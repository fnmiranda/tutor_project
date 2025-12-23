"use client";

import React from 'react';
import styles from './carregamento.module.css';

const Carregamento: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Carregamento;
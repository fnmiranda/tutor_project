"use client";

import React from 'react';
import Card from '../../../components/Cards';
import Button from '../../../components/botao/botao';
import styles from './erro.module.css';

const Erro: React.FC = () => {
  const irParaInicio = () => {
    window.location.href = '/'; 
  };

  return (
    <div className={styles.pageContainer}>
      <Card title="Oops! Algo deu errado.">
        <p>A página que você está procurando não foi encontrada ou ocorreu um erro inesperado.</p>
        <Button onClick={irParaInicio}>Voltar para o Início</Button>
      </Card>
    </div>
  );
};

export default Erro;
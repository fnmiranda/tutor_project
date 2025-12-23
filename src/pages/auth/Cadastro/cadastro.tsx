"use client";

import React, { useState } from 'react';
import Card from '../../../components/cards/cards';
import Input from '../../../components/input/input';
import Button from '../../../components/botao/botao';
import styles from './cadastro.module.css';

interface ErrosCadastro {
  nome?: string;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
}

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erros, setErros] = useState<ErrosCadastro>({});

  const validar = (): ErrosCadastro => {
    const novosErros: ErrosCadastro = {};
    if (!nome) novosErros.nome = 'O nome é obrigatório.';
    if (!email) {
      novosErros.email = 'O email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = 'O formato do email é inválido.';
    }
    if (!senha) {
      novosErros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }
    return novosErros;
  };

  const aoEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    const errosDeValidacao = validar();
    setErros(errosDeValidacao);
    if (Object.keys(errosDeValidacao).length === 0) {
      console.log('Dados do Cadastro:', { nome, email, senha });
      alert('Cadastro efetuado com sucesso! (Simulação)');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Card title="Criar Conta">
        <form onSubmit={aoEnviar} noValidate>
          <Input
            label="Nome Completo"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <p className={styles.errorText}>{erros.nome}</p>}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erros.email && <p className={styles.errorText}>{erros.email}</p>}
          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erros.senha && <p className={styles.errorText}>{erros.senha}</p>}
          <Input
            label="Confirmar Senha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          {erros.confirmarSenha && <p className={styles.errorText}>{erros.confirmarSenha}</p>}
          <Button type="submit">Cadastrar</Button>
        </form>
      </Card>
    </div>
  );
};

export default Cadastro;
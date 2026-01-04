"use client";

import React, { useState } from 'react';
import Card from '../../../components/cards/cards';
import Input from '../../../components/input/input';
import Button from '../../../components/botao/botao';
import styles from './cadastro.module.css';
import Link from 'next/link';

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
    <div className={styles.pageContainer}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1655800466797-8ab2598b4274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBlZHVjYXRpb258ZW58MXx8fHwxNzY2NDMwMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
      }}
    >
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
          <div className={styles.passwordInt}>
            <div className="item"> 1 letra maiúscula</div>
            <div className="item"> 1 letra minúscula</div>
            <div className="item">8 caracteres</div>
            <div className="item">1 número</div>
          </div>
          {erros.confirmarSenha && <p className={styles.errorText}>{erros.confirmarSenha}</p>}

          <Button type="submit">Cadastrar</Button>
          <div className='mt-2 text-center'>
            <Link href='#'>Já possui uma conta</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Cadastro;

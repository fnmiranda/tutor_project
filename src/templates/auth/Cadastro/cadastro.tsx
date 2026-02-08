"use client";

import React, { useState } from 'react';
import styles from './cadastro.module.css';
import { MdOutlineArrowBack, MdPersonOutline, MdOutlineMail, MdLockOutline, MdShieldMoon } from 'react-icons/md';

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
    } else if (senha.length < 8) {
      novosErros.senha = 'A senha deve ter no mínimo 8 caracteres.';
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
      alert('Cadastro efetuado com sucesso!');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        {/* Botão Voltar conforme imagem de login */}
        {/*
        <Link href="/" className={styles.backLink}>
          <MdOutlineArrowBack size={20} />
          <span>Voltar</span>
        </Link>
        <div className={styles.iconHeader}>
          <MdShieldMoon size={32} color="white" />
        </div>

      */}
        <h1 className={styles.title}>Criar Conta</h1>
        <p className={styles.subtitle}>Preencha os dados abaixo para se cadastrar no Tunno</p>

        <form onSubmit={aoEnviar} noValidate className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome Completo</label>
            <div className={styles.inputWrapper}>
              <MdPersonOutline className={styles.inputIcon} />
              <input
                type="text"
                className={styles.customInput}
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            {erros.nome && <p className={styles.errorText}>{erros.nome}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <MdOutlineMail className={styles.inputIcon} />
              <input
                type="email"
                className={styles.customInput}
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {erros.email && <p className={styles.errorText}>{erros.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha</label>
            <div className={styles.inputWrapper}>
              <MdLockOutline className={styles.inputIcon} />
              <input
                type="password"
                className={styles.customInput}
                placeholder="........"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            {erros.senha && <p className={styles.errorText}>{erros.senha}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirmar Senha</label>
            <div className={styles.inputWrapper}>
              <MdLockOutline className={styles.inputIcon} />
              <input
                type="password"
                className={styles.customInput}
                placeholder="........"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.passwordRequirements}>
            <div className={styles.reqItem}>• 1 letra maiúscula</div>
            <div className={styles.reqItem}>• 1 letra minúscula</div>
            <div className={styles.reqItem}>• 8 caracteres</div>
            <div className={styles.reqItem}>• 1 número</div>
          </div>

          {erros.confirmarSenha && <p className={styles.errorText}>{erros.confirmarSenha}</p>}

          <button type="submit" className={styles.submitButton}>Cadastrar</button>
          {/*
          <div className={styles.footerLink}>
            <span>Já possui uma conta?</span>
            <Link href="/login" className={styles.blueLink}>Entrar</Link>
          </div>
*/}
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

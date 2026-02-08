import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import { UserType } from '../LoginForm/LoginForm';

interface RegisterFormProps {
  type: UserType;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ type, onBack, onSwitchToLogin }) => {
  const isProfessor = type === 'tutor';
  const themeClass = isProfessor ? styles.professorTheme : styles.alunoTheme;

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Payload de Registro:", formData);
  };

  return (
    <div className={styles.card}>
      <button className={styles.backButton} onClick={onBack} type="button">
        <span>←</span> Voltar
      </button>

      <div className={`${styles.iconBox} ${themeClass}`}>
        <span className={styles.lockIcon}>📝</span>
      </div>

      <h2 className={styles.title}>
        Cadastro de {isProfessor ? 'Professor' : 'Aluno'}
      </h2>
      <p className={styles.subtitle}>Preencha os campos para criar sua conta</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome Completo</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>👤</span>
            <input
              id="nome"
              type="text"
              placeholder="Ex: João Silva"
              required
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>✉</span>
            <input
              id="email"
              type="email"
              placeholder="exemplo@tunno.com"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🛡️</span>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repita sua senha"
              required
              onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className={`${styles.submitBtn} ${themeClass}`}>
          Criar Conta
        </button>

        <p className={styles.switchText}>
          Já possui conta?
          <span
            className={styles.switchLink}
            style={{ color: isProfessor ? '#1a4cd8' : '#9d1df2' }}
            onClick={onSwitchToLogin}
          >
            Fazer Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

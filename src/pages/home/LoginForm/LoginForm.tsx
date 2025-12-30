import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

// Definimos os tipos permitidos para o componente
export type UserType = 'tutor' | 'aluno';

interface LoginFormProps {
  type: UserType;
  onBack: () => void;
  onSwitchToRegister: () => void;// Função sem retorno para o botão voltar
}
interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ type, onBack, onSwitchToRegister }) => {
  const isProfessor = type === 'tutor';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>(type);
  const { login } = useAuth();

  // Classe de tema baseada no tipo
  const themeClass = isProfessor ? styles.professorTheme : styles.alunoTheme;

  const [errors, setErrors] = useState<LoginErrors>({});
  const validate = (): LoginErrors => {
    const newErrors: LoginErrors = {};

    if (!email) {
      newErrors.email = 'O campo de email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O formato do email é inválido.';
    }

    if (!password) {
      newErrors.password = 'O campo de senha é obrigatório.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    return newErrors;
  };
  // Handler para o formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Logando como ${type}`);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login(email, userType);
    }
  };

  return (
    <div className={styles.card}>
      <button className={styles.backButton} onClick={onBack} type="button">
        <span>←</span> Voltar
      </button>

      <div className={`${styles.iconBox} ${themeClass}`}>
        <span className={styles.lockIcon}>🔒</span>
      </div>

      <h2 className={styles.title}>
        Login como {isProfessor ? 'Tutor' : 'Aluno'}
      </h2>
      <p className={styles.subtitle}>Digite suas credenciais para acessar o sistema</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>✉</span>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="seu.email@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              id="password"
              type="password"
              placeholder="........"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>
        </div>

        <div className={styles.options}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Lembrar-me
          </label>
          <a href="#forgot" className={styles.forgotPass}>Esqueceu a senha?</a>
        </div>

        <button type="submit" className={`${styles.submitBtn} ${themeClass}`}>
          Entrar
        </button>

        <p className={styles.switchText}>
          Não possui conta?
          <span
            className={styles.switchLink}
            style={{ color: isProfessor ? '#1a4cd8' : '#9d1df2' }}
            onClick={onSwitchToRegister}
          >
            Criar
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

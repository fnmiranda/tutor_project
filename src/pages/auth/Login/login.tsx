"use client";
import React, { useState } from 'react';
import Card from '../../../components/cards/cards';
import Input from '../../../components/input/input';
import Button from '../../../components/botao/botao';
import styles from './login.module.css';
import { useAuth } from '@/context/authContext';

// Interface para definir a forma do nosso objeto de erros
interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  // 1. Estados para os valores dos inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno');
  const { login } = useAuth();

  // 2. Estado para as mensagens de erro de validação
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login(email, password, userType);
    }
  };

  return (
    <div className={styles.pageContainer}>

      <Card title="Login">
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src="logo.png" // substitua pelo caminho correto da imagem
            alt="Logo TUNNO"
            className="w-32 h-auto sm:w-30 md:w-38"
          />
          <span className="text-xl font-semibold tracking-wide text-slate-800">
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            type="button"
            style={{
              padding: '0.5rem 1rem',
              background: userType === 'aluno' ? '#3b82f6' : '#e5e7eb',
              color: userType === 'aluno' ? 'white' : 'black',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onClick={() => setUserType('aluno')}
          >
            Aluno
          </button>
          <button
            type="button"
            style={{
              padding: '0.5rem 1rem',
              background: userType === 'professor' ? '#10b981' : '#e5e7eb',
              color: userType === 'professor' ? 'white' : 'black',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onClick={() => setUserType('professor')}
          >
            Professor
          </button>
        </div>


        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}

          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;

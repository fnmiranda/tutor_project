"use client";

import React, { useState } from 'react';
import Card from '../../../components/cards/cards';
import Input from '../../../components/input/input';
import Button from '../../../components/botao/botao';
import styles from './login.module.css';

// Interface para definir a forma do nosso objeto de erros
interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  // 1. Estados para os valores dos inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Estado para as mensagens de erro de validação
  const [errors, setErrors] = useState<LoginErrors>({});

  // 3. Função de Validação
  const validate = (): LoginErrors => {
    const newErrors: LoginErrors = {};
    
    // Validação de Email
    if (!email) {
      newErrors.email = 'O campo de email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O formato do email é inválido.';
    }

    // Validação de Senha
    if (!password) {
      newErrors.password = 'O campo de senha é obrigatório.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    return newErrors;
  };

  // 4. Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página

    const validationErrors = validate();
    setErrors(validationErrors);

    // Se não houver erros, podemos prosseguir com a lógica de login
    if (Object.keys(validationErrors).length === 0) {
      console.log('Dados do Login:', { email, password });
      alert('Login efetuado com sucesso! (Simulação)');
      // Aqui você faria a chamada para a sua API de backend
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Card title="Login">
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
// Adicione esta linha se estiver usando Next.js 13+ (App Router)
"use client"; 

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setError(''); 
    setIsLoading(true); 
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (email === 'user@example.com' && password === 'password123') {
        alert('Login bem-sucedido!');
      } else {
        throw new Error('Email ou senha inválidos.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Os 'className' agora são strings normais, não mais 'styles.container'
    <div className="container">
      <div className="loginBox">
        <h2 className="title">Acessar Conta</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="links">
          <a href="#">Esqueceu sua senha?</a>
          <span>|</span>
          <a href="#">Criar uma conta</a>
        </div>
      </div>

      {/* --- ESTILOS DIRETAMENTE NO COMPONENTE --- */}
      {/* O CSS aqui só se aplica a este componente, evitando conflitos. */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f2f5;
          font-family: Arial, sans-serif;
        }
        .loginBox {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .title {
          text-align: center;
          margin-bottom: 24px;
          color: #1c1e21;
          font-size: 24px;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        .inputGroup {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
        }
        .inputGroup label {
          margin-bottom: 8px;
          font-weight: bold;
          color: #606770;
        }
        .inputGroup input {
          padding: 12px;
          border: 1px solid #dddfe2;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        .inputGroup input:focus {
          outline: none;
          border-color: #1877f2;
          box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
        }
        .button {
          padding: 12px;
          background-color: #1877f2;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
        }
        .button:hover {
          background-color: #166fe5;
        }
        .button:disabled {
          background-color: #9cbce0;
          cursor: not-allowed;
        }
        .error {
          color: #fa383e;
          background-color: #ffebe6;
          border: 1px solid #fa383e;
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 16px;
          text-align: center;
          font-size: 14px;
        }
        .links {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
        }
        .links a {
          color: #1877f2;
          text-decoration: none;
        }
        .links a:hover {
          text-decoration: underline;
        }
        .links span {
          margin: 0 8px;
          color: #ccc;
        }
      `}</style>
    </div>
  );
}

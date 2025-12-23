'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { routes } from '@/routes/routes';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'aluno' | 'professor' | null;
  userData: any;
  isLoading: boolean; // ADICIONE ESTE ESTADO
  login: (email: string, password: string, type: 'aluno' | 'professor') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'aluno' | 'professor' | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // INICIA CARREGANDO

  // Carrega estado do localStorage ao iniciar
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedType = localStorage.getItem('userType');
    const savedData = localStorage.getItem('userData');

    if (savedAuth === 'true' && savedType) {
      setIsAuthenticated(true);
      setUserType(savedType as 'aluno' | 'professor');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    }

    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, type: 'aluno' | 'professor') => {
    console.log('🔐 Tentando login:', { email, type });

    // Validação mock
    if (email && password.length >= 6) {
      setIsLoading(true);

      // Simula delay de API
      setTimeout(() => {
        const mockData = type === 'aluno'
          ? {
            id: 1,
            nome: "João Silva",
            email,
            tipo: "aluno",
            matricula: "20230001"
          }
          : {
            id: 2,
            nome: "Prof. Maria Santos",
            email,
            tipo: "professor",
            departamento: "Matemática"
          };

        setIsAuthenticated(true);
        setUserType(type);
        setUserData(mockData);

        // Salva no localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', type);
        localStorage.setItem('userData', JSON.stringify(mockData));

        setIsLoading(false);

        console.log('✅ Login bem-sucedido! Redirecionando...');

        // Redireciona baseado no tipo - USA window.location
        if (type === 'aluno') {
          window.location.href = '/student/dashboard';
        } else {
          window.location.href = '/teacher/dashboard';
        }
      }, 500);
    } else {
      alert('Credenciais inválidas! Use email válido e senha com 6+ caracteres.');
    }
  };

  const logout = () => {
    console.log('🚪 Fazendo logout...');
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);

    // Limpa localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');

    // Redireciona para login
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userType,
      userData,
      isLoading, // EXPORTA isLoading
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

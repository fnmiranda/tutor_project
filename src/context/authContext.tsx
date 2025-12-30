'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes/routes';
import { logOut, signIn } from '@/database/mockAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'aluno' | 'tutor' | null;
  userData: any;
  isLoading: boolean;
  login: (email: string, type: 'aluno' | 'tutor') => void;
  register: (name: string, email: string, type: 'aluno' | 'tutor') => void; // Adicionado
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'aluno' | 'tutor' | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedType = localStorage.getItem('userType');
    const savedData = localStorage.getItem('userData');

    if (savedAuth === 'true' && savedType) {
      setIsAuthenticated(true);
      setUserType(savedType as 'aluno' | 'tutor');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, type: 'aluno' | 'tutor') => {
    setIsLoading(true);
    try {
      await signIn(email, type);

      setIsAuthenticated(true);
      setUserType(type);

      const savedData = localStorage.getItem('userData');

      if (savedData) setUserData(JSON.parse(savedData));

      const destination = type === 'aluno' ? routes.aluno.dashboard : routes.tutor.dashboard;
      router.push(destination);

    } catch (error) {
      alert("Falha ao entrar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = (name: string, email: string, type: 'aluno' | 'tutor') => {
    setIsLoading(true);

    setTimeout(() => {
      login(email, type);
    }, 1000);
  };

  const logout = () => {
    logOut();
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
    router.push(routes.login);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, userData, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

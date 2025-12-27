'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes/routes';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'aluno' | 'tutor' | null;
  userData: any;
  isLoading: boolean;
  login: (email: string, type: 'aluno' | 'tutor') => void;
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
      if (savedData) setUserData(JSON.parse(savedData));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, type: 'aluno' | 'tutor') => {
    setIsLoading(true);
    const mockData = { email, nome: type === 'aluno' ? 'João Aluno' : 'Prof. Tutor' };

    setIsAuthenticated(true);
    setUserType(type);
    setUserData(mockData);

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
    localStorage.setItem('userData', JSON.stringify(mockData));

    setIsLoading(false);
    router.push(type === 'aluno' ? routes.aluno.dashboard : routes.tutor.dashboard);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
    router.push(routes.login);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, userData, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};

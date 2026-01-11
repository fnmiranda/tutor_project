'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes/routes';

import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'aluno' | 'tutor' | null;
  userData: any;
  isLoading: boolean;
  login: (email: string, password: string, type: 'aluno' | 'tutor') => void;
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
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        try {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const profile = await res.json();

            setUserData(profile);
            setUserType(profile.tipo)
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
        }
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);



  // ... dentro do AuthProvider
  const login = async (email: string, password: string, userType: string) => {
    setIsLoading(true);
    try {
      // O SDK do Supabase faz verificação da senha e geração do JWT
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Busca o perfil detalhado no Prisma usando o ID do Supabase Auth
      // Nota: Esta chamada deve ser feita via API ou Server Action para segurança
      const response = await fetch('/api/auth/me');
      const userProfile = await response.json();

      setIsAuthenticated(true);
      setUserData(userProfile);
      setUserType(userProfile.tipo)
      
      alert(userProfile.tipo)
      router.push(userProfile.tipo === 'aluno' ? '/aluno/dashboard' : '/tutor/dashboard');
    } catch (error) {
      alert("Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  const register = (name: string, email: string, type: 'aluno' | 'tutor') => {
    setIsLoading(true);

    setTimeout(() => {
      //     login(email, password, type);
    }, 1000);
  };

  const logout = async () => {
    await supabase.auth.signOut();
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

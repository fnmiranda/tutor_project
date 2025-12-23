'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Student, Teacher, UserRole } from '@/@types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mock para simulação
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'aluno@teste.com',
    role: 'student',
    enrollment: '20230001',
    course: 'Engenharia',
    semester: 3
  }
];

const mockTeachers: Teacher[] = [
  {
    id: '2',
    name: 'Maria Santos',
    email: 'professor@teste.com',
    role: 'teacher',
    department: 'Matemática',
    employeeId: 'PROF001'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Simulação de login sem API
    console.log(`Tentando login: ${email} como ${role}`);

    if (role === 'student') {
      const student = mockStudents.find(u => u.email === email);
      if (student && password === '123456') {
        setUser(student);
        localStorage.setItem('user', JSON.stringify(student));
        localStorage.setItem('role', 'student');
        console.log('Aluno logado:', student);
        return;
      }
    } else if (role === 'teacher') {
      const teacher = mockTeachers.find(u => u.email === email);
      if (teacher && password === '123456') {
        setUser(teacher);
        localStorage.setItem('user', JSON.stringify(teacher));
        localStorage.setItem('role', 'teacher');
        console.log('Professor logado:', teacher);
        return;
      }
    }

    alert('Credenciais inválidas! Use email aluno@teste.com ou professor@teste.com com senha 123456');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    console.log('Usuário deslogado');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

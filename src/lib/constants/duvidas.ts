import { Duvida } from '@/@types';

// Versão com ID vazio (para novos registros)
export const EMPTY_DUVIDA: Duvida = {
  id: '',
  titulo: '',
  materia: '',
  descricao: '',
  status: 'aberta',
  aluno: {
    nome: '',
    email: '',
  },
  tutorId: null,
  createdAt: new Date(),
  deadLine: new Date(new Date().setDate(new Date().getDate() + 7)), 
};

export const DISCIPLINAS: string[] = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Biologia',
  'Física',
  'Química',
  'Inglês',
  'Espanhol',
  'Artes',
  'Educação Física',
  'Filosofia',
  'Sociologia',
  'Redação',
  'Literatura',
  'Gramática',
  'Programação',
] as const;

export type Disciplina = typeof DISCIPLINAS[number];
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'aluno' | 'tutor';
  createdAt: Date;
  bio: string | null;
  instituicao?: string | null;
  curso?: string | null;
  formacao?: string | null;
  especialidades?: string[] | null;
  cidade?: string | null;
  estado?: string | null;
}

export interface Proposta {
  id: string;
  valor: number;
  mensagem: string | null;
  status: 'pendente' | 'aceita' | 'recusada';
  duvidaId: string;
  tutorId: string;
  tutor?: Partial<Usuario>; 
  createdAt: Date;
}

export interface Duvida {
  id: string;
  titulo: string;
  materia: string;
  descricao: string;
  status: 'aberta' | 'em_negociacao' | 'aceita' | 'concluida';
  valorSugerido: number | null;
  alunoId: string;
  aluno: {
    nome: string;
    email: string;
    bio?: string | null;
  };
  tutorId: string | null;
  tutor?: Partial<Usuario> | null;
  propostas?: Proposta[]; // Lista de ofertas que o aluno visualiza
  createdAt: Date;
  deadLine: Date;
}

export type StatusDuvidaOption = 'aberta' | 'em_negociacao' | 'aceita' | 'concluida';
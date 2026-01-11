
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  createdAt: Date;
  bio: string | null;

}

export interface Duvida {
  id: string;
  titulo: string;
  materia: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'concluida';
  aluno:{
    nome: string;
    email: string;
  };
  tutorId: string | null;
  createdAt: Date;
  deadLine: Date;
}

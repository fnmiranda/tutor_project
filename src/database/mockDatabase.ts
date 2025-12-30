'use client';

// Tipagem para a Dúvida
export interface Duvida {
  id: string;
  titulo: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'concluida';
  alunoId: string;
  alunoNome: string;
  tutorId: string | null;
  createdAt: string;
}

// Dados iniciais para teste
let duvidas: Duvida[] = [
  {
    id: "36b8f84d-df4e-4d49-b662-bcde71a8764f",
    titulo: "Dúvida sobre Derivadas",
    descricao: "Não entendi como aplicar a regra da cadeia nesta função...",
    status: 'aberta',
    alunoId: "user-123",
    alunoNome: "João Silva",
    tutorId: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "a8j2k9l1-58cc-4372-a567-0e02b2c3d479",
    titulo: "Erro no useEffect",
    descricao: "Meu hook está entrando em loop infinito, podem ajudar?",
    status: 'em_andamento',
    alunoId: "user-123",
    alunoNome: "João Silva",
    tutorId: "tutor-456",
    createdAt: new Date().toISOString()
  }
];

// Métodos que simulam o Firestore
export const mockDB = {
  // Buscar todas as dúvidas abertas (para o Tutor)
  getDuvidasAbertas: async (): Promise<Duvida[]> => {
    await new Promise(res => setTimeout(res, 500)); // Simula delay
    return duvidas.filter(d => d.status === 'aberta');
  },

  // Buscar dúvida específica por ID seguro
  getDuvidaById: async (id: string): Promise<Duvida | undefined> => {
    await new Promise(res => setTimeout(res, 300));
    return duvidas.find(d => d.id === id);
  },

  // Aluno cria nova dúvida
  criarDuvida: async (titulo: string, descricao: string, alunoId: string, alunoNome: string) => {
    const nova: Duvida = {
      id: crypto.randomUUID(), // Gera o ID seguro que discutimos
      titulo,
      descricao,
      status: 'aberta',
      alunoId,
      alunoNome,
      tutorId: null,
      createdAt: new Date().toISOString()
    };
    duvidas.push(nova);
    return nova;
  },

  // Tutor aceita resolver a dúvida
  aceitarDuvida: async (duvidaId: string, tutorId: string) => {
    duvidas = duvidas.map(d =>
      d.id === duvidaId ? { ...d, status: 'em_andamento', tutorId } : d
    );
    return true;
  }
};

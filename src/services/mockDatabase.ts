'use client';


// Tipagem para a Dúvida
export interface Duvida {
  id: string;
  titulo: string;
  materia: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'concluida';
  alunoId: string;
  alunoNome: string;
  tutorId: string | null;
  createdAt: string;
  deadLine: string;
}


export let mockDuvidas: Duvida[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    titulo: "Dúvida sobre derivadas",
    materia: "Matemática",
    status: "concluida",
    descricao: "Não estou conseguindo entender como calcular derivadas de funções compostas.",
    alunoId: "70662e7c-b030-46ff-8d9a-31130099083b",
    alunoNome: "Estudante Exemplar",
    tutorId: "tutor-silva",
    createdAt: "2023-10-25T10:00:00Z",
    deadLine: "2023-10-27T10:00:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    titulo: "Ajuda em Leis de Newton",
    materia: "Física",
    status: "aberta",
    descricao: "Preciso de ajuda para entender a aplicação da segunda lei de Newton.",
    alunoId: "70662e7c-b030-46ff-8d9a-31130099083b",
    alunoNome: "Isaac Newton Jr",
    tutorId: null,
    createdAt: "2023-10-27T08:00:00Z",
    deadLine: "2023-10-28T08:00:00Z"
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    titulo: "Análise sintática de oração",
    materia: "Português",
    status: "concluida",
    descricao: "Tive dificuldade em identificar o sujeito e predicado nesta frase, mas o monitor me ajudou!",
    alunoId: "aluno-003",
    alunoNome: "Machado de Assis Neto",
    tutorId: "monitora-bia",
    createdAt: "2023-10-20T14:00:00Z",
    deadLine: "2023-10-22T14:00:00Z"
  },
  {
    id: "d9b2d63d-a233-41a9-a3fc-1421f64983e2",
    titulo: "Revolução Francesa - Causas",
    materia: "História",
    status: "aberta",
    descricao: "Quais foram os principais fatores econômicos que levaram à Revolução Francesa?",
    alunoId: "70662e7c-b030-46ff-8d9a-31130099083b",
    alunoNome: "Napoleão B.",
    tutorId: null,
    createdAt: "2023-10-27T11:40:00Z",
    deadLine: "2023-10-29T11:40:00Z"
  },
  {
    id: "7d444840-9dc0-11d1-b245-5ffd00c04f54",
    titulo: "Balanceamento de equação química",
    materia: "Química",
    status: "concluida",
    descricao: "Estou com dificuldade no método de oxirredução para balancear esta equação: ...",
    alunoId: "aluno-005",
    alunoNome: "Marie Curie",
    tutorId: "monitor-carlos",
    createdAt: "2023-10-26T09:00:00Z",
    deadLine: "2023-10-28T09:00:00Z"
  },
  {
    id: "e4eaaaf2-d142-11e1-b3e4-080027620cdd",
    titulo: "Diferença entre Mitose e Meiose",
    materia: "Biologia",
    status: "concluida",
    descricao: "Alguém pode me explicar de forma simples as principais diferenças?",
    alunoId: "aluno-006",
    alunoNome: "Darwin Jr",
    tutorId: "profa-ana",
    createdAt: "2023-10-24T10:00:00Z",
    deadLine: "2023-10-26T10:00:00Z"
  },
  {
    id: "2777176d-d142-11e1-b3e4-080027620cdd",
    titulo: "Problema com 'git push'",
    materia: "Programação",
    status: "aberta",
    descricao: "Estou recebendo um erro de autenticação ao tentar enviar meu código para o GitHub.",
    alunoId: "aluno-007",
    alunoNome: "Linus T.",
    tutorId: null,
    createdAt: "2023-10-27T11:00:00Z",
    deadLine: "2023-10-28T11:00:00Z"
  },
  {
    id: "3e660f5e-d142-11e1-b3e4-080027620cdd",
    titulo: "Uso da crase",
    materia: "Português",
    status: "concluida",
    descricao: "Quando devo usar crase antes de nomes de lugares? Ex: 'Vou à Bahia' vs 'Vou a Recife'.",
    alunoId: "aluno-008",
    alunoNome: "Clarice L.",
    tutorId: "monitora-bia",
    createdAt: "2023-10-27T06:00:00Z",
    deadLine: "2023-10-28T06:00:00Z"
  },
  {
    id: "4d6f4f2e-d142-11e1-b3e4-080027620cdd",
    titulo: "Conceito de Molaridade",
    materia: "Química",
    status: "aberta",
    descricao: "Não entendi a fórmula de molaridade (M = n/V). O que 'n' representa?",
    alunoId: "user-0tt0sipbb",
    alunoNome: "Dalton",
    tutorId: null,
    createdAt: "2023-10-27T11:15:00Z",
    deadLine: "2023-10-28T11:15:00Z"
  },
  {
    id: "5f7d8e9a-d142-11e1-b3e4-080027620cdd",
    titulo: "Tempos verbais em Inglês",
    materia: "Inglês",
    status: "em_andamento",
    descricao: "Diferença entre 'Past Simple' e 'Present Perfect'. Já entendi, obrigado!",
    alunoId: "aluno-010",
    alunoNome: "Shakespeare",
    tutorId: "monitor-dave",
    createdAt: "2023-10-22T10:00:00Z",
    deadLine: "2023-10-24T10:00:00Z"
  },
  {
    id: "6a8b9c0d-d142-11e1-b3e4-080027620cdd",
    titulo: "Problema com Eletromagnetismo",
    materia: "Física",
    status: "concluida",
    descricao: "Como a regra da mão direita funciona para campos magnéticos?",
    alunoId: "aluno-011",
    alunoNome: "Faraday",
    tutorId: "prof-marcos",
    createdAt: "2023-10-25T10:00:00Z",
    deadLine: "2023-10-27T10:00:00Z"
  },
  {
    id: "7b9c0d1e-d142-11e1-b3e4-080027620cdd",
    titulo: "Figuras de Linguagem",
    materia: "Literatura",
    status: "em_andamento",
    descricao: "Qual a diferença entre metáfora e metonímia? Poderiam dar exemplos?",
    alunoId: "aluno-012",
    alunoNome: "Cecília M.",
    tutorId: null,
    createdAt: "2023-10-27T09:00:00Z",
    deadLine: "2023-10-28T09:00:00Z"
  },
  {
    id: "8c0d1e2f-d142-11e1-b3e4-080027620cdd",
    titulo: "Instalação do Python",
    materia: "Programação",
    status: "em_andamento",
    descricao: "Não estava conseguindo adicionar o Python ao PATH do Windows, mas consegui resolver reinstalando.",
    alunoId: "aluno-013",
    alunoNome: "Guido Van Rossum",
    tutorId: "aluno-013",
    createdAt: "2023-10-20T10:00:00Z",
    deadLine: "2023-10-21T10:00:00Z"
  },
  {
    id: "9d1e2f3a-d142-11e1-b3e4-080027620cdd",
    titulo: "Calculando pH",
    materia: "Química",
    status: "concluida",
    descricao: "Como calculo o pH de uma solução de ácido forte? Ex: HCl 0.01M",
    alunoId: "aluno-005",
    alunoNome: "Marie Curie",
    tutorId: "monitor-carlos",
    createdAt: "2023-10-27T04:00:00Z",
    deadLine: "2023-10-28T04:00:00Z"
  },
  {
    id: "0e1f2a3b-d142-11e1-b3e4-080027620cdd",
    titulo: "Guerra Fria - Resumo",
    materia: "História",
    status: "aberta",
    descricao: "Preciso de um resumo dos principais conflitos indiretos da Guerra Fria.",
    alunoId: "aluno-014",
    alunoNome: "Gorbachev",
    tutorId: null,
    createdAt: "2023-10-26T12:00:00Z",
    deadLine: "2023-10-28T12:00:00Z"
  },
  {
    id: "1a2b3c4d-d142-11e1-b3e4-080027620cdd",
    titulo: "Logaritmos",
    materia: "Matemática",
    status: "aberta",
    descricao: "Não entendi a propriedade de mudança de base em logaritmos.",
    alunoId: "aluno-001",
    alunoNome: "Estudante Exemplar",
    tutorId: null,
    createdAt: "2023-10-27T10:00:00Z",
    deadLine: "2023-10-28T10:00:00Z"
  },
  {
    id: "2b3c4d5e-d142-11e1-b3e4-080027620cdd",
    titulo: "Fotossíntese - Fase escura",
    materia: "Biologia",
    status: "concluida",
    descricao: "Onde ocorre o Ciclo de Calvin e quais são seus produtos?",
    alunoId: "aluno-006",
    alunoNome: "Darwin Jr",
    tutorId: "profa-ana",
    createdAt: "2023-10-23T10:00:00Z",
    deadLine: "2023-10-25T10:00:00Z"
  },
  {
    id: "3c4d5e6f-d142-11e1-b3e4-080027620cdd",
    titulo: "Interpretação de 'Dom Casmurro'",
    materia: "Literatura",
    status: "concluida",
    descricao: "Afinal, Capitu traiu ou não Bentinho? Qual a visão da crítica sobre isso?",
    alunoId: "aluno-008",
    alunoNome: "Clarice L.",
    tutorId: "prof-jorge",
    createdAt: "2023-10-26T12:00:00Z",
    deadLine: "2023-10-28T12:00:00Z"
  },
  {
    id: "4d5e6f7a-d142-11e1-b3e4-080027620cdd",
    titulo: "Dúvida sobre 'const' em JavaScript",
    materia: "Programação",
    status: "concluida",
    descricao: "Se eu declaro um objeto com 'const', por que consigo alterar suas propriedades?",
    alunoId: "aluno-015",
    alunoNome: "Brendan Eich Jr",
    tutorId: "monitora-gabi",
    createdAt: "2023-10-27T03:00:00Z",
    deadLine: "2023-10-28T03:00:00Z"
  },
  {
    id: "5e6f7a8b-d142-11e1-b3e4-080027620cdd",
    titulo: "Movimento Uniforme Variado (MUV)",
    materia: "Física",
    status: "aberta",
    descricao: "Qual equação devo usar para encontrar a velocidade final sem saber o tempo? (Torricelli?)",
    alunoId: "aluno-002",
    alunoNome: "Isaac Newton Jr",
    tutorId: null,
    createdAt: "2023-10-27T11:45:00Z",
    deadLine: "2023-10-28T11:45:00Z"
  }
];
// Métodos que simulam o Firestore
export const mockDB = {
  // Buscar todas as dúvidas abertas (para o Tutor)
  getmockAllDuvidas: async (): Promise<Duvida[]> => {
    await new Promise(res => setTimeout(res, 500));
    return mockDuvidas;
  },

  getmockDuvidasAbertas: async (): Promise<Duvida[]> => {
    await new Promise(res => setTimeout(res, 500));
    return mockDuvidas.filter(d => d.status === 'aberta');
  },

  // Buscar dúvida específica por ID seguro
  getDuvidaById: async (id: string): Promise<Duvida | undefined> => {
    await new Promise(res => setTimeout(res, 300));
    return mockDuvidas.find(d => d.id === id);
  },

  // Aluno cria nova dúvida
  criarDuvida: async (titulo: string, materia: string, descricao: string, alunoId: string, alunoNome: string) => {
    const nova: Duvida = {
      id: crypto.randomUUID(), // Gera o ID seguro que discutimos
      titulo,
      materia,
      descricao,
      status: 'aberta',
      alunoId,
      alunoNome,
      tutorId: null,
      createdAt: new Date().toISOString(),
      deadLine: new Date().toISOString()
    };
    mockDuvidas.push(nova);
    return nova;
  },

  // Tutor aceita resolver a dúvida
  aceitarDuvida: async (duvidaId: string, tutorId: string) => {
    mockDuvidas = mockDuvidas.map(d =>
      d.id === duvidaId ? { ...d, status: 'em_andamento', tutorId } : d
    );
    return true;
  },

  getDuvidasByAluno: async (alunoId: string): Promise<Duvida[]> => {
    await new Promise(res => setTimeout(res, 500)); // Simula rede
    return mockDuvidas.filter(d => d.alunoId === alunoId);
  },
};



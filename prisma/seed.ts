
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // 1. Limpar dados existentes (opcional, mas recomendado para reset)
  await prisma.proposta.deleteMany()
  await prisma.duvida.deleteMany()
  await prisma.usuario.deleteMany()

  // 2. Criar Usuários
  const aluno = await prisma.usuario.create({
    data: {
      nome: 'Carlos Aluno',
      email: 'aluno@teste.com',
      tipo: 'aluno',
      bio: 'Estudante de Engenharia',
    },
  })

  const tutor = await prisma.usuario.create({
    data: {
      nome: 'Bruna Tutora',
      email: 'tutor@teste.com',
      tipo: 'tutor',
      formacao: 'Mestra em Matemática',
    },
  })

  // 3. Criar uma Dúvida
  const duvida = await prisma.duvida.create({
    data: {
      titulo: 'Cálculo de Derivadas',
      materia: 'Matemática',
      descricao: 'Preciso de ajuda com derivadas parciais.',
      valorSugerido: 50.0,
      alunoId: aluno.id,
      deadLine: new Date('2026-12-01'),
    },
  })

  // 4. Criar uma Proposta
  await prisma.proposta.create({
    data: {
      valor: 45.0,
      mensagem: 'Posso te ajudar agora mesmo!',
      duvidaId: duvida.id,
      tutorId: tutor.id,
    },
  })

  console.log('Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
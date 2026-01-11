"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "../lib/supabase/server";

/**
 * GET: Busca apenas as dúvidas do usuário logado
 */
export async function getMinhasDuvidas() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const dados = await prisma.duvida.findMany({
    where: { alunoId: user.id },
    include: {
        aluno: {
          select: {
            nome: true,
            email: true
          }
        }
      },
    orderBy: { createdAt: 'desc' }
  });

  // Convertemos para garantir que o cliente receba tipos compatíveis
  return dados.map(item => ({
    ...item,
    status: item.status as 'aberta' | 'em_andamento' | 'concluida',
  }));
}


/**
 * Busca todas as dúvidas registradas no sistema.
 */
export async function getAllDuvidas() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Não autorizado");
    }

    const duvidas = await prisma.duvida.findMany({
      include: {
        aluno: {
          select: {
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc' 
      }
    });

    return duvidas;
  } catch (error) {
    console.error("Erro ao buscar todas as dúvidas:", error);
    return [];
  }
}

/**
 * POST: Cria uma nova dúvida vinculada ao usuário logado
 */
export async function criarDuvida(dados: { titulo: string; materia: string; descricao: string; deadLine: Date }) {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  return await prisma.duvida.create({
    data: {
      ...dados,
      alunoId: user.id,
      status: 'aberta'
    }
  });
}


export async function criarNovaDuvida(formData: {
  titulo: string;
  materia: string;
  descricao: string;
  deadLine: string; 
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Usuário não autenticado");

    const [dia, mes, ano] = formData.deadLine.split('/').map(Number);
    const dataFormatada = new Date(2000 + ano, mes - 1, dia);

    const novaDuvida = await prisma.duvida.create({
      data: {
        titulo: formData.titulo,
        materia: formData.materia,
        descricao: formData.descricao,
        deadLine: dataFormatada,
        alunoId: user.id, 
        status: "aberta"
      }
    });

    // Limpa o cache da página de dashboard para mostrar a nova dúvida
    revalidatePath("/aluno/dashboard");
    
    return { success: true, data: novaDuvida };
  } catch (error) {
    console.error("Erro ao criar dúvida:", error);
    return { success: false, error: "Falha ao registrar dúvida" };
  }
}
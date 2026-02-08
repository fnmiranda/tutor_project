"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function aceitarPropostaAction(propostaId: string, duvidaId: string, tutorId: string) {
  try {
    // Usamos uma transação para garantir que ambos os updates ocorram ou nenhum ocorra
    await prisma.$transaction([
      // 1. Atualiza a proposta escolhida para "aceita"
      prisma.proposta.update({
        where: { id: propostaId },
        data: { status: "aceita" }
      }),
      // 2. Atualiza a dúvida com o tutor escolhido e novo status
      prisma.duvida.update({
        where: { id: duvidaId },
        data: { 
          tutorId: tutorId,
          status: "aceita" // ou "em_andamento" conforme seu schema [cite: 82]
        }
      }),
      // 3. (Opcional) Recusa as outras propostas automaticamente
      prisma.proposta.updateMany({
        where: { 
          duvidaId: duvidaId,
          id: { not: propostaId }
        },
        data: { status: "recusada" }
      })
    ]);

    revalidatePath(`/aluno/duvida/${duvidaId}`); 
    return { success: true };
  } catch (error) {
    console.error("Erro ao aceitar proposta:", error);
    return { success: false, error: "Falha ao processar o aceite." };
  }
}


export async function criarProposta(duvidaId: string, valor: number, mensagem: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Usuário não autenticado");

    // Cria a proposta vinculada à dúvida e ao tutor logado
    const novaProposta = await prisma.proposta.create({
      data: {
        valor,
        mensagem,
        duvidaId,
        tutorId: user.id,
        status: "pendente",
      },
    });

    // Atualiza o status da dúvida para 'em_negociacao'
    await prisma.duvida.update({
      where: { id: duvidaId },
      data: { status: "em_negociacao" },
    });

    // Invalida o cache para que o aluno e o tutor vejam a atualização
    revalidatePath(`/tutor/dashboard/duvida/${duvidaId}`);
    revalidatePath(`/aluno/dashboard/duvida/${duvidaId}`);

    return { success: true, data: novaProposta };
  } catch (error) {
    console.error("Erro ao criar proposta:", error);
    return { success: false, error: "Falha ao enviar proposta." };
  }
}

export async function excluirProposta(propostaId: string, duvidaId: string) {
  try {
    await prisma.proposta.delete({
      where: { id: propostaId }
    });

    // Se não houver mais propostas, poderíamos voltar o status da dúvida para 'aberta'
    // Mas por enquanto, apenas revalidamos a rota
    revalidatePath(`/tutor/dashboard/duvida/${duvidaId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao remover proposta." };
  }
}
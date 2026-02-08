"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function atualizarPerfilTutor(dados: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    await prisma.usuario.update({
      where: { id: user.id },
      data: {
        nome: dados.nome,
        bio: dados.bio,
        instituicao: dados.instituicao,
        formacao: dados.formacao,
        cep: dados.cep,
        // Se as matérias forem uma string no banco:
        // curso: dados.materias 
      },
    });

    revalidatePath("/tutor/perfil");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar perfil" };
  }
}
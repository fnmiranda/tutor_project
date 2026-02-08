"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function atualizarUsuario(dados: {
  nome?: string;
  instituicao?: string;
  curso?: string;
  formacao?: string;
  especialidades?: string[];
  estado?: string;
  cidade?: string;
  bio?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: user.id },
      data: dados,
    });

    revalidatePath("/(private)/perfil");

    return { success: true, data: usuarioAtualizado };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, error: "Erro ao salvar as alterações." };
  }
}

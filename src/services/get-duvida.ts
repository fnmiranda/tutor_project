'use server'

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getDuvidaById(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const dados = await prisma.duvida.findUnique({
    where: { id },
    include: {
      aluno: {
        select: {
          nome: true,
          email: true,
        },
      },
    },
  });

  return dados;
}


export async function getDuvidaWithProposta(id: string) {
  return await prisma.duvida.findUnique({
    where: { id },
    include: {
      aluno: true,      // Traz dados do aluno que criou
      propostas: {      // Traz a lista de propostas
        include: {
          tutor: {      // DENTRO de cada proposta, traz os dados do tutor
            select: {
              nome: true,
              email: true,
              formacao: true,
              curso:true,
              instituicao:true
            }
          }
        },
        orderBy: {
          createdAt: 'desc' // Mostra as propostas mais recentes primeiro
        }
      }
    }
  });
}
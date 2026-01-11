import { supabase } from "@/lib/supabase/client";
import { prisma } from "@/lib/prisma";

export const authService = {
  async register(name: string, email: string, password: string, type: 'aluno' | 'tutor') {
    // 1. Cria credencial no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 2. Cria perfil no Prisma vinculado ao ID do Auth
    if (authData.user) {
      await prisma.usuario.create({
        data: {
          id: authData.user.id,
          nome: name,
          email: email,
          tipo: type,
        }
      });
    }
    return authData.user;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return true;
  }
};

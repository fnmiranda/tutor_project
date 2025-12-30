'use client';

import { routes } from "@/routes/routes";

export async function registrar(name: string, email: string, type: 'aluno' | 'tutor') {
  console.log("🛠️ [Mock Auth] Registrando:", { name, email, type });
  await new Promise(res => setTimeout(res, 1000));

  const userData = {
    uid: crypto.randomUUID(),
    name,
    email,
    type,
  };

  // Simulamos o salvamento no localStorage para persistência do mock
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userType', type);

  return userData;
}

export async function signIn(email: string, type: 'aluno' | 'tutor') {
  console.log("🛠️ [Mock Auth] Fazendo Login...");
  await new Promise(res => setTimeout(res, 800));

  // No mock, aceitamos qualquer login
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userType', type);

  return true;
}

export async function logOut() {
  localStorage.clear();
  window.location.href = '/';
}

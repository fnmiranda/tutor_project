'use client';

import { routes } from "@/routes/routes";


export async function registrar(email: string, type: 'aluno' | 'tutor') {
  console.log("🛠️ [Mock Auth] Registrando:", { email, type });
  await new Promise(res => setTimeout(res, 1000));

  const userData = {
    uid: type === "aluno" ? "user-0tt0sipbb" : "tutor-0tt0sipbb",
    name: type === "aluno" ? "aluno-001" : "tutor-001",
    email,
    type,
    instituition: "",
    bio: "",
    course: "",
    state: "",
    city: "",
  }

  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userType', type);
  return userData;

}

export async function signIn(email: string, type: 'aluno' | 'tutor') {
  console.log("🛠️ [Mock Auth] Fazendo Login...");
  await new Promise(res => setTimeout(res, 800));

  const userData = {
    uid: type === "aluno" ? "user-0tt0sipbb" : "tutor-0tt0sipbb",
    name: type === "aluno" ? "Aluno Pedro" : "Tutor Domingos",
    email,
    type,
    instituition: "Escola Estadual",
    course: "",
    state: "RJ",
    city: "",
    bio: "Estudante em busca de conhecimento.",
  }

  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userType', type);
  localStorage.setItem('userData', JSON.stringify(userData));
  return true;
}

export async function logOut() {
  localStorage.clear();
}

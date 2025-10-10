"use client";

import { useState } from "react";
import ProfileForm from "@/components/ProfileForm";

export default function PerfilPage() {
  const [tab, setTab] = useState<"dados" | "notificacoes">("dados");

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-8 flex items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Perfil</h1>

        {/* Abas simples */}
        <nav className="rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setTab("dados")}
            className={`rounded-md px-3 py-2 text-sm ${
              tab === "dados"
                ? "bg-white font-medium shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Dados
          </button>
          <button
            onClick={() => setTab("notificacoes")}
            className={`rounded-md px-3 py-2 text-sm ${
              tab === "notificacoes"
                ? "bg-white font-medium shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Notificações
          </button>
        </nav>
      </header>

      {/* O formulário já contém a seção de Notificações.
          Mantemos as abas só para a sensação de navegação. */}
      {tab === "dados" ? <ProfileForm /> : <ProfileForm />}
    </main>
  );
}

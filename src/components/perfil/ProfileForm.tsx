"use client";
import { useState } from "react";
import AvatarUpload from "./AvatarUpload"; // mesmo diretório

type FormState = {
  nome: string;
  email: string;
  bio: string;
  materias: string;
  disponibilidade: string;
  notifEmail: boolean;
  notifApp: boolean;
};

export default function ProfileForm() {
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [form, setForm] = useState<FormState>({
    nome: "Silva", // mock: bloqueado como se viesse do Auth
    email: "prof.silva@escola.com", // mock: bloqueado como se viesse do Auth
    bio: "",
    materias: "",
    disponibilidade: "manhã",
    notifEmail: true,
    notifApp: true,
  });

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(null);
    // mock de salvamento
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSavedMsg("Perfil salvo (mock). De uma olhada no console!");
    console.log("Dados enviados (mock):", { ...form, avatarFile });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Avatar */}
      <section className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Foto de Perfil
        </h3>
        <AvatarUpload onChange={(file) => setAvatarFile(file)} />
        <p className="mt-2 text-sm text-gray-500">
          PNG ou JPG até 2MB. (Mock — não envia ainda)
        </p>
      </section>

      {/* Dados básicos */}
      <section className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Dados</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">Nome</span>
            <input
              required
              value={form.nome}
              disabled
              onChange={(e) => set("nome", e.target.value)}
              className="rounded-md border px-3 py-2 outline-none ring-blue-200 focus:ring-2 bg-gray-100 px-3 py-2 text-gray-600"
              placeholder="Seu nome" /*Poder editar ou não o nome depois do cadastro, se sim tirar o disabled */
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">Email</span>
            <input
              value={form.email}
              disabled
              className="rounded-md border bg-gray-100 px-3 py-2 text-gray-600"
            />
          </label>

          <label className="col-span-1 md:col-span-2 flex flex-col gap-1">
            <span className="text-sm text-gray-700">Bio</span>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              className="rounded-md border px-3 py-2 outline-none ring-blue-200 focus:ring-2"
              placeholder="Fale brevemente sobre você…"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              Matérias (separe por vírgula)
            </span>
            <input
              value={form.materias}
              onChange={(e) => set("materias", e.target.value)}
              className="rounded-md border px-3 py-2 outline-none ring-blue-200 focus:ring-2"
              placeholder="Física, Matemática…"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">Disponibilidade</span>
            <select
              value={form.disponibilidade}
              onChange={(e) => set("disponibilidade", e.target.value)}
              className="rounded-md border px-3 py-2 outline-none ring-blue-200 focus:ring-2"
            >
              <option value="manhã">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
              <option value="integral">Integral</option>
            </select>
          </label>
        </div>
      </section>

      {/* Notificações */}
      <section className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Notificações
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.notifEmail}
              onChange={(e) => set("notifEmail", e.target.checked)}
              className="size-4 accent-blue-600"
            />
            <span>Receber por email</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.notifApp}
              onChange={(e) => set("notifApp", e.target.checked)}
              className="size-4 accent-blue-600"
            />
            <span>Notificações no app</span>
          </label>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          disabled={saving}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Salvando…" : "Salvar alterações"}
        </button>
        {savedMsg && <span className="text-sm text-green-700">{savedMsg}</span>}
      </div>
    </form>
  );
}

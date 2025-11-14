"use client";

import { useState } from "react";
import Card from "@/components/cards/cards";
import Input from "@/components/input/input";
import Button from "@/components/botao/botao";

type FormState = {
  nome: string;
  email: string;
  bio: string;
  materias: string;
  disponibilidade: string;
  notifEmail: boolean;
  notifPush: boolean;
};

export default function ProfileForm({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<FormState>({
    nome: "Silva",
    email: "prof.silva@escola.com",
    bio: "",
    materias: "Física, Matemática…",
    disponibilidade: "Manhã",
    notifEmail: true,
    notifPush: false,
  });
  const [salvando, setSalvando] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v =
        e.currentTarget.type === "checkbox"
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;
      setForm((s) => ({ ...s, [k]: v as never }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setOk(null);
    setSalvando(true);
    try {
      // TODO: chamar API/Server Action
      await new Promise((r) => setTimeout(r, 600));
      setOk("Alterações salvas com sucesso.");
      onSaved?.(); // ← redireciona (relativo) definido na página
    } catch {
      setErro("Não foi possível salvar agora. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Dados">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nome" value={form.nome} onChange={onChange("nome")} />
          <Input
            label="E-mail"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            disabled
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={onChange("bio")}
              placeholder="Fale brevemente sobre você..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              rows={3}
            />
          </div>
          <Input
            label="Matérias (separe por vírgula)"
            value={form.materias}
            onChange={onChange("materias")}
          />
          <Input
            label="Disponibilidade"
            value={form.disponibilidade}
            onChange={onChange("disponibilidade")}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar alterações"}
          </Button>
          {ok && <span className="text-sm text-green-700">{ok}</span>}
          {erro && <span className="text-sm text-red-600">{erro}</span>}
        </div>
      </Card>

      <Card title="Notificações">
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4"
              checked={form.notifEmail}
              onChange={onChange("notifEmail")}
            />
            Receber por e-mail
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4"
              checked={form.notifPush}
              onChange={onChange("notifPush")}
            />
            Notificações via app
          </label>
        </div>
      </Card>
    </form>
  );
}

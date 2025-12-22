"use client";

import { useEffect, useState } from "react";
import Card from "@/components/cards/cards";
import Input from "@/components/input/input";
import Button from "@/components/botao/botao";
import MateriasField, {
  DEFAULT_SUBJECTS,
} from "@/components/materiais/MateriasField";

type FormState = {
  nome: string;
  email: string;
  bio: string;
  materias: string; // exibicao (CSV)
  disponibilidade: string;
  notifEmail: boolean;
  notifPush: boolean;
};

export default function ProfileForm({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<FormState>({
    nome: "Silva",
    email: "prof.silva@escola.com",
    bio: "",
    materias: "Fisica, Matematica…",
    disponibilidade: "Manha",
    notifEmail: true,
    notifPush: false,
  });

  // estado controlado do seletor de materias
  const [materiasSel, setMateriasSel] = useState<string[]>([
    "Fisica (EM)",
    "Calculo I",
  ]);

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

  // mantem form.materias como CSV a partir do array selecionado
  useEffect(() => {
    setForm((s) => ({ ...s, materias: materiasSel.join(", ") }));
  }, [materiasSel]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setOk(null);
    setSalvando(true);
    try {
      // TODO: chamar API/Server Action
      await new Promise((r) => setTimeout(r, 600));
      setOk("Alteracoes salvas com sucesso.");
      onSaved?.(); // redireciona se definido na pagina
    } catch {
      setErro("Nao foi possivel salvar agora. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Dados">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nome"
            value={form.nome}
            onChange={onChange("nome")}
            autoComplete="name"
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            autoComplete="email"
            disabled
          />

          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              value={form.bio}
              onChange={onChange("bio")}
              placeholder="Fale brevemente sobre voce..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              rows={3}
              maxLength={280}
              aria-describedby="bio-hint bio-count"
            />
            <p id="bio-hint" className="text-xs text-gray-500 mt-1">
              Ate 280 caracteres.
            </p>
            <p
              id="bio-count"
              className="text-xs text-gray-500"
              aria-live="polite"
            >
              {form.bio.length}/280
            </p>
          </div>

          {/* campo substituido pelo seletor acessivel de materias */}
          <div className="sm:col-span-2">
            <MateriasField
              value={materiasSel}
              onChange={setMateriasSel}
              catalog={DEFAULT_SUBJECTS}
              label="Materias"
              placeholder="Clique para escolher..."
            />
          </div>

          <Input
            label="Disponibilidade"
            value={form.disponibilidade}
            onChange={onChange("disponibilidade")}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar alteracoes"}
          </Button>
          {ok && (
            <span
              role="status"
              aria-live="polite"
              className="text-sm text-green-700"
            >
              {ok}
            </span>
          )}
          {erro && (
            <span role="alert" className="text-sm text-red-600">
              {erro}
            </span>
          )}
        </div>
      </Card>

      <Card title="Notificacoes">
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4"
              checked={form.notifEmail}
              onChange={onChange("notifEmail")}
            />
            Receber por email
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4"
              checked={form.notifPush}
              onChange={onChange("notifPush")}
            />
            Notificacoes via app
          </label>
        </div>
      </Card>
    </form>
  );
}

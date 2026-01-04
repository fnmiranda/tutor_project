"use client";

import { useState } from "react";
import Card from "@/components/cards/cards";
import Input from "@/components/input/input";
import Button from "@/components/botao/botao";
import { useAuth } from "@/context/authContext";

type FormState = {
  nome: string;
  email: string;
  instituicao: string;
  curso: string;
  estado: string;
  cidade: string;
  bio: string;
};

export default function AlunoProfileForm({ onSaved, }: { onSaved?: () => void; }) {
  const [form, setForm] = useState<FormState>({
    nome: "João Santos",
    email: "aluno@email.com",
    instituicao: "Escola Estadual",
    curso: "",
    estado: "RJ",
    cidade: "",
    bio: "",
  });
  const [salvando, setSalvando] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const { userData } = useAuth();
  const onChange =
    (k: keyof FormState) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        const v = e.currentTarget.value;
        setForm((s) => ({ ...s, [k]: v }));
      };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setOk(null);
    setSalvando(true);
    try {
      // TODO: enviar para API/Server Action
      await new Promise((r) => setTimeout(r, 700));
      setOk("Alterações salvas com sucesso.");
      onSaved?.();
    } catch {
      setErro("Não foi possível salvar agora. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Dados acadêmicos">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nome" value={userData.name} onChange={onChange("nome")} />
          <Input
            label="E-mail"
            type="email"
            value={userData.email}
            onChange={onChange("email")}
            disabled
          />

          <Input
            label="Instituição"
            value={userData.instituition}
            onChange={onChange("instituicao")}
            placeholder="Ex.: IME - Instituto Militar de Engenharia"
          />
          <Input
            label="Curso"
            value={userData.course}
            onChange={onChange("curso")}
            placeholder="Ex.: Engenharia de Computação"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              value={userData.state}
              onChange={onChange("estado")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            >
              <option>RJ</option>
              <option>SP</option>
              <option>MG</option>
              <option>RS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cidade</label>
            <select
              value={userData.city}
              onChange={onChange("cidade")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="">Selecione</option>
              <option>Rio de Janeiro</option>
              <option>São Paulo</option>
              <option>Belo Horizonte</option>
              <option>Porto Alegre</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={userData.bio}
              onChange={onChange("bio")}
              placeholder="Fale brevemente sobre você..."
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar alterações"}
          </Button>
          {ok && <span className="text-sm text-green-700">{ok}</span>}
          {erro && <span className="text-sm text-red-600">{erro}</span>}
        </div>
      </Card>
    </form>
  );
}

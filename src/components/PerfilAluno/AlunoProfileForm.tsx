"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/authContext";
import { atualizarUsuario } from "@/services/post-usaurio";
import MateriasField, { DEFAULT_SUBJECTS } from "../materiais/MateriasField";

type FormState = {
  nome: string;
  instituicao: string;
  curso: string;
  formacao: string;
  especialidades?: string[];
  estado: string;
  cidade: string;
  bio: string;
};

export function AlunoProfileForm({ onSaved }: { onSaved?: () => void }) {
  const { userData } = useAuth();
  const [materiasSel, setMateriasSel] = useState<string[]>(userData.especialidades);

  const [form, setForm] = useState<FormState>({
    nome: userData.nome || "",
    instituicao: userData.instituicao || "",
    curso: userData.curso || "",
    formacao: userData.formacao || "",
    especialidades: userData.especialidades || "",
    estado: userData.estado || "",
    cidade: userData.cidade || "",
    bio: userData.bio || "",
  });
  const [salvando, setSalvando] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const onChange =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const v = e.currentTarget.value;
      setForm((s) => ({ ...s, [k]: v }));
    };

  function converterParaArray(str: string) {
    return str.split(",").map((item) => item.trim());
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setOk(null);
    setSalvando(true);

    // const materiasUpdate:string[] = converterParaArray(materiasSel)
    // setForm((prevForm) => ({
    //   ...prevForm,
    //   especialidades: ["Novo valor das especialidades"],
    // }));

    try {
      const resultado = await atualizarUsuario({
        nome: form.nome,
        instituicao: form.instituicao,
        curso: form.curso,
        formacao: form.formacao,
        especialidades: materiasSel,
        estado: form.estado,
        cidade: form.cidade,
        bio: form.bio,
      });
      if (resultado.success) {
        alert("Informações atualizadas com sucesso!");
      } else {
        alert(resultado.error);
      }

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
          <Input label="Nome" value={form.nome} onChange={onChange("nome")} />
          {/* <Input label="E-mail" type="email" value={userData.email} disabled /> */}

          <Input
            label="Instituição"
            value={form.instituicao}
            onChange={onChange("instituicao")}
            placeholder="Ex.: IME - Instituto Militar de Engenharia"
          />
          <Input
            label="Formação"
            value={form.formacao}
            onChange={onChange("formacao")}
            placeholder="Ex.: IME - Instituto Militar de Engenharia"
          />
          <Input
            label="Curso"
            value={form.curso}
            onChange={onChange("curso")}
            placeholder="Ex.: Engenharia de Computação"
          />
          {userData.tipo ==='tutor'?
          <div className="sm:col-span-2">
            <MateriasField
              value={materiasSel}
              onChange={setMateriasSel}
              catalog={DEFAULT_SUBJECTS}
              label="Matérias que você domina"
            />
          </div>

          :<></>}

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              value={form.estado}
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
              value={form.cidade}
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
              value={form.bio}
              onChange={onChange("bio")}
              placeholder="Fale brevemente sobre você..."
              rows={4}
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

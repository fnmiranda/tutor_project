"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import {Input} from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import MateriasField, { DEFAULT_SUBJECTS } from "@/components/materiais/MateriasField";
import { useAuth } from "@/context/authContext";
import { atualizarPerfilTutor } from "@/services/user";

function ProfileForm({ onSaved }: { onSaved?: () => void }) {
  const { userData } = useAuth();
  
  const [form, setForm] = useState({
    nome: "",
    bio: "",
    instituicao: "",
    formacao: "",
    curso: "",
    cep: "",
  });

  const [materiasSel, setMateriasSel] = useState<string[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Sincroniza os dados do Contexto para o Estado Local do Form
  useEffect(() => {
    if (userData) {
      setForm({
        nome: userData.nome || "",
        bio: userData.bio || "",
        instituicao: userData.instituicao || "",
        formacao: userData.formacao || "",
        curso: userData.curso || "",
        cep: userData.cep || "",
      });
    }
  }, [userData]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setOk(null);
    setSalvando(true);

    const resultado = await atualizarPerfilTutor({
      ...form,
      materias: materiasSel.join(", ")
    });

    if (resultado.success) {
      setOk("Alterações salvas com sucesso.");
      onSaved?.();
    } else {
      setErro("Erro ao salvar. Tente novamente.");
    }
    setSalvando(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Dados Profissionais">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nome Completo"
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
          />

          <Input
            label="Email (Não alterável)"
            type="email"
            value={userData?.email || ""}
            disabled
          />

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio Profissional</label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Sua experiência e especialidades..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              rows={3}
              maxLength={280}
            />
            <p className="text-xs text-gray-500 mt-1">{form.bio.length}/280 caracteres</p>
          </div>

          <div className="sm:col-span-2">
            <MateriasField
              value={materiasSel}
              onChange={setMateriasSel}
              catalog={DEFAULT_SUBJECTS}
              label="Matérias que você domina"
            />
          </div>

          <Input
            label="Instituição onde estuda/formou"
            value={form.instituicao}
            onChange={(e) => handleChange("instituicao", e.target.value)}
          />

          <Input
            label="Formação Atual"
            value={form.formacao}
            onChange={(e) => handleChange("formacao", e.target.value)}
          />

          <Input
            label="Curso"
            value={form.curso}
            onChange={(e) => handleChange("formacao", e.target.value)}
          />

          <Input
            label="CEP / Localização"
            value={form.cep}
            onChange={(e) => handleChange("cep", e.target.value)}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" disabled={salvando}>
            {salvando ? "Processando..." : "Salvar Perfil"}
          </Button>
          {ok && <span className="text-sm text-green-600 font-medium">✓ {ok}</span>}
          {erro && <span className="text-sm text-red-600">{erro}</span>}
        </div>
      </Card>
    </form>
  );
}

export default ProfileForm;
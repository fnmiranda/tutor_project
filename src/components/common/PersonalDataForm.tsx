"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Card from "@/components/cards/cards";
import Input from "@/components/input/input";
import Button from "@/components/botao/botao";

type PersonalData = {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string; // ISO yyyy-mm-dd
  cpf?: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
};

type Props = {
  initial?: Partial<PersonalData>;
  onSaved?: (data: PersonalData) => void; // chamada depois do “salvar”
};

// helpers de máscara
const onlyDigits = (s: string) => s.replace(/\D+/g, "");
const maskPhoneBR = (s: string) => {
  const d = onlyDigits(s).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const maskCEP = (s: string) => {
  const d = onlyDigits(s).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
};

export default function PersonalDataForm({ initial, onSaved }: Props) {
  const [form, setForm] = useState<PersonalData>({
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    cpf: "",
    cep: "",
    endereco: "",
    cidade: "",
    uf: "",
    ...initial,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalData, string>>
  >({});
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState("");

  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  const ufs = useMemo(
    () => [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
    []
  );

  const handleChange =
    (k: keyof PersonalData, mask?: (s: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = mask ? mask(e.target.value) : e.target.value;
      setForm((s) => ({ ...s, [k]: value }));
      // limpa erro ao digitar
      setErrors((err) => ({ ...err, [k]: undefined }));
    };

  const validate = (data: PersonalData) => {
    const err: Partial<Record<keyof PersonalData, string>> = {};
    if (!data.nome.trim()) err.nome = "Informe seu nome completo.";
    if (!data.email.trim()) err.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      err.email = "E-mail inválido.";

    if (!data.telefone.trim()) err.telefone = "Informe seu telefone.";
    else if (onlyDigits(data.telefone).length < 10)
      err.telefone = "Telefone incompleto.";

    if (!data.nascimento) err.nascimento = "Informe sua data de nascimento.";

    if (
      data.cpf &&
      onlyDigits(data.cpf).length > 0 &&
      onlyDigits(data.cpf).length !== 11
    )
      err.cpf = "CPF deve ter 11 dígitos.";

    if (!data.cep.trim()) err.cep = "Informe seu CEP.";
    else if (onlyDigits(data.cep).length !== 8)
      err.cep = "CEP deve ter 8 dígitos.";

    if (!data.endereco.trim()) err.endereco = "Informe seu endereço.";
    if (!data.cidade.trim()) err.cidade = "Informe sua cidade.";
    if (!data.uf) err.uf = "Selecione seu estado.";

    return err;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form);
    setErrors(err);

    if (Object.keys(err).length) {
      // foca o primeiro campo inválido e anuncia o resumo
      const firstKey = Object.keys(err)[0] as keyof PersonalData;
      const el = document.getElementById(
        `pd-${firstKey}`
      ) as HTMLElement | null;
      el?.focus();
      // foca no resumo também pra leitores de tela
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSaving(true);
    setOk("");
    // MOCK de salvamento – troque pelo seu fetch/Server Action
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setOk("Dados pessoais salvos.");
    onSaved?.(form);
  };

  // util para aria-describedby juntar múltiplos ids
  const describedBy = (k: keyof PersonalData) =>
    errors[k] ? `pd-err-${k}` : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Resumo de erros acessível */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={errorSummaryRef}
          className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
          tabIndex={-1}
          aria-live="assertive"
        >
          <div className="font-medium mb-1">Corrija os campos destacados:</div>
          <ul className="list-disc pl-5">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>
                <a
                  href={`#pd-${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`pd-${key}`)?.focus();
                  }}
                  className="underline"
                >
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Card title="Dados pessoais">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input
              id="pd-nome"
              label="Nome completo"
              value={form.nome}
              onChange={handleChange("nome")}
              aria-invalid={!!errors.nome}
              aria-describedby={describedBy("nome")}
              required
            />
            {errors.nome && (
              <p
                id="pd-err-nome"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.nome}
              </p>
            )}
          </div>

          <div>
            <Input
              id="pd-email"
              label="E-mail"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
              required
              // se vier do auth, considere disabled
              // disabled
            />
            {errors.email && (
              <p
                id="pd-err-email"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Input
              id="pd-telefone"
              label="Telefone"
              value={form.telefone}
              onChange={handleChange("telefone", maskPhoneBR)}
              placeholder="(21) 99999-9999"
              aria-invalid={!!errors.telefone}
              aria-describedby={describedBy("telefone")}
              required
            />
            {errors.telefone && (
              <p
                id="pd-err-telefone"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.telefone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="pd-nascimento"
              className="block text-sm font-medium mb-1"
            >
              Data de nascimento
            </label>
            <input
              id="pd-nascimento"
              type="date"
              value={form.nascimento}
              onChange={handleChange("nascimento")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              aria-invalid={!!errors.nascimento}
              aria-describedby={describedBy("nascimento")}
              required
            />
            {errors.nascimento && (
              <p
                id="pd-err-nascimento"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.nascimento}
              </p>
            )}
          </div>

          <div>
            <Input
              id="pd-cpf"
              label="CPF (opcional)"
              value={form.cpf ?? ""}
              onChange={handleChange("cpf")}
              placeholder="Somente números"
              inputMode="numeric"
              aria-invalid={!!errors.cpf}
              aria-describedby={describedBy("cpf")}
            />
            {errors.cpf && (
              <p
                id="pd-err-cpf"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.cpf}
              </p>
            )}
          </div>

          <div>
            <Input
              id="pd-cep"
              label="CEP"
              value={form.cep}
              onChange={handleChange("cep", maskCEP)}
              placeholder="00000-000"
              inputMode="numeric"
              aria-invalid={!!errors.cep}
              aria-describedby={describedBy("cep")}
              required
            />
            {errors.cep && (
              <p
                id="pd-err-cep"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.cep}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Input
              id="pd-endereco"
              label="Endereço"
              value={form.endereco}
              onChange={handleChange("endereco")}
              placeholder="Rua, número, complemento"
              aria-invalid={!!errors.endereco}
              aria-describedby={describedBy("endereco")}
              required
            />
            {errors.endereco && (
              <p
                id="pd-err-endereco"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.endereco}
              </p>
            )}
          </div>

          <div>
            <Input
              id="pd-cidade"
              label="Cidade"
              value={form.cidade}
              onChange={handleChange("cidade")}
              aria-invalid={!!errors.cidade}
              aria-describedby={describedBy("cidade")}
              required
            />
            {errors.cidade && (
              <p
                id="pd-err-cidade"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.cidade}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="pd-uf" className="block text-sm font-medium mb-1">
              Estado (UF)
            </label>
            <select
              id="pd-uf"
              value={form.uf}
              onChange={handleChange("uf")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              aria-invalid={!!errors.uf}
              aria-describedby={describedBy("uf")}
              required
            >
              <option value="">Selecione</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
            {errors.uf && (
              <p
                id="pd-err-uf"
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.uf}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar dados pessoais"}
          </Button>
          {ok && <span className="text-sm text-green-700">{ok}</span>}
        </div>
      </Card>
    </form>
  );
}

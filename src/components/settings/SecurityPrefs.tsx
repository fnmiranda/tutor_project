"use client";

import { useState } from "react";
import Card from "@/components/cards/cards";
import Input from "@/components/input/input";
import Button from "@/components/botao/botao";
import Switch from "@/components/switch/Switch";

type Props = { onSaved?: () => void };

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="rounded-r-md border border-l-0 border-gray-300 px-3 text-sm hover:bg-gray-50"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}

export default function SecurityPrefs({ onSaved }: Props) {
  const [form, setForm] = useState({
    curr: "",
    next: "",
    confirm: "",
    twoFA: false,
    salvando: false,
    ok: "",
    erro: "",
  });

  const save = async () => {
    // validação mínima mock
    if (form.next && form.next !== form.confirm) {
      setForm((s) => ({ ...s, erro: "Confirmação não coincide." }));
      return;
    }
    setForm((s) => ({ ...s, salvando: true, ok: "", erro: "" }));
    try {
      await new Promise((r) => setTimeout(r, 700));
      setForm((s) => ({ ...s, salvando: false, ok: "Preferências salvas." }));
      onSaved?.();
    } catch {
      setForm((s) => ({ ...s, salvando: false, erro: "Falha ao salvar." }));
    }
  };

  const set = (k: keyof typeof form) => (v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  // mock de sessões ativas
  const sessions = [
    { id: "A1", device: "Windows • Edge", ip: "177.200.10.23", last: "agora" },
    {
      id: "B2",
      device: "Android • Chrome",
      ip: "177.200.10.23",
      last: "há 2 dias",
    },
  ];

  return (
    <div className="space-y-5">
      <Card title="Segurança">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordField
              label="Senha atual"
              value={form.curr}
              onChange={(e) => set("curr")(e.target.value)}
            />
            <div />
            <PasswordField
              label="Nova senha"
              value={form.next}
              onChange={(e) => set("next")(e.target.value)}
            />
            <PasswordField
              label="Confirmar nova senha"
              value={form.confirm}
              onChange={(e) => set("confirm")(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Switch
              label="Autenticação em duas etapas (2FA)"
              checked={form.twoFA}
              onChange={(v) => set("twoFA")(v)}
            />
            {form.twoFA && (
              <p className="mt-2 text-xs text-gray-500">
                (Mock) Após ativar, exibir QR Code e códigos de recuperação.
              </p>
            )}
          </div>

          <div className="pt-2">
            <div className="text-sm font-medium mb-2">Sessões ativas</div>
            <ul className="divide-y rounded-md border">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between px-3 py-2 text-sm"
                >
                  <div>
                    <div className="font-medium">{s.device}</div>
                    <div className="text-gray-500">
                      IP {s.ip} • Último acesso {s.last}
                    </div>
                  </div>
                  <Button
                    onClick={() => alert(`(mock) sessão ${s.id} revogada`)}
                  >
                    Revogar
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button onClick={save} disabled={form.salvando}>
              {form.salvando ? "Salvando..." : "Salvar preferências"}
            </Button>
            {form.ok && (
              <span className="text-sm text-green-700">{form.ok}</span>
            )}
            {form.erro && (
              <span className="text-sm text-red-600">{form.erro}</span>
            )}
          </div>
        </div>
      </Card>

      <Card title="Zona de perigo">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div className="font-medium">Excluir conta</div>
            <div className="text-gray-500">Esta ação é irreversível.</div>
          </div>
          <Button disabled title="Desativado no mock">
            Excluir conta
          </Button>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import Card from "@/components/Cards";
import Button from "@/components/Button";
import Switch from "@/components/Switch/Switch";

type Props = { onSaved?: () => void };

export default function NotificationPrefs({ onSaved }: Props) {
  const [state, set] = useState({
    emailMentions: true,
    emailDigest: false,
    pushNewMessages: true,
    smsCritical: false,
    freq: "diario" as "imediato" | "hora" | "diario" | "semanal",
    salvando: false,
    ok: "",
    erro: "",
  });

  const save = async () => {
    set((s) => ({ ...s, salvando: true, ok: "", erro: "" }));
    try {
      // TODO: chamada real à API
      await new Promise((r) => setTimeout(r, 600));
      set((s) => ({ ...s, salvando: false, ok: "Preferências salvas." }));
      onSaved?.();
    } catch {
      set((s) => ({ ...s, salvando: false, erro: "Falha ao salvar." }));
    }
  };

  return (
    <div className="space-y-5">
      <Card title="Notificações">
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Switch
              label="Receber e-mail quando alguém me mencionar"
              checked={state.emailMentions}
              onChange={(v) => set((s) => ({ ...s, emailMentions: v }))}
            />
            <Switch
              label="Receber push para novas mensagens"
              checked={state.pushNewMessages}
              onChange={(v) => set((s) => ({ ...s, pushNewMessages: v }))}
            />
            <Switch
              label="SMS para alertas críticos (segurança, acesso)"
              checked={state.smsCritical}
              onChange={(v) => set((s) => ({ ...s, smsCritical: v }))}
            />
          </div>
          <div className="pt-2">
            <div className="text-sm font-medium mb-2">
              Frequência do resumo por e-mail
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              {[
                ["imediato", "Imediato"],
                ["hora", "De hora em hora"],
                ["diario", "Diário"],
                ["semanal", "Semanal"],
              ].map(([val, label]) => (
                <label
                  key={val}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="freq"
                    value={val}
                    checked={state.freq === val}
                    onChange={() => set((s) => ({ ...s, freq: val as any }))}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button onClick={save} disabled={state.salvando}>
              {state.salvando ? "Salvando..." : "Salvar preferências"}
            </Button>
            {state.ok && (
              <span className="text-sm text-green-700">{state.ok}</span>
            )}
            {state.erro && (
              <span className="text-sm text-red-600">{state.erro}</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

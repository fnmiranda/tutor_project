"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from '@/context/authContext';

import Card from "@/components/Cards";
import Button from "@/components/Button";
import AlunoProfileForm from "@/components/PerfilAluno/AlunoProfileForm";
import { AvatarUpload, NotificationPrefs, SecurityPrefs } from "@/components/Perfil";

export default function PagePerfilAluno() {
  // estados dos modais (aluno)  
  const { userData } = useAuth();
  //
  const [editOpen, setEditOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // refs para foco inicial (sem ref no <Button>)
  const editRef = useRef<HTMLElement | null>(null);
  const prefsRef = useRef<HTMLElement | null>(null);

  // ESC fecha, bloqueia scroll e foca primeiro elemento focável
  useEffect(() => {
    const isOpen = editOpen || prefsOpen;
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (prefsOpen) setPrefsOpen(false);
        else if (editOpen) setEditOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ref = prefsOpen ? prefsRef : editRef;
    const firstFocusable = ref.current?.querySelector<HTMLElement>(
      '[data-autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [editOpen, prefsOpen]);

  const aluno = {
    nome: "João Santos",
    email: "aluno@email.com",
    instituicao: "Escola Estadual",
    bio: "Estudante em busca de conhecimento.",
    stats: { enviadas: 8, resolvidas: 6, materias: 3 },
  };

  return (
    <div className="flex items-center justify-center px-40">
      <div className="w-full flex-1 items-center justify-center flex-col " >
        {/* Cabeçalho do perfil (aluno) */}

        <Card className="mt-4 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
                {(userData.nome)[0]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold truncate">{userData.nome}</h1>
                  <span className="rounded-full bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                    Aluno
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{userData.email}</p>
              </div>
            </div>

            {/* >>> os dois botões ficam aqui <<< */}
            <div className="ml-auto flex gap-2">
              <Button
                onClick={() => setEditOpen(true)}
                aria-label="Editar perfil do aluno"
              >
                Editar
              </Button>
              <Button
                onClick={() => setPrefsOpen(true)}
                aria-label="Abrir preferências do aluno"
              >
                Preferências
              </Button>
            </div>
          </div>
        </Card>

        {/* Cards principais */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Informações">
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">Instituição</div>
                <div>{userData.instituition}</div>
              </div>
              <div>
                <div className="text-gray-500">Biografia</div>
                <div>{userData.bio}</div>
              </div>
            </div>
          </Card>

          <Card title="Estatísticas">
            <div className="grid grid-cols-3 text-center gap-2">
              <div>
                <div className="text-2xl font-bold">{aluno.stats.enviadas}</div>
                <div className="text-xs text-gray-500">Dúvidas Enviadas</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{aluno.stats.resolvidas}</div>
                <div className="text-xs text-gray-500">Dúvidas Resolvidas</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{aluno.stats.materias}</div>
                <div className="text-xs text-gray-500">Matérias Estudadas</div>
              </div>
            </div>
          </Card>
        </div>

        {/* MODAL: Edição */}
        {editOpen && (
          <div className="fixed inset-0 z-[1000] flex items-start sm:items-center justify-center p-2 sm:p-4">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setEditOpen(false)}
              aria-hidden
            />
            <section
              ref={editRef}
              role="dialog"
              aria-modal="true"
              aria-label="Editar perfil do aluno"
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5
                       max-h-[90vh] overflow-y-auto text-base"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b bg-white">
                <h2 className="text-lg font-semibold">Perfil</h2>
                <div className="w-30">
                  <Button data-autofocus onClick={() => setEditOpen(false)}>
                    Voltar
                  </Button>
                </div>
              </header>

              <div className="p-4 space-y-5">
                <Card title="Foto do Perfil" className="!p-4">
                  <AvatarUpload />
                  <p className="mt-2 text-xs text-gray-500">
                    PNG ou JPG até 2&nbsp;MB. (Mock — sem envio ainda)
                  </p>
                </Card>

                {/* Fecha ao salvar */}
                <AlunoProfileForm onSaved={() => setEditOpen(false)} />
              </div>
            </section>
          </div>
        )}

        {/* MODAL: Preferências (Notificações + Segurança) */}
        {prefsOpen && (
          <div className="fixed inset-0 z-[1000] h-[100%] flex items-start sm:items-center justify-center p-2 sm:p-4">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setPrefsOpen(false)}
              aria-hidden
            />
            <section
              ref={prefsRef}
              role="dialog"
              aria-modal="true"
              aria-label="Preferências do aluno"
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5
                       max-h-[90vh] overflow-y-auto text-base"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b bg-white">
                <h2 className="text-lg font-semibold">Preferências</h2>
                <div className="w-30">
                  <Button data-autofocus onClick={() => setPrefsOpen(false)}>
                    Fechar
                  </Button>

                </div>
              </header>

              <div className="p-4 space-y-6">
                <NotificationPrefs />
                <SecurityPrefs />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

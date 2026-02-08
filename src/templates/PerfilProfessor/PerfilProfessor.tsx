"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/authContext";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlunoProfileForm } from "@/components/PerfilAluno/AlunoProfileForm";
import {
  AvatarUpload,
  NotificationPrefs,
  SecurityPrefs,
} from "@/components/Perfil";

import {
  FaAddressCard,
  FaCheck,
  FaEdit,
  FaStar,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdAddCard, MdEmail } from "react-icons/md";
import { formatTimeDifference } from "@/utils/converterData";
import { CgClose } from "react-icons/cg";

export default function PagePerfilProfessor() {
  // estados dos modais (aluno)
  const { userData } = useAuth();
  //
  const [editOpen, setEditOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // refs para foco inicial (sem ref no <Button>)
  const editRef = useRef<HTMLElement | null>(null);
  const prefsRef = useRef<HTMLElement | null>(null);

  const [isOpenMaterias, setIsOpenMaterias] = useState(false);

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
      '[data-autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [editOpen, prefsOpen]);

  if (!userData) return <></>;

  const suasMaterias:string[] = isOpenMaterias
    ? userData?.especialidades
    : userData?.especialidades.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center px-10 mb-4">
      <div className="flex-1 flex-col w-full gap-2 items-center justify-center ">
        {/* Cabeçalho do perfil (aluno) */}

        <Card className="border-gray-100 border-2 rounded-2xl bg-linear-to-r from-blue-50 p-2 mt-8 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center p-6 gap-6 min-w-0">
              <div className="size-32 rounded-full bg-blue-400 text-white flex items-center justify-center text-5xl font-semibold">
                <FaUser />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-semibold truncate">
                    {userData.nome}
                  </h1>
                  <span className="rounded-full bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                    Aluno
                  </span>
                </div>
                <p className="flex flex-row items-center gap-2 text-md text-gray-500 truncate">
                  <MdEmail />
                  {userData.email}
                </p>
                <p className="flex flex-row gap-2 text-sm text-gray-500">
                  <span className="border-gray-400 pr-2 border-r-2">
                    {10} Atividades entregues
                  </span>
                  <span className="flex flex-row gap-1 items-center">
                    4.8{" "}
                    <span className="text-yellow-400">
                      <FaStar />
                    </span>
                  </span>
                  <span className="border-gray-400 pl-2 border-l-2">
                    22 Avaliações
                  </span>
                </p>
                <Button
                  className="flex flex-row mt-2 items-center justify-center gap-2 h-8 border-blue-500 bg-blue-600 rounded-md p-2 cursor-pointer
                   hover:bg-blue-800 text-white text-xs"
                  onClick={() => setEditOpen(true)}
                  aria-label="Editar perfil do aluno"
                >
                  <FaEdit />
                  Editar Perfil
                </Button>
              </div>
            </div>

            {/* >>> os dois botões ficam aqui <<< */}
            <div className="group relative overflow-visible
              ml-auto mr-8 flex gap-2 items-center">
              <Button
                className="flex items-center justify-center p-4 w-18 h-18 
                 z-20 transition-shadow duration-300 group-hover:text-white
                 text-blue-700  rounded-full cursor-pointer  hover:bg-blue-500 hover:text-white"
                onClick={() => setPrefsOpen(true)}
                aria-label="Abrir preferências do aluno"
              >
                <FaGear size={32} />
              </Button>

              <div className="absolute left-[-130%] opacity-0  transform origin-left
                group-hover:opacity-100  group-hover:left-0 group-hover:z-10
                tranlate-x-[30px] group-hover:translate-x-[-64%]
                transtion-all duration-500 ease-in-out
                w-50 px-4 py-6 rounded-full font-bold text-lg text-white bg-blue-500">
                Preferências 
              </div>
            </div>

          </div>
        </Card>

        {/* Cards principais */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Informações Institucionais">
            <div className="space-y-3 p-2 text-sm">
              <div>
                <div className="text-gray-500">Instituição</div>
                <div className="border-gray-800 rounded-md bg-gray-100 p-2">
                  {userData.instituicao}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Formação</div>
                <div className="border-gray-800 rounded-md bg-gray-100 p-2">
                  {userData.formacao}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Curso</div>
                <div className="border-gray-800 rounded-md bg-gray-100 p-2">
                  {userData?.curso}
                </div>
              </div>
            </div>
          </Card>
          <Card title="Profissional">
            <div className="space-y-3 p-2 text-sm">
              <div>
                <div className="text-gray-500">Biografia</div>
                <div className="border-gray-800 rounded-md text-justify  bg-gray-100 p-4">
                  {userData.bio}
                </div>
              </div>
              {/* <div>
                <div className="text-gray-500">Engressou à</div>
                <div className="border-gray-800 rounded-md bg-gray-100 p-2">
                  {formatTimeDifference(userData?.createdAt)}
                </div>
              </div> */}
              <div>
                <div className="text-gray-500">Materias</div>

                <div className="flex flex-row flex-wrap gap-2">
                  {suasMaterias.map((materia, index) => (
                    <div
                      key={index}
                      className="flex  items-center gap-2
                     text-gray-600 font-normal bg-gray-200 rounded-md px-2 py-1"
                    >
                      {materia}{" "}
                      <button className="cursor-pointer hover:text-white hover:bg-gray-400">
                        <CgClose size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <span
                  onClick={() => setIsOpenMaterias(!isOpenMaterias)}
                  className="flex w-25 mt-2 cursor-pointer items-center p-1 rounded-md hover:bg-gray-50"
                >
                  {!isOpenMaterias ? <>Ver Mais...</> : <>Ver Menos...</>}
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full mt-4">
          <Card title="Sessão de Pagamento ">
            <div className="flex flex-row items-center px-2 mb-2 justify-between">
              Cartão de Crédito
              <button className="flex flex-row gap-2 border-blue-500 bg-blue-600 rounded-md p-2 cursor-pointer hover:bg-blue-800 text-white">
                <MdAddCard size={24} />
                Adicionar cartão
              </button>
            </div>
            <div>
              <Card>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-4">
                    <FaAddressCard size={60} />
                    <div className="flex flex-col justify-start">
                      <span className="text-gray-500 text-sm">
                        ********8241-9084
                      </span>
                      <span className="text-gray-500 text-sm">
                        {" "}
                        NOME COMPLETO DO CARTAO
                      </span>
                      <span className="text-gray-500 text-xs">
                        Validade: 12/28
                      </span>
                    </div>
                    <div className="self-start mt-1">
                      <span className="flex flex-row w-26 justify-center h-6 items-center p-1 gap-2 text-xs text-white font-extrabold bg-green-400 rounded-md">
                        <FaCheck /> Verificado
                      </span>
                    </div>
                  </div>
                  <button className="flex flex-row h-10 items-center gap-2 bg-red-400 rounded-md p-2 cursor-pointer hover:bg-red-600 text-white">
                    <FaTrash /> Exluir
                  </button>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* MODAL: Edição */}
        {editOpen && (
          <div className="fixed inset-0 z-1000 flex items-start sm:items-center justify-center p-2 sm:p-4">
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
                <div className="w-8 h-8">
                  <button
                    className="flex cursor-pointer text-base font-extrabold
                   text-blue-500 hover:text-white bg-gray-100 hover:bg-blue-600 
                  w-full h-full border-0 rounded-3xl items-center justify-center "
                    data-autofocus
                    onClick={() => setEditOpen(false)}
                  >
                    X
                  </button>
                </div>
              </header>

              <div className="p-4 space-y-5">
                <Card title="Foto do Perfil" className="p-4">
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
          <div className="fixed inset-0 z-1000 h-full flex items-start sm:items-center justify-center p-2 sm:p-4">
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
                <div className="w-8 h-8">
                  <Button
                    className="flex cursor-pointer text-base font-extrabold
                   text-blue-500 hover:text-white bg-gray-100 hover:bg-blue-600 
                  w-full h-full border-0 rounded-3xl items-center justify-center "
                    data-autofocus
                    onClick={() => setPrefsOpen(false)}
                  >
                    X
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

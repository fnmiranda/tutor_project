"use client";

import { useState } from "react";
import "./novaDuvida.css";
import { FileUpload } from "../FileUpload/FileUpload";
import { InputDate } from "@/components/ui/InputDate";
import { Select } from "@/components/ui/Select";
import {
  MdOutlineClose,
  MdHelpOutline,
  MdOutlineTitle,
  MdOutlineDescription,
  MdSend,
} from "react-icons/md";

import { criarNovaDuvida } from "@/services/duvidas";
import { useRouter } from "next/navigation";
import { DISCIPLINAS } from "@/lib/constants/duvidas";
import { InputTime } from "@/components/ui/InputTime";
import DatePicker from "@/components/ui/DatePicker";
import { converterParaDataCompleta } from "@/utils/converterData";

const NovaDuvida = ({ onSucesso }: { onSucesso: () => void }) => {
  const router = useRouter();
  const [modalAberto, setModalAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [descricao, setDescricao] = useState("");

  const fecharModal = () => {
    setModalAberto(false);
    setEnviando(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    const resultado = await criarNovaDuvida({
      titulo,
      materia,
      descricao,
      deadLine: converterParaDataCompleta(data, horario),
    });

    if (resultado.success) {
      if (onSucesso) await onSucesso();
      fecharModal();
      router.refresh();
      setTitulo("");
      setMateria("");
      setData("");
      setHorario("");
      setDescricao("");
    } else {
      alert(resultado.error);
      setEnviando(false);
    }
  };

  return (
    <>
      <button className="open-modal-btn" onClick={() => setModalAberto(true)}>
        + Nova Dúvida
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-card">
            <header className="modal-header">
              <div className="header-brand">
                <div className="icon-box">
                  <MdHelpOutline size={28} />
                </div>
                <div className="text-box">
                  <h2>Enviar Nova Dúvida</h2>
                  <p>Nossos professores estão prontos para te ajudar</p>
                </div>
              </div>
              <button className="close-x" onClick={fecharModal}>
                <MdOutlineClose size={24} />
              </button>
            </header>

            <div className="modal-scroll-area">
              <form onSubmit={handleSubmit} className="styled-form">
                <div className="input-row">
                  <div className="field flex-2">
                    <label>
                      <MdOutlineTitle /> Título da Atividade
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Exercícios de Cálculo II"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="flex flex-row w-70 gap-2">
                    <div className="field flex-1">
                      <label>
                        <MdOutlineTitle /> Data
                      </label>
                      {/* <InputDate
                        label="Prazo Final"
                        value={data}
                        onChange={setData}
                        required
                      /> */}
                      <DatePicker
                        value={data}
                        onChange={setData}
                      />
                    </div>
                    <div className="field flex-1">
                      <label>
                        <MdOutlineTitle /> Hora
                      </label>
                      <InputTime
                        label="Prazo Final"
                        value={horario}
                        onChange={setHorario}
                        required
                      />
                      
                    </div>
                  </div>
                  <div className="field flex-1">
                    <label>
                      <MdOutlineTitle /> Materia
                    </label>
                    <Select
                      label="Disciplina"
                      value={materia}
                      onChange={setMateria}
                      options={DISCIPLINAS}
                      required
                    />
                  </div>
                  {/* <div className="field flex-1 empty-mobile"></div> */}
                </div>

                <div className="field">
                  <label>
                    <MdOutlineDescription /> Explicação Detalhada
                  </label>
                  <textarea
                    rows={4}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descreva aqui o que você precisa que o professor faça..."
                  ></textarea>
                </div>

                <div className="upload-container">
                  <label>Anexar material de apoio (opcional)</label>
                  <FileUpload />
                </div>

                <footer className="form-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={fecharModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={enviando}
                  >
                    <MdSend /> {enviando ? "Enviando..." : "Enviar Dúvida"}
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { NovaDuvida };

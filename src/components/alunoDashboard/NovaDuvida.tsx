"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './novaDuvida.css';
import FileUpload from "./FileUpload";

const NovaDuvida = () => {

    const [modalAberto, setModalAberto] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // O componente montou no cliente
    }, []);

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    const AdicionarNovaDuvida = () => {

        if (!isMounted) {
            return null;
        }

        return ReactDOM.createPortal(
            <div className="modal">
                <div className="modal-content">
                    <span className="close-btn" onClick={fecharModal}>&times;</span>
                    <h2>Adicionar Uma Duvida</h2>

                    <form>
                        <h3>Anexe sua atividade</h3>
                        <FileUpload />
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className='ml-4' htmlFor="name">Título da Atividade *</label>
                                <input className="w-[70%] ml-6" type="text" id="name" placeholder="Digite seu nome completo" required />
                            </div>

                            <div className="form-group">
                                <label className='ml-4 w-80' htmlFor="course">Qual a disciplina? *</label>
                                <select className="w-full px-4 py-2 border rounded" id="course" required defaultValue="">

                                    <option value="" disabled>Selecione</option>
                                    <option value="Matemática">Matemática</option>
                                    <option value="Português">Português</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className='ml-4' htmlFor="year">Prazo *</label>
                                <input type="text" id="year" placeholder="ex: 20/11/25" required />
                            </div>
                        </div>


                        <div className="form-group full-width">
                            <label className='ml-4' htmlFor="bio">Explique o que deve ser feito(opcional)</label>
                            <textarea className="w-[85%] ml-2" id="bio" rows={3} placeholder="Ex: Preciso que o trabalho seja digitalizado com todas as  justificativas"></textarea>
                        </div>

                        <h3>Material complementar para o tutor (opcional)</h3>
                        <FileUpload />

                        <div className="form-buttons">
                            <button type="button" className="cancel-btn" id="cancel-btn" onClick={fecharModal}>
                                Cancelar
                            </button>
                            <button type="submit" className="submit-btn">Adicionar Dúvida</button>
                        </div>
                    </form>
                </div>
            </div>,
            document.body
        );
    }

    return (
        <div>
            <button className='primaryButton' onClick={abrirModal}>
                + Nova Dúvida
            </button>
            {modalAberto && <AdicionarNovaDuvida />}
        </div>
    )

}

export default NovaDuvida;

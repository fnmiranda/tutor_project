"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './novaDuvida.css';
import FileUpload from "../FileUpload/FileUpload";
import { criarNovaDuvida } from "@/services/duvidas"; // Importe a função
import { useRouter } from "next/navigation";

const NovaDuvida = ({onSucesso} : {onSucesso:() => void}) => {
    const router = useRouter();
    const [modalAberto, setModalAberto] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [enviando, setEnviando] = useState(false);

    // Estados para os inputs
    const [titulo, setTitulo] = useState("");
    const [materia, setMateria] = useState("");
    const [prazo, setPrazo] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
            deadLine: prazo
        });

        if (resultado.success) {
            alert("Dúvida publicada com sucesso!");
            if (onSucesso) await onSucesso();
            fecharModal();
            router.refresh();
            // Limpar campos
            setTitulo("");
            setMateria("");
            setPrazo("");
            setDescricao("");
        } else {
            alert(resultado.error);
            setEnviando(false);
        }
    };

    const AdicionarNovaDuvidaModal = () => {
        if (!isMounted) return null;

        return ReactDOM.createPortal(
            <div className="modal">
                <div className="modal-content">
                    <span className="close-btn" onClick={fecharModal}>&times;</span>
                    <h2>Adicionar Uma Duvida</h2>
                    <FileUpload />
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="name">Título da Atividade *</label>
                                <input 
                                    className="w-full" 
                                    type="text" 
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    placeholder="Ex: Exercícios de Derivadas" 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="course">Disciplina *</label>
                                <select 
                                    className="w-full px-4 py-2 border rounded" 
                                    value={materia}
                                    onChange={(e) => setMateria(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Selecione</option>
                                    <option value="Matemática">Matemática</option>
                                    <option value="Português">Português</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="year">Prazo *</label>
                                <input 
                                    type="text" 
                                    value={prazo}
                                    onChange={(e) => setPrazo(e.target.value)}
                                    placeholder="ex: 20/11/25" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="bio">Explicação</label>
                            <textarea 
                                className="w-full" 
                                rows={3} 
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva os detalhes da sua dúvida..."
                            ></textarea>
                        </div>

                        <div className="form-buttons">
                            <button type="button" className="cancel-btn" onClick={fecharModal} disabled={enviando}>
                                Cancelar
                            </button>
                            <button type="submit" className="submit-btn" disabled={enviando}>
                                {enviando ? "Enviando..." : "Adicionar Dúvida"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>,
            document.body
        );
    }

    return (
        <div>
            <button className='primaryButton' onClick={() => setModalAberto(true)}>
                + Nova Dúvida
            </button>
            {modalAberto && <AdicionarNovaDuvidaModal />}
        </div>
    )
}

export default NovaDuvida;
import './duvidaCard.css';
import { HiUserCircle } from "react-icons/hi";

import { Duvida } from "../../database/mockDatabase"
import { formatDateBrazil } from '@/helpers/converterData';
import { useState } from 'react';
import ChatConversa from './Chat/Chat';

type DuvidaCardProps = {
    duvida: Duvida;
};


const getStatusClass = (status: string) => {
    if (status === "Respondida") {
        return "status-respondida";
    }
    if (status === "Aguardando Monitor") {
        return "status-aguardando";
    }
    return "status-default";
};

const DuvidaCard = ({ duvida }: DuvidaCardProps) => {
    if (!duvida) {
        return null;
    }
    const [duvidaSelecionada, setDuvidaSelecionada] = useState<Duvida | null>(null);
    const abrirChat = (duvida: any) => {
        setDuvidaSelecionada(duvida);
    };
    return (
        <div className="duvida-card">
            <div className="duvida-card-header">
                <h3 className="duvida-card-titulo">{duvida.titulo}</h3>
                <div className="duvida-card-tags">
                    <span className={`tag status-tag ${getStatusClass(duvida.status)}`}>
                        {duvida.status}
                    </span>
                    <span className="tag tag-materia">{duvida.materia}</span>
                </div>
            </div>

            <p className="duvida-card-conteudo">{duvida.descricao}</p>

            <div className="duvida-card-footer">
                <div className="footer-info-monitor">
                    {duvida.tutorId ? (
                        <>
                            <HiUserCircle className="icon-monitor" />
                            <span>Respondido por: <strong className="monitor-nome">{duvida.tutorId}</strong></span>
                        </>
                    ) : (
                        <span className="status-aguardando-texto">Aguardando uma resposta...</span>
                    )}
                </div>

                <div className="footer-acoes">
                    <span className="duvida-tempo">{formatDateBrazil(duvida.deadLine)}</span>
                    <button
                        className="btn-ver-conversa"
                        onClick={() => setDuvidaSelecionada(duvida)} // Agora o TS aceita a chamada
                    >
                        Ver Conversa
                    </button>

                </div>
            </div>

            {/* Lógica do Chat */}
            {duvidaSelecionada && (
                <div className="chat-overlay">
                    <ChatConversa
                        professorNome={duvidaSelecionada.tutorId || "Professor"}
                        onClose={() => setDuvidaSelecionada(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default DuvidaCard;

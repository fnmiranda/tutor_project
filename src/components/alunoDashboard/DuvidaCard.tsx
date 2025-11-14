import './duvidaCard.css';
import { HiUserCircle } from "react-icons/hi"; 

interface Duvida {
    id: number;
    titulo: string;
    materia: string;
    status: string;
    conteudo: string;
    respondidoPor?: string | null;
    tempo: string;
}

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
            
            <p className="duvida-card-conteudo">{duvida.conteudo}</p>
            
            <div className="duvida-card-footer">
                <div className="footer-info-monitor">
                    {duvida.respondidoPor ? (
                        <>
                            <HiUserCircle className="icon-monitor" />
                            <span>Respondido por: <strong className="monitor-nome">{duvida.respondidoPor}</strong></span>
                        </>
                    ) : (
                        <span className="status-aguardando-texto">Aguardando uma resposta...</span>
                    )}
                </div>
                
                <div className="footer-acoes">
                    <span className="duvida-tempo">{duvida.tempo}</span>
                    <button className="btn-ver-conversa">Ver Conversa</button>
                </div>
            </div>
        </div>
    );
};

export default DuvidaCard;
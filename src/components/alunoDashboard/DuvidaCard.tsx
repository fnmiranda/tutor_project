import * as React from "react";

// Define a estrutura de dados (interface) para o objeto de dúvida.
// O campo 'respondidoPor' é opcional (pode ser null se ainda não foi respondida).
interface Duvida {
    id: number;
    titulo: string;
    materia: string;
    status: string;
    conteudo: string;
    respondidoPor?: string | null;
    tempo: string;
}

// Define o tipo para as propriedades que o componente DuvidaCard espera receber.
type DuvidaCardProps = {
    duvida: Duvida;
};

/**
 * Componente que exibe um resumo de uma única dúvida enviada pelo aluno.
 * É responsável por renderizar o título, status, conteúdo e ações relacionadas.
 */
const DuvidaCard = ({ duvida }: DuvidaCardProps) => {
    // Verificação para garantir que o componente não renderize se a prop 'duvida' não for fornecida.
    if (!duvida) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{duvida.titulo}</h3>
                <div className="flex space-x-2 flex-shrink-0">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ duvida.status === "Respondida" ? "bg-green-100 text-green-800" : duvida.status === "Aguardando Monitor" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800" }`}>
                        {duvida.status}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{duvida.materia}</span>
                </div>
            </div>
            <p className="text-gray-600 mb-4">{duvida.conteudo}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4 mt-4">
                <div className="flex items-center space-x-2">
                    {duvida.respondidoPor ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
                            <span>Respondido por: <strong>{duvida.respondidoPor}</strong></span>
                        </>
                    ) : (
                        <span className="text-yellow-600">Aguardando uma resposta...</span>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-500">{duvida.tempo}</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Ver Conversa</button>
                </div>
            </div>
        </div>
    );
};

export default DuvidaCard;

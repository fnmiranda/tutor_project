import * as React from "react";

// O componente StarIcon foi incorporado neste ficheiro para resolver o erro de importação.
type StarIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
};

const StarIcon = ({ className = "w-5 h-5", title, ...rest }: StarIconProps) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden={title ? undefined : true}
    role={title ? "img" : "presentation"}
    className={className}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.45a1 1 0 0 0 .95.69h3.627c.968 0 1.371 1.24.588 1.81l-2.936 2.133a1 1 0 0 0-.364 1.118l1.12 3.45c.3.921-.755 1.688-1.54 1.118L10.95 14.65a1 1 0 0 0-1.175 0l-2.586 1.867c-.784.57-1.84-.197-1.54-1.118l1.12-3.45a1 1 0 0 0-.364-1.118L3.47 8.877c-.783-.57-.38-1.81.588-1.81h3.627a1 1 0 0 0 .95-.69l1.12-3.45Z" />
  </svg>
);


// Define a estrutura de dados (interface) para o objeto de avaliação.
interface Avaliacao {
    id: number;
    avaliado: string;
    nota: number;
    comentario: string;
    data: string;
}

// Define o tipo para as propriedades que o componente AvaliacaoCard espera receber.
type AvaliacaoCardProps = {
    avaliacao: Avaliacao;
};

/**
 * Componente que exibe as informações de uma única avaliação enviada pelo aluno.
 * É responsável por renderizar os detalhes, a nota em estrelas e as ações.
 */
const AvaliacaoCard = ({ avaliacao }: AvaliacaoCardProps) => {
    // Adiciona uma verificação para garantir que o componente não renderize se a prop 'avaliacao' não for fornecida.
    if (!avaliacao) {
        return null;
    }

    return (
        <div className="border-t pt-4 first:border-t-0 first:pt-0">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-700">
                        Avaliação para: {avaliacao.avaliado}
                    </h3>
                </div>
                <span className="text-sm text-gray-500">{avaliacao.data}</span>
            </div>
            <div className="flex items-center my-2">
                {/* Renderiza 5 ícones de estrela, passando a classe CSS apropriada
                  para definir a cor com base na nota da avaliação. */}
                {[...Array(5)].map((_, index) => (
                    <StarIcon 
                        key={index} 
                        className={`w-5 h-5 ${index < avaliacao.nota ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                ))}
            </div>
            <p className="text-gray-600 italic mb-4">
                "{avaliacao.comentario}"
            </p>
            <div className="flex justify-end pt-2">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Alterar Avaliação
                </button>
            </div>
        </div>
    );
};

export default AvaliacaoCard;


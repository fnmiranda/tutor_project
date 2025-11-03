// FiltroCards.tsx
import React from 'react'; // Importe React para tipos como React.ChangeEvent
import './filtreCards.css';

// 1. Defina os tipos das props que este componente recebe
interface FiltroCardsProps {
  valorSelecionado: string;
  aoMudarValor: (evento: React.ChangeEvent<HTMLSelectElement>) => void;
}

// 2. Aplique a interface de props ao componente
//    Usamos React.FC (Functional Component) ou tipamos as props diretamente.
//    Tipar diretamente é mais comum hoje:
export default function FiltroCards({ valorSelecionado, aoMudarValor }: FiltroCardsProps) {
  return (
    <div className='form-group'>
      <select
        id="filtroCards"
        value={valorSelecionado} // Controlado pelo estado do pai
        onChange={aoMudarValor}  // Chama a função do pai
      >
        <option value="Todas">Todas as Dúvidas</option>
        <option value="Respondida">Respondida</option>
        <option value="Aguardando Monitor">Aguardando Monitor</option>
        <option value="Fechada">Fechada</option>
      </select>
    </div>
  );
}
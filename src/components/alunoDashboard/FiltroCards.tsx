import React from 'react';
import './filtroCards.css';

interface InfoStats {
  value: number; 
  label: string; 
  filterValue: string; 
}

interface FiltroCardsProps {
  valorSelecionado: string;
  aoMudarValor: (evento: React.ChangeEvent<HTMLInputElement>) => void;
  stats: InfoStats[];
}

export default function FiltroCards({ valorSelecionado, aoMudarValor, stats }: FiltroCardsProps) {
  return (
    <div className='form-group'>
      {stats.map((stat) => {
        const isChecked = stat.filterValue === valorSelecionado;
        const inputId = `filter-${stat.filterValue}`;

        return (
          <label
            htmlFor={inputId}
            key={inputId}
            className={`stat ${isChecked ? 'active' : ''}`}
          >
            <input
              type="radio"
              id={inputId}
              name="filtro-stats" 
              value={stat.filterValue} 
              checked={isChecked}
              onChange={aoMudarValor}
              className="stat__input-radio" 
            />
            
            <span className="stat__label">{stat.label}</span>
            <span className="stat__value">{stat.value}</span>
          </label>
        );
      })}
    </div>
  );
}
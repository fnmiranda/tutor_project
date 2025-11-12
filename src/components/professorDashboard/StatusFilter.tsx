"use client";
import React from "react";
import "./professorCSS.css"; // Usa o mesmo CSS

// Define os tipos de status que o filtro pode ter
type StatusOption = 'all' | 'new' | 'in_progress' | 'answered';

interface StatusFilterProps {
  activeStatus: StatusOption;
  onChange: (status: StatusOption) => void;
}

// Define os botões que queremos renderizar
const filterOptions = [
  { label: "Tudo", value: 'all' },
  { label: "Novas", value: 'new' },
  { label: "Pendentes", value: 'in_progress' },
  { label: "Concluídas", value: 'answered' },
] as const; // 'as const' é uma boa prática em TypeScript

export function StatusFilter({ activeStatus, onChange }: StatusFilterProps) {
  return (
    <div className="filter-pills-container">
      {filterOptions.map(option => (
        <button
          key={option.value}
          // Aplica a classe 'active' se o 'value' do botão for o mesmo do estado 'activeStatus'
          className={`filter-pill ${activeStatus === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
"use client";
import React from "react";
import "../professorCSS.css";

// ATUALIZADO: O tipo 'all' foi removido
type StatusOption = 'aberta' | 'em_andamento' | 'concluida';

interface StatusFilterProps {
  activeStatus: StatusOption;
  onChange: (status: StatusOption) => void;
}

// ATUALIZADO: O objeto { label: "Tudo", value: 'all' } foi removido
const filterOptions = [
  { label: "Abertas", value: 'aberta' },
  { label: "Em andamento", value: 'em_andamento' },
  { label: "Concluídas", value: 'concluida' },
] as const;

export function StatusFilter({ activeStatus, onChange }: StatusFilterProps) {
  return (
    <div className="filter-pills-container">
      {filterOptions.map(option => (
        <button
          key={option.value}
          className={`filter-pill ${activeStatus === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

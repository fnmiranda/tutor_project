"use client";
import React from "react";
import "./professorCSS.css";

// ATUALIZADO: O tipo 'all' foi removido
type StatusOption = 'new' | 'em_proposta' | 'in_progress' | 'answered';

interface StatusFilterProps {
  activeStatus: StatusOption;
  onChange: (status: StatusOption) => void;
}

// ATUALIZADO: O objeto { label: "Tudo", value: 'all' } foi removido
const filterOptions = [
  { label: "Novas", value: 'new' },
  { label: "Em Proposta", value: 'em_proposta' },
  { label: "Pendentes", value: 'in_progress' },
  { label: "Concluídas", value: 'answered' },
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
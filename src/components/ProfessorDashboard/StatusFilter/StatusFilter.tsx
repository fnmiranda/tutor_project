"use client";
import React from "react";
import "../professorCSS.css";
import { StatusDuvidaOption } from "@/@types";

// ATUALIZADO: O tipo 'all' foi removido

interface StatusFilterProps {
  activeStatus: StatusDuvidaOption;
  onChange: (status: StatusDuvidaOption) => void;
}

// ATUALIZADO: O objeto { label: "Tudo", value: 'all' } foi removido
const filterOptions = [
  { label: "Abertas", value: 'aberta' },
  { label: "Negociando", value: 'em_negociacao' },
  { label: "Aceita", value: 'aceita' },
  { label: "Concluídas", value: 'concluida' },
] as const;

export function StatusFilter({ activeStatus, onChange }: StatusFilterProps) {
  return (
    <div className=" bg-transparent">
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

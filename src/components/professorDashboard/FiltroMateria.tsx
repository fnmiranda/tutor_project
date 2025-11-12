// src/components/professorDashboard/FiltroMateria.tsx

"use client";
import React from "react";
import "./professorCSS.css"; // (Caminho do seu CSS)

// 1. Definimos a interface de props que o componente espera
interface FiltroMateriaProps {
  materiaSelecionada: string;
  onChange: (novaMateria: string) => void;
}

// 2. Recebemos as props 'materiaSelecionada' e 'onChange'
export function FiltroMateria({ materiaSelecionada, onChange }: FiltroMateriaProps) {
  
  // 3. O useState local foi REMOVIDO מכאן

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 4. Em vez de atualizar um estado local,
    // chamamos a função 'onChange' que veio do componente "pai"
    onChange(event.target.value);
  };

  return (
    <div className="filter-container">
      <label htmlFor="materia-select" className="filter-label">
        Filtrar por matéria:
      </label>

      <select
        id="materia-select"
        value={materiaSelecionada} // 5. O valor é controlado pelo "pai"
        onChange={handleChange}
        className="filter-select"
      >
        {/* O valor "Todas" agora é uma string vazia "" para facilitar a lógica de filtro */}
        <option value="">Todas</option>
        <option value="Cálculo I">Cálculo I</option>
        <option value="Física I">Física I</option>
        <option value="Física II">Física II</option>
        <option value="Álgebra Linear">Álgebra Linear</option>
        {/* Adicione outras matérias se necessário */}
      </select>
    </div>
  );
}
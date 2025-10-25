"use client";
import React, { useState } from "react";
import "../../components/professorDashboard/professorCSS.css"; // importa estilos globais

export function FiltroMateria() {
  const [materia, setMateria] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMateria(event.target.value);
  };

  return (
    <div className="filter-container">
      <label htmlFor="materia-select" className="filter-label">
        Filtrar por matéria:
      </label>

      <select
        id="materia-select"
        value={materia}
        onChange={handleChange}
        className="filter-select"
      >
        <option value="">Todas</option>
        <option value="Cálculo I">Cálculo I</option>
        <option value="Física I">Física I</option>
        <option value="Álgebra Linear">Álgebra Linear</option>
        <option value="Geometria Analítica">Geometria Analítica</option>
        <option value="Programação I">Programação I</option>
      </select>
    </div>
  );
}

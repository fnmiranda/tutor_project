"use client";

import React from 'react';
import styles from './inputDate.module.css';

interface InputDateProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const InputDate: React.FC<InputDateProps> = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  placeholder = "DD/MM/YYYY"
}) => {
  
  const handleMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); 

    if (v.length > 8) v = v.slice(0, 8); // Limita a 8 dígitos (DDMMYYYY)

    // Aplica a máscara DD/MM/YYYY
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1/$2");
    if (v.length > 5) v = v.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    onChange(v);
  };

  const validateDate = () => {
    if (value.length === 10) { // DD/MM/YYYY completo
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      
      // Verifica se a data é válida
      if (date.getFullYear() !== year || 
          date.getMonth() !== month - 1 || 
          date.getDate() !== day) {
        console.warn("Data inválida");
      }
    }
  };

  return (
    <div className={styles.inputGroup}>
      {/* {label && <label className={styles.label}>{label}</label>} */}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          step='1'
          value={value}
          onChange={handleMask}
          onBlur={validateDate}
          placeholder={placeholder}
          className={styles.customInput}
          required={required}
          maxLength={10} // DD/MM/YYYY
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export { InputDate };
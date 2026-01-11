"use client";

import React from 'react';
import styles from './inputDate.module.css';
import { MdOutlineCalendarToday } from "react-icons/md";

interface InputDateProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const InputDate: React.FC<InputDateProps> = ({ label, value, onChange, required }) => {
  
  const handleMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); 

    if (v.length > 12) v = v.slice(0, 12); 

    // Aplica a máscara DD/MM/YYYY - HH:MM
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1/$2");
    if (v.length > 5) v = v.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    if (v.length > 10) v = v.replace(/^(\d{2})\/(\d{2})\/(\d{4})(\d)/, "$1/$2/$3 - $4");
    if (v.length > 13) v = v.replace(/(\d{2}):(\d{2})$/, "$1:$2"); // Garante o formato final

    // Ajuste fino para os dois pontos da hora após o hífen
    if (v.includes("-") && v.length >= 16) {
        const parts = v.split("- ");
        if (parts[1] && parts[1].length === 4) {
            v = `${parts[0]}- ${parts[1].slice(0, 2)}:${parts[1].slice(2)}`;
        }
    }

    onChange(v);
  };

  return (
    <div className={styles.inputGroup}>
      {/* <label className={styles.label}>
        <MdOutlineCalendarToday /> {label}
      </label> */}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={handleMask}
          placeholder="31/12/2025 - 14:00"
          className={styles.customInput}
          required={required}
          maxLength={18} 
        />
      </div>
    </div>
  );
};

export default InputDate;
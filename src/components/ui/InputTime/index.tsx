"use client";

import React from 'react';
import styles from './inputTime.module.css';
// import { FaClock } from "react-icons/fa6";

interface InputTimeProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  showSeconds?: boolean;
}

const InputTime: React.FC<InputTimeProps> = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  placeholder = "HH:MM",
  showSeconds = false
}) => {
  
  const handleMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, ""); 

    // Define o limite baseado se mostra segundos ou não
    const maxLength = showSeconds ? 6 : 4; // HHMMSS ou HHMM
    if (v.length > maxLength) v = v.slice(0, maxLength);

    // Aplica a máscara baseada na configuração
    if (showSeconds) {
      // Formato HH:MM:SS
      if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1:$2");
      if (v.length > 5) v = v.replace(/^(\d{2}):(\d{2})(\d)/, "$1:$2:$3");
    } else {
      // Formato HH:MM
      if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1:$2");
    }

    onChange(v);
  };

  const validateTime = () => {
    if (value) {
      const parts = showSeconds ? value.split(':') : [value];
      
      if (parts.length > 0) {
        const hours = parseInt(parts[0]) || 0;
        const minutes = parts[1] ? parseInt(parts[1]) || 0 : 0;
        const seconds = parts[2] ? parseInt(parts[2]) || 0 : 0;

        if (hours < 0 || hours > 23) {
          console.warn("Hora inválida. Use 0-23.");
        }
        if (minutes < 0 || minutes > 59) {
          console.warn("Minutos inválidos. Use 0-59.");
        }
        if (showSeconds && (seconds < 0 || seconds > 59)) {
          console.warn("Segundos inválidos. Use 0-59.");
        }
      }
    }
  };

  return (
    <div className={styles.inputGroup}>
      {/* {label && <label className={styles.label}>{label}</label>} */}
      <div className={styles.inputWrapper}>
        {/* <FaClock /> */}
        <input
          type="time"
          value={value}
          onChange={handleMask}
          onBlur={validateTime}
          placeholder={placeholder}
          className={styles.customInput}
          required={required}
          maxLength={showSeconds ? 8 : 5} // HH:MM:SS ou HH:MM
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export { InputTime };
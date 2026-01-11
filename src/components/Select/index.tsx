"use client";

import React from 'react';
import styles from './select.module.css';
import { HiOutlineAcademicCap } from "react-icons/hi";



interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  value, 
  options, 
  onChange, 
  required, 
  placeholder = "Selecione" 
}) => {
  return (
    <div className={styles.inputGroup}>
      {/* <label className={styles.label}>
        <HiOutlineAcademicCap /> {label}
      </label> */}
      <div className={styles.selectWrapper}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.customSelect}
          required={required}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
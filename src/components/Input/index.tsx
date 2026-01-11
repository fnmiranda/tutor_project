import React from 'react';
import styles from './input.module.css';

// Herdamos todas as propriedades de um <input> do HTML.
// Isso inclui 'value', 'onChange', 'type', 'placeholder', 'disabled', etc.
// Adicionamos uma prop opcional 'label' para o texto que fica acima do campo.
type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  // Geramos um ID único para conectar o label ao input (importante para acessibilidade)
  const inputId = React.useId();

  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input
        id={inputId}
        className={styles.customInput}
        {...props} // Passa todas as props restantes (value, onChange, type, etc.)
      />
    </div>
  );
};

export default Input;
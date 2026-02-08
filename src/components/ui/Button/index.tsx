import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

//children é o que deve estar escrito no botao
const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <button
      className={styles.customButton}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export {Button};
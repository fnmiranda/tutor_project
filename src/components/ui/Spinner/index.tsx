"use client";

import React from 'react';
import './loading.css';

interface LoadingProps {
  fullPage?: boolean;
  message?: string;
  theme?: 'aluno' | 'tutor';
}

const Loading: React.FC<LoadingProps> = ({ 
  fullPage = false, 
  message = "Carregando...", 
  theme = 'aluno' 
}) => {
  return (
    <div className={`loading-container ${fullPage ? 'full-page' : ''}`}>
      <div className={`spinner ${theme === 'tutor' ? 'tutor-spinner' : 'aluno-spinner'}`}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      {message && <p className="loading-text">{message}</p>}
    </div>
  );
};

export default Loading;
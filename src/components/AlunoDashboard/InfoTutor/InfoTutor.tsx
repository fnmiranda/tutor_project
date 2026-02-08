"use client";

import React from 'react';
import styles from './InfoTutor.module.css';
import { 
  MdOutlinePerson, 
  MdOutlineEmail, 
  MdOutlineVerified, 
  MdChatBubbleOutline,
  MdOutlineStar
} from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';

interface InfoTutorProps {
  tutor: {
    nome?: string;
    email?: string;
    bio?: string | null;
    rating?: number;
  };
  onChatClick?: () => void;
}

const InfoTutor: React.FC<InfoTutorProps> = ({ tutor, onChatClick }) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <HiOutlineAcademicCap size={32} />
          </div>
          <div className={styles.verifiedBadge}>
            <MdOutlineVerified size={16} />
          </div>
        </div>
        <div className={styles.headerInfo}>
          <h2 className={styles.name}>{tutor.nome}</h2>
          <div className={styles.rating}>
            <MdOutlineStar className={styles.starIcon} />
            <span>{tutor.rating || "5.0"} (Tutor Verificado)</span>
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.infoGroup}>
          <label><MdOutlineEmail /> E-mail de Contato</label>
          <div className={styles.infoValue}>{tutor.email}</div>
        </div>

        {tutor.bio && (
          <div className={styles.infoGroup}>
            <label><MdOutlinePerson /> Sobre o Tutor</label>
            <p className={styles.bioText}>{tutor.bio}</p>
          </div>
        )}

        <div className={styles.alertBox}>
          <p>Negociação aceita! Agora você pode entrar em contato direto com seu tutor para iniciar a aula.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <button className={styles.chatBtn} onClick={onChatClick}>
          <MdChatBubbleOutline size={20} />
          Abrir Chat com Tutor
        </button>
      </footer>
    </div>
  );
};

export default InfoTutor;
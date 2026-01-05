"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import { MdSend, MdOutlineArrowBack, MdAttachFile } from 'react-icons/md';
import { HiOutlineUserCircle } from "react-icons/hi";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export default function ChatConversa({ professorNome, onClose }: { professorNome: string, onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'aluno-logado', // ID do contexto de auth
      text: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header do Chat */}
      <header className={styles.chatHeader}>
        <button onClick={onClose} className={styles.backBtn}>
          <MdOutlineArrowBack size={24} />
        </button>
        <div className={styles.userInfo}>
          <HiOutlineUserCircle size={32} />
          <div>
            <h3>{professorNome}</h3>
            <span>Online</span>
          </div>
        </div>
      </header>

      {/* Área de Mensagens */}
      <div className={styles.messagesArea}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageWrapper} ${msg.senderId === 'aluno-logado' ? styles.sent : styles.received}`}
          >
            <div className={styles.messageBubble}>
              <p>{msg.text}</p>
              <span className={styles.time}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input de Mensagem */}
      <footer className={styles.chatFooter}>
        <button className={styles.attachBtn}><MdAttachFile size={22} /></button>
        <input
          type="text"
          placeholder="Digite sua dúvida aqui..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className={styles.sendBtn} onClick={handleSendMessage}>
          <MdSend size={22} />
        </button>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.css';
import { 
  MdCalendarMonth, 
  MdChevronLeft, 
  MdChevronRight, 
  MdOutlineEventAvailable 
} from 'react-icons/md';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o calendário ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDateClick = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(selected.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const startDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const isSelected = value === new Date(viewDate.getFullYear(), viewDate.getMonth(), d).toISOString().split('T')[0];
      days.push(
        <button 
          key={d} 
          type="button"
          className={`${styles.day} ${isSelected ? styles.selectedDay : ''}`}
          onClick={() => handleDateClick(d)}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  return (
    <div className={styles.datePickerWrapper} ref={containerRef}>
      {/* {label && <label className={styles.label}>{label}</label>} */}
      
      <div className={styles.inputContainer} onClick={() => setIsOpen(!isOpen)}>
        <MdCalendarMonth className={styles.icon} />
        <input 
          type="text" 
          readOnly 
          placeholder="Selecione"
          value={value ? new Date(value + 'T00:00:00').toLocaleDateString('pt-BR') : ''}
          className={styles.input}
          required={required}
        />
      </div>

      {isOpen && (
        <div className={styles.calendarPopover}>
          <header className={styles.calendarHeader}>
            <button type="button" onClick={() => changeMonth(-1)}><MdChevronLeft /></button>
            <span className={styles.currentMonth}>
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button type="button" onClick={() => changeMonth(1)}><MdChevronRight /></button>
          </header>
          
          <div className={styles.weekDays}>
            <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
          </div>
          
          <div className={styles.daysGrid}>
            {renderDays()}
          </div>

          <footer className={styles.calendarFooter}>
            <button type="button" onClick={() => { onChange(''); setIsOpen(false); }}>Limpar</button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
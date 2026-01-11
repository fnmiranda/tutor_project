"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./TabBar.css";
import { useAuth } from '@/context/authContext';
// Importando ícones do React Icons
import { VscDashboard, VscSettingsGear } from "react-icons/vsc";
import { HiOutlineUserCircle, HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineNotificationsNone, MdOutlineAccountBalanceWallet, MdOutlineClass } from "react-icons/md";
import NotificationModal from "./NotificationModal/NotificationModal";

interface TopBarProps {
  saldo: number;
}

export default function TopBar({ saldo }: TopBarProps) {
  const { userData, userType, logout } = useAuth();
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: "1", title: "Nova atividade", description: "Maria entregou a tarefa.", time: "5 min atrás", isRead: false },
    { id: "2", title: "Reunião", description: "Agendada para amanhã.", time: "1 hora atrás", isRead: false },
    { id: "3", title: "Aviso", description: "Prazo de correção termina hoje.", time: "3 horas atrás", isRead: true },
  ]);

  const toggleNotifications = () => setIsNotifOpen(!isNotifOpen);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Define se é Tutor baseado no userType do contexto
  const isTutor = userType === 'tutor';

  // Configuração de rotas dinâmicas
  const routes = isTutor
    ? [
      { name: "Dashboard", path: "/tutor/dashboard", icon: <VscDashboard /> },
      { name: "Financeiro", path: "/tutor/finances", icon: <MdOutlineAccountBalanceWallet /> },
      { name: "Perfil", path: "/tutor/perfil", icon: <HiOutlineUserCircle /> },
    ]
    : [
      { name: "Minhas Aulas", path: "/aluno/dashboard", icon: <MdOutlineClass /> },
      { name: "Encontrar Tutor", path: "/aluno/search", icon: <HiOutlineAcademicCap /> },
      { name: "Perfil", path: "/aluno/perfil", icon: <HiOutlineUserCircle /> },
    ];

  return (
    <header className={`topbar ${isTutor ? "tutor-theme" : "aluno-theme"}`}>
      <div className="topbar-container">

        {/* LADO ESQUERDO: Logo */}
        <div className="topbar-left">
          <div className="brand-box">
            <span className="brand-icon">🎓</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">Tunno</span>
            <span className="brand-sub">
              {isTutor ? "Portal do Professor" : "Portal do Aluno"}
            </span>
          </div>
        </div>

        {/* CENTRO: Navegação Dinâmica */}
        <nav className="topbar-center">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`nav-item ${pathname === route.path ? "active" : ""}`}
            >
              <span className="icon-wrapper">{route.icon}</span>
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>

        {/* LADO DIREITO: Notificação e Perfil */}
        <div className="topbar-right">
          {isTutor && (
            <div className="balance-pill">
              R$ {saldo.toFixed(2).replace('.', ',')}
            </div>
          )}

          <button className="notification-btn" onClick={toggleNotifications}>
            <MdOutlineNotificationsNone size={20} />
            <span className="notification-dot"></span>
            {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
          </button>
          {isNotifOpen && (
            <NotificationModal
              notifications={notifications}
              onClose={() => setIsNotifOpen(false)}
              onMarkAsRead={markAsRead}
            />
          )}
          <div className="profile-pill" onClick={logout}>
            <div className="profile-avatar">
              <HiOutlineUserCircle size={24} />
            </div>
            <div className="profile-info">
              <span className="profile-name">
                {isTutor ? `Prof. ${userData?.nome?.split(' ')[0]}` : userData?.nome?.split(' ')[0]}
              </span>
              <span className="profile-email">{userData?.email}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

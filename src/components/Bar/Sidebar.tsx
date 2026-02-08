"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useAuth } from '@/context/authContext';
import { VscDashboard } from "react-icons/vsc";
import { HiOutlineUserCircle, HiOutlineAcademicCap } from "react-icons/hi";
import { 
  MdOutlineNotificationsNone, 
  MdOutlineAccountBalanceWallet, 
  MdOutlineClass,
  MdLogout 
} from "react-icons/md";
import NotificationModal from "./NotificationModal/NotificationModal";

interface SidebarProps {
  saldo: number;
  userType: string;
}

export default function Sidebar({ saldo, userType }: SidebarProps) {
  const { userData, logout } = useAuth();
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: "1", title: "Nova atividade", description: "Maria entregou a tarefa.", time: "5 min atrás", isRead: false },
    { id: "2", title: "Reunião", description: "Agendada para amanhã.", time: "1 hora atrás", isRead: false },
  ]);

  const isTutor = userType === 'tutor';
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const routes = isTutor
    ? [
      { name: "Atividades", path: "/tutor/dashboard", icon: <VscDashboard /> },
      { name: "Dashboard", path: "/tutor/finances", icon: <MdOutlineAccountBalanceWallet /> },
      { name: "Perfil", path: "/tutor/perfil", icon: <HiOutlineUserCircle /> },
    ]
    : [
      { name: "Minhas Aulas", path: "/aluno/dashboard", icon: <MdOutlineClass /> },
      { name: "Encontrar Tutor", path: "/aluno/search", icon: <HiOutlineAcademicCap /> },
      { name: "Perfil", path: "/aluno/perfil", icon: <HiOutlineUserCircle /> },
    ];

  return (
    <aside className={`${styles.sidebar} ${isTutor ? styles.tutorTheme : styles.alunoTheme}`}>
      {/* HEADER: Logo */}
      <div className={styles.logoSection}>
        <div className={styles.brandBox}>
          <span className={styles.brandIcon}>🎓</span>
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Tunno</span>
          <span className={styles.brandSub}>
            {isTutor ? "Professor" : "Aluno"}
          </span>
        </div>
      </div>

      {/* FINANCEIRO (Apenas Tutor) */}
      {isTutor && (
        <div className={styles.balanceCard}>
          <p className={styles.balanceLabel}>Saldo disponível</p>
          <p className={styles.balanceValue}>R$ {saldo.toFixed(2).replace('.', ',')}</p>
        </div>
      )}

      {/* NAVEGAÇÃO */}
      <nav className={styles.navigation}>
        <p className={styles.navLabel}>Menu Principal</p>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`${styles.navItem} ${pathname === route.path ? styles.active : ""}`}
          >
            <span className={styles.iconWrapper}>{route.icon}</span>
            <span className={styles.routeName}>{route.name}</span>
          </Link>
        ))}
      </nav>

      {/* RODAPÉ: Notificações e Perfil */}
      <div className={styles.sidebarFooter}>
        <button className={styles.notificationBtn} onClick={() => setIsNotifOpen(!isNotifOpen)}>
          <MdOutlineNotificationsNone size={24} />
          {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
        </button>

        {isNotifOpen && (
          <div className={styles.notifWrapper}>
             <NotificationModal
                notifications={notifications}
                onClose={() => setIsNotifOpen(false)}
                onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? {...n, isRead: true} : n))}
              />
          </div>
        )}

        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>
            <HiOutlineUserCircle size={32} />
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.userName}>{userData?.nome?.split(' ')[0] || "Usuário"}</span>
            <button onClick={logout} className={styles.logoutBtn}>
              <MdLogout size={14} /> Sair
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
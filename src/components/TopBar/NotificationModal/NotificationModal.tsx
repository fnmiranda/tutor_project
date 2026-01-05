"use client";
import React from "react";
import styles from "./NotificationModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationModal({
  notifications, onClose,
  onMarkAsRead
}: NotificationModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Notificações</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <IoCloseOutline size={24} />
          </button>
        </header>

        <div className={styles.content}>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`${styles.notifItem} ${!notif.isRead ? styles.unread : ""}`}
              onClick={() => onMarkAsRead(notif.id)}
            >
              <div className={styles.notifHeader}>
                {!notif.isRead && <span className={styles.blueDot} />}
                <span className={styles.title}>{notif.title}</span>
              </div>
              <p className={styles.description}>{notif.description}</p>
              <span className={styles.time}>{notif.time}</span>
            </div>
          ))}
        </div>

        <footer className={styles.footer}>
          <button className={styles.viewAllBtn}>Ver todas as notificações</button>
        </footer>
      </div>
    </div>
  );
}

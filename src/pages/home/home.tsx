import React, { useState } from 'react';
import styles from './home.module.css';
import LoginForm, { UserType } from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
// Importe os ícones de uma biblioteca como 'react-icons' ou use SVGs/Imagens
// Para este exemplo, usarei ícones genéricos representados por <span>
type ViewState = 'selection' | UserType;
type FormMode = 'login' | 'register';

const HomeScreen = () => {
  const [view, setView] = useState<ViewState>('selection');
  const [mode, setMode] = useState<FormMode>('login');
  const handleBack = () => {
    setView('selection');
    setMode('login'); // Reseta o modo ao voltar
  };
  return (
    <div className={styles.container}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1655800466797-8ab2598b4274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBlZHVjYXRpb258ZW58MXx8fHwxNzY2NDMwMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
      }}
    >
      <div className={styles.overlay}>

        {view === 'selection' ? (
          <>
            <header className={styles.header}>
              <div className={styles.logoCircle}>🎓</div>
              <h1>Tunno</h1>
              <p>Selecione o tipo de usuário para continuar</p>
            </header>

            <main className={styles.cardContainer}>
              <div
                className={`${styles.card} ${styles.professorCard}`}
                onClick={() => setView('tutor')}
              >
                <div className={styles.iconCircle}>📖</div>
                <h2>Professor</h2>
                <p>Acesso à área de gerenciamento de turmas, notas e conteúdos</p>
              </div>

              <div
                className={`${styles.card} ${styles.alunoCard}`}
                onClick={() => setView('aluno')}
              >
                <div className={styles.iconCircle}>🎓</div>
                <h2>Aluno</h2>
                <p>Acesso à área de estudos, materiais e acompanhamento de notas</p>
              </div>
            </main>
          </>
        ) : (
          /* O TypeScript garante que 'view' aqui só possa ser 'professor' ou 'aluno' */
          mode === 'login' ? (
            <LoginForm
              type={view as UserType}
              onBack={() => setView('selection')}
              onSwitchToRegister={() => setMode('register')}

            />
          ) : (
            <RegisterForm
              type={view as UserType}
              onBack={handleBack}
              onSwitchToLogin={() => setMode('login')}
            />
          )
        )}

        <footer className={styles.footer}>
          <p>© 2024 Sistema Educacional. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;

"use client";

import React from "react";
import styles from "./landing.module.css";
import Link from "next/link";
import {
  MdSchool,
  MdArrowForward,
  MdAutoAwesome,
  MdPeopleOutline,
  MdMenuBook,
  MdEmojiEvents,
  MdHelpOutline,
  MdMailOutline,
  MdPhoneInTalk,
} from "react-icons/md";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <MdSchool className={styles.logoIcon} />
              <span className={styles.brandName}>Tunno</span>
            </div>
            <Link href="/login" className={styles.accessBtn}>
              Acessar Plataforma <MdArrowForward />
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.mainConteiner}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={`${styles.heroInfo} ${styles.fadeInLeft}`}>
                <div className={styles.badge}>
                  <MdAutoAwesome />
                  <span>Plataforma Educacional Moderna</span>
                </div>
                <h1>Transforme a Educação com a Tunno</h1>
                <p>
                  Conectamos alunos e professores em uma plataforma intuitiva e
                  completa. Gerencie turmas, acompanhe o progresso e
                  potencialize o aprendizado.
                </p>
                <div className={styles.buttonGroup}>
                  <Link href="/register" className={styles.primaryBtn}>
                    Começar Agora <MdArrowForward />
                  </Link>
                  <Link href="#saiba-mais" className={styles.outlineBtn}>
                    Saiba Mais
                  </Link>
                </div>
              </div>

              <div className={`${styles.heroGraphic} ${styles.fadeInRight}`}>
                <div className={styles.statsCardMain}>
                  <div className={styles.statsRow}>
                    <div className={styles.statsIconBox}>
                      <MdPeopleOutline />
                    </div>
                    <div>
                      <p className={styles.statsLabel}>Total de Usuários</p>
                      <p className={styles.statsValue}>10,000+</p>
                    </div>
                  </div>
                  <div className={styles.statsGridSmall}>
                    <div className={styles.smallCard}>
                      <MdMenuBook />
                      <p>Aulas</p>
                      <strong>5,000+</strong>
                    </div>
                    <div className={styles.smallCard}>
                      <MdEmojiEvents />
                      <p>Certificados</p>
                      <strong>2,500+</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="saiba-mais" className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Recursos da Plataforma</h2>
              <p>
                Tudo que você precisa para uma experiência educacional completa
              </p>
            </div>
            <div className={styles.featuresGrid}>
              <div
                className={styles.featureCard}
                style={{ "--accent-color": "#1e5bff" } as any}
              >
                <div className={styles.featureIcon}>
                  <MdMenuBook />
                </div>
                <h3>Gestão de Aulas</h3>
                <p>
                  Organize materiais, atividades e avaliações de forma simples e
                  eficiente
                </p>
              </div>
              <div
                className={styles.featureCard}
                style={{ "--accent-color": "#8b2cf5" } as any}
              >
                <div className={styles.featureIcon}>
                  <MdPeopleOutline />
                </div>
                <h3>Acompanhamento</h3>
                <p>
                  Monitore o progresso dos alunos com dashboards intuitivos e
                  relatórios detalhados
                </p>
              </div>
              <div
                className={styles.featureCard}
                style={{ "--accent-color": "#22c55e" } as any}
              >
                <div className={styles.featureIcon}>
                  <MdHelpOutline />
                </div>
                <h3>Suporte Integrado</h3>
                <p>
                  Tire dúvidas diretamente com os professores através da
                  plataforma
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Final Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.logoLight}>
                <MdSchool />
                <span>Tunno</span>
              </div>
              <p className={styles.footerDesc}>
                Plataforma educacional que conecta alunos e professores.
              </p>
            </div>
            <div>
              <h4>Links Úteis</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <Link href="#">Sobre</Link>
                </li>
                <li>
                  <Link href="#">Recursos</Link>
                </li>
                <li>
                  <Link href="#">Contato</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contato</h4>
              <ul className={styles.footerContact}>
                <li>
                  <MdMailOutline /> contato@tunno.edu.br
                </li>
                <li>
                  <MdPhoneInTalk /> (11) 3000-0000
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2024 Tunno. Todos os direitos reservados.</p>
            <div className={styles.socialIcons}>
              <FaFacebook /> <FaInstagram /> <FaYoutube />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

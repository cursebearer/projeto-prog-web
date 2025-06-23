"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"; // adicione este import
import styles from "../styles/components/loggedHeader.module.scss"
import type { FC } from "react";

interface LoggedHeaderProps {
  user?: { nome?: string; email?: string }
}

const icons = {
  TrendingUp: () => (
    <svg className={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Search: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  Calendar: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Target: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Bell: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  Settings: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  User: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  Menu: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
}

const LoggedHeader: FC<LoggedHeaderProps> = ({ user }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter();

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsProfileOpen(false)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
    setIsNotificationsOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getInitials = (nome?: string) => {
    if (!nome) return "U";
    const parts = nome.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo e Navegação Principal */}
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <icons.TrendingUp />
            </div>
            <span className={styles.logoText}>HealthEnv</span>
          </div>

          <nav className={styles.navigation}>
            <a href="#" className={`${styles.navLink} ${styles.navLinkActive}`}>
              Dashboard
            </a>
            <a href="#" className={styles.navLink}>
              Treinamento
            </a>
            <a href="#" className={styles.navLink}>
              Nutrição
            </a>
            <a href="#" className={styles.navLink}>
              Suporte
            </a>
          </nav>
        </div>

        {/* Barra de Busca */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <icons.Search />
            <input type="text" placeholder="Buscar treinos, refeições..." className={styles.searchInput} />
          </div>
        </div>

        {/* Ações do Usuário */}
        <div className={styles.rightSection}>
          {/* Data Atual */}
          <div className={styles.dateInfo}>
            <icons.Calendar />
            <span>{getCurrentDate()}</span>
          </div>

          {/* Meta do Dia */}
          <div className={styles.goalInfo}>
            <icons.Target />
            <span className={styles.goalBadge}>2/3 metas</span>
          </div>

          {/* Notificações */}
          <div className={styles.dropdown}>
            <button
              onClick={toggleNotifications}
              className={`${styles.iconButton} ${isNotificationsOpen ? styles.iconButtonActive : ""}`}
            >
              <icons.Bell />
              <span className={styles.notificationBadge}>3</span>
            </button>

            {isNotificationsOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <h3>Notificações</h3>
                </div>
                <div className={styles.dropdownContent}>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationContent}>
                      <h4>Hora do treino!</h4>
                      <p>Seu treino de peito está agendado para agora</p>
                    </div>
                  </div>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationContent}>
                      <h4>Meta de água atingida!</h4>
                      <p>Parabéns! Você bebeu 2L de água hoje</p>
                    </div>
                  </div>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationContent}>
                      <h4>Lembrete de refeição</h4>
                      <p>Não esqueça de registrar seu almoço</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Configurações */}
          <button className={styles.iconButton}>
            <icons.Settings />
          </button>

          {/* Perfil do Usuário */}
          <div className={styles.dropdown}>
            <button
              onClick={toggleProfile}
              className={`${styles.profileButton} ${isProfileOpen ? styles.profileButtonActive : ""}`}
            >
              <div className={styles.avatar}>
                <span>{getInitials(user?.nome)}</span>
              </div>
            </button>

            {isProfileOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <div className={styles.profileInfo}>
                    <h3>{user?.nome || "Usuário"}</h3>
                    <p>{user?.email || "email@email.com"}</p>
                  </div>
                </div>
                <div className={styles.dropdownContent}>
                  <a href="#" className={styles.dropdownItem}>
                    <icons.User />
                    <span>Perfil</span>
                  </a>
                  <a href="#" className={styles.dropdownItem}>
                    <icons.Settings />
                    <span>Configurações</span>
                  </a>
                  <div className={styles.dropdownDivider}></div>
                  <a
                    href="#"
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    <span>Sair</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Menu Mobile */}
          <button onClick={toggleMobileMenu} className={styles.mobileMenuButton}>
            <icons.Menu />
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNavigation}>
            <a href="#" className={`${styles.mobileNavLink} ${styles.mobileNavLinkActive}`}>
              Dashboard
            </a>
            <a href="#" className={styles.mobileNavLink}>
              Treinos
            </a>
            <a href="#" className={styles.mobileNavLink}>
              Nutrição
            </a>
            <a href="#" className={styles.mobileNavLink}>
              Relatórios
            </a>
          </nav>
          <div className={styles.mobileSearchContainer}>
            <icons.Search />
            <input type="text" placeholder="Buscar treinos, refeições..." className={styles.searchInput} />
          </div>
        </div>
      )}
    </header>
  )
}

export default LoggedHeader

"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useSpeechSettings } from "../../context/SpeechContext"; 
import {
  Volume2,
  VolumeX,
  MoreVertical,
  User,
  LogOut,
  Store,
} from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const { userType, userId, loadingUser, logout } = useAuth();
  const router = useRouter();

  const { speechEnabled, toggleSpeech, safeSpeak } = useSpeechSettings();

  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavigateToRestaurant = () => {
    if (userId) {
      router.push(`/restaurante/${userId}`);
    }
  };

  const handleToggleSpeech = () => {
    toggleSpeech();
    if (!speechEnabled) {
       setTimeout(() => safeSpeak("Leitura por voz ativada."), 100);
    }
  };

  const toggleDropdown = () => setDropdownAberto(!dropdownAberto);

  const handleLogout = () => {
    setDropdownAberto(false);
    logout();
    router.push("/login");
  };

  const getDisplayName = () => {
    if (userType === "CLIENT") return "Cliente";
    if (userType === "OWNER") return "Parceiro";
    return "Usuário";
  };

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.contentWrapper}>
        <div className={styles.leftSection}>
          <div
            className={styles.logo}
            tabIndex={0}
            onMouseEnter={() => safeSpeak("City Inclui. Ir para página inicial.")}
            onFocus={() => safeSpeak("City Inclui. Ir para página inicial.")}
          >
            <img
              src="https://i.ibb.co/p6nzSB6p/imagem-2025-10-29-224844608.png"
              alt="CityInclui Logo"
              className={styles.logoImage}
            />
            City<span>Inclui</span>
          </div>

          <Link
            href="/"
            className={styles.navLink}
            tabIndex={0}
            onMouseEnter={() => safeSpeak("Página inicial.")}
            onFocus={() => safeSpeak("Página inicial.")}
          >
            HOME
          </Link>
        </div>

        <div className={styles.centerSection}>
          {userType === "OWNER" && userId && (
            <button
              onClick={handleNavigateToRestaurant}
              className={styles.iconButton}
              title="Ir para Meu Restaurante"
              tabIndex={0}
              onMouseEnter={() => safeSpeak("Ir para meu restaurante.")}
              onFocus={() => safeSpeak("Ir para meu restaurante.")}
            >
              <Store size={24} />
            </button>
          )}
        </div>

        <div className={styles.userArea}>
          <button
            onClick={handleToggleSpeech}
            className={styles.speechToggle}
            aria-label={speechEnabled ? "Desativar voz" : "Ativar voz"}
            tabIndex={0}
            onMouseEnter={() =>
              safeSpeak(
                speechEnabled
                  ? "Desativar leitura por voz."
                  : "Ativar leitura por voz."
              )
            }
            onFocus={() =>
              safeSpeak(
                speechEnabled
                  ? "Desativar leitura por voz."
                  : "Ativar leitura por voz."
              )
            }
          >
            {speechEnabled ? <Volume2 /> : <VolumeX />}
          </button>

          {loadingUser ? (
            <div className={styles.loadingUser}>...</div>
          ) : userType ? (
            <div className={styles.userContainer} ref={dropdownRef}>
              <div
                className={styles.userInfo}
                tabIndex={0}
                onMouseEnter={() =>
                  safeSpeak(`Olá ${getDisplayName()}. Abra o menu de usuário.`)
                }
                onFocus={() =>
                  safeSpeak(`Olá ${getDisplayName()}. Abra o menu de usuário.`)
                }
              >
                <span className={styles.userWelcome}>Olá, </span>
                <span className={styles.userName}>{getDisplayName()}</span>
              </div>

              <button
                className={styles.dropdownToggle}
                onClick={toggleDropdown}
                aria-label="Menu do usuário"
                tabIndex={0}
                onMouseEnter={() => safeSpeak("Abrir menu do usuário.")}
                onFocus={() => safeSpeak("Abrir menu do usuário.")}
              >
                <MoreVertical size={20} />
              </button>

              {dropdownAberto && (
                <div className={styles.dropdownMenu}>
                  <Link
                    href="/editar"
                    className={styles.dropdownItem}
                    onClick={() => setDropdownAberto(false)}
                    tabIndex={0}
                    onMouseEnter={() => safeSpeak("Editar perfil.")}
                    onFocus={() => safeSpeak("Editar perfil.")}
                  >
                    <User size={16} />
                    <span>Editar Perfil</span>
                  </Link>

                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                    tabIndex={0}
                    onMouseEnter={() => safeSpeak("Sair da conta.")}
                    onFocus={() => safeSpeak("Sair da conta.")}
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ul className={styles.userNavLinks}>
              <li>
                <Link
                  href="/login"
                  className={styles.navLink}
                  tabIndex={0}
                  onMouseEnter={() => safeSpeak("Fazer login.")}
                  onFocus={() => safeSpeak("Fazer login.")}
                >
                  LOGIN
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className={styles.navLink}
                  tabIndex={0}
                  onMouseEnter={() => safeSpeak("Criar uma conta.")}
                  onFocus={() => safeSpeak("Criar uma conta.")}
                >
                  REGISTRO
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
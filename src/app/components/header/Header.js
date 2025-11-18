"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSpeechSettings } from "../../context/SpeechContext";
import { Volume2, VolumeX, MoreVertical, User, LogOut } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const { speechEnabled, toggleSpeech, speakText, handleFocusWithKeyboard } =
    useSpeechSettings();

  const dropdownRef = useRef(null);

  // Buscar usuário logado
  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("/api/auth/usuario", {
          credentials: "include",
        });

        if (resposta.ok) {
          const dadosUsuario = await resposta.json();
          setUsuario(dadosUsuario);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuario();
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    const willEnable = !speechEnabled;
    toggleSpeech();

    setTimeout(() => {
      const mensagem = willEnable
        ? "Leitura de voz ativada"
        : "Leitura de voz desativada";

      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(mensagem);
        utterance.lang = "pt-BR";
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    }, 200);
  };

  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto);
  };

  const handleLogout = () => {
    // Implementar logout aqui
    console.log("Fazer logout");
    setDropdownAberto(false);
  };

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.contentWrapper}>
        <Link
          href="/"
          className={styles.logo}
          onMouseEnter={() => speakText("Página inicial City Inclui")}
          onFocus={() => handleFocusWithKeyboard("Página inicial City Inclui")}
        >
          <img
            src="https://i.ibb.co/p6nzSB6p/imagem-2025-10-29-224844608.png"
            alt="CityInclui Logo"
            className={styles.logoImage}
          />
          City<span>Inclui</span>
        </Link>

        <h1 className={styles.mainTitle}>City Inclui</h1>

        {/* Link HOME fixo */}
        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/"
              className={styles.navLink}
              onMouseEnter={() => speakText("HOME")}
              onFocus={() => handleFocusWithKeyboard("HOME")}
            >
              HOME
            </Link>
          </li>
        </ul>

        {/* Área do usuário */}
        <div className={styles.userArea}>
          {carregando ? (
            <div className={styles.loadingUser}>Carregando...</div>
          ) : usuario ? (
            <div className={styles.userContainer} ref={dropdownRef}>
              <div
                className={styles.userInfo}
                onMouseEnter={() => speakText(`Olá ${usuario.nome}`)}
                onFocus={() => handleFocusWithKeyboard(`Olá ${usuario.nome}`)}
              >
                <span className={styles.userWelcome}>Olá, </span>
                <span className={styles.userName}>{usuario.nome}</span>
              </div>

              {/* Botão dos três pontinhos */}
              <button
                className={styles.dropdownToggle}
                onClick={toggleDropdown}
                aria-label="Menu do usuário"
                onMouseEnter={() => speakText("Opções do usuário")}
                onFocus={() => handleFocusWithKeyboard("Opções do usuário")}
              >
                <MoreVertical size={20} />
              </button>

              {/* Dropdown Menu */}
              {dropdownAberto && (
                <div className={styles.dropdownMenu}>
                  <Link
                    href="/editar-perfil"
                    className={styles.dropdownItem}
                    onClick={() => setDropdownAberto(false)}
                    onMouseEnter={() => speakText("Editar perfil")}
                    onFocus={() => handleFocusWithKeyboard("Editar perfil")}
                  >
                    <User size={16} />
                    <span>Editar Perfil</span>
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                    onMouseEnter={() => speakText("Sair da conta")}
                    onFocus={() => handleFocusWithKeyboard("Sair da conta")}
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
                  onMouseEnter={() => speakText("LOGIN")}
                  onFocus={() => handleFocusWithKeyboard("LOGIN")}
                >
                  LOGIN
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={styles.navLink}
                  onMouseEnter={() => speakText("REGISTRO")}
                  onFocus={() => handleFocusWithKeyboard("REGISTRO")}
                >
                  REGISTRO
                </Link>
              </li>
            </ul>
          )}
        </div>

        <button
          onClick={handleToggle}
          className={styles.speechToggle}
          aria-label={
            speechEnabled ? "Desativar leitura de voz" : "Ativar leitura de voz"
          }
          onMouseEnter={() =>
            speakText(speechEnabled ? "Desativar leitura" : "Ativar leitura")
          }
          onFocus={() =>
            handleFocusWithKeyboard(
              speechEnabled ? "Desativar leitura" : "Ativar leitura"
            )
          }
        >
          {speechEnabled ? <Volume2 /> : <VolumeX />}
        </button>
      </nav>
    </header>
  );
}

"use client";
import Link from "next/link";

import { useSpeechSettings } from "../../context/SpeechContext";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const {
    speechEnabled,
    toggleSpeech,
    speakText,
    handleFocusWithKeyboard,
  } = useSpeechSettings();

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

      
        <button
          onClick={handleToggle} 
          className={styles.speechToggle}
          aria-label={
            speechEnabled
              ? "Desativar leitura de voz"
              : "Ativar leitura de voz"
          }
       
          onMouseEnter={() =>
            speakText(
              speechEnabled ? "Desativar leitura" : "Ativar leitura"
            )
          }
          onFocus={() =>
            handleFocusWithKeyboard(
              speechEnabled ? "Desativar leitura" : "Ativar leitura"
            )
          }
        >
          {speechEnabled ? <Volume2 /> : <VolumeX />}
        </button>

        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${styles.active}`}
              onMouseEnter={() => speakText("HOME")}
              onFocus={() => handleFocusWithKeyboard("HOME")}
            >
              HOME
            </Link>
          </li>
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
      </nav>
    </header>
  );
}
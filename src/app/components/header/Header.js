"use client";
import Link from "next/link";
import { useSpeechSettings } from "../../context/SpeechContext";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const { speechEnabled, toggleSpeech } = useSpeechSettings();

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
      <div className={styles.contentWrapper}>
        <Link href="/" className={styles.homeLink}>
          🏠 Home
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
        >
          {speechEnabled ? <Volume2 /> : <VolumeX />}
        </button>
      </div>

      <p className={styles.statusText}>REGISTRO</p>
    </header>
  );
}

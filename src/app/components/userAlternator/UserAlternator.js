"use client";

import { useEffect } from "react";
import styles from "./UserAlternator.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function AlternadorUsuario({ tipoUsuario, setTipoUsuario }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const getClassNames = (tipo) => {
    let classes = styles.botaoBase;
    classes +=
      tipoUsuario === tipo
        ? ` ${styles.botaoAtivo}`
        : ` ${styles.botaoInativo}`;
    return classes;
  };

  return (
    <div className={styles.alternadorContainer} role="group" aria-label="Selecione o tipo de perfil">
      
      <button
        onClick={() => {
          setTipoUsuario("cliente");
          safeSpeak("Selecionado: Cliente. Busco restaurantes acessíveis.");
        }}
        onFocus={() =>
          handleFocusWithKeyboard("Opção Cliente. Busco restaurantes acessíveis.")
        }
        onMouseEnter={() =>
          safeSpeak("Opção Cliente. Busco restaurantes acessíveis.")
        }
        onMouseLeave={stopSpeech}
        className={getClassNames("cliente")}
        aria-label="Cliente"
        aria-pressed={tipoUsuario === "cliente"}
      >
        <span className={styles.icone}>👤</span>
        <span className={styles.titulo}>Cliente</span>
      </button>

      <button
        onClick={() => {
          setTipoUsuario("anunciante");
          safeSpeak("Selecionado: Anunciante. Tenho um estabelecimento.");
        }}
        onFocus={() =>
          handleFocusWithKeyboard("Opção Anunciante. Tenho um estabelecimento.")
        }
        onMouseEnter={() =>
          safeSpeak("Opção Anunciante. Tenho um estabelecimento.")
        }
        onMouseLeave={stopSpeech}
        className={getClassNames("anunciante")}
        aria-label="Anunciante"
        aria-pressed={tipoUsuario === "anunciante"}
      >
        <span className={styles.icone}>🏪</span>
        <span className={styles.titulo}>Anunciante</span>
      </button>
    </div>
  );
}
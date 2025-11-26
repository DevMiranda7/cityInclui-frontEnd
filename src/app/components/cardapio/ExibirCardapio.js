"use client";
import { useEffect } from "react";
import styles from "./ExibirCardapio.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ExibirCardapio({ culinaria }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  if (!culinaria) {
    const textoVazio = "Culinária não informada";
    return (
      <p
        className={styles.naoInformado}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(textoVazio)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(textoVazio)}
      >
        Não informado
      </p>
    );
  }

  return (
    <div className={styles.culinariaContainer}>
      <span
        className={styles.tagCulinaria}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(`Tipo de Culinária: ${culinaria}`)}
        onMouseLeave={stopSpeech}
        onFocus={() =>
          handleFocusWithKeyboard(`Tipo de Culinária: ${culinaria}`)
        }
      >
        {culinaria}
      </span>
    </div>
  );
}
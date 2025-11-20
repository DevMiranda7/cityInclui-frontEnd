"use client";
import { useEffect } from "react";
import styles from "./ExibirCardapio.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ExibirCardapio({ culinaria }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // Função auxiliar para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz se o componente desmontar (troca de página, etc)
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
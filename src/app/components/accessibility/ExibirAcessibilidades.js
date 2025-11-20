"use client";
import styles from "./ExibirAcessibilidades.module.css"; 
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ExibirAcessibilidades({ acessibilidades }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

 
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  if (!acessibilidades || acessibilidades.length === 0) {
    const textoVazio = "Nenhuma acessibilidade informada";
    return (
      <p
        className={styles.naoInformado}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(textoVazio)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(textoVazio)}
      >
        {textoVazio}
      </p>
    );
  }

  return (
    <ul className={styles.listaAcessibilidade}>
      {acessibilidades.map((item, index) => (
        <li
          key={index}
          className={styles.itemAcessibilidade}
          tabIndex={0}
          onMouseEnter={() => safeSpeak(item)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
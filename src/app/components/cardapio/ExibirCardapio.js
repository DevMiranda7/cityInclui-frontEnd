"use client";
import styles from "./ExibirCardapio.module.css"; 
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ExibirCardapio({ culinaria }) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  if (!culinaria) {
    return (
      <p
        className={styles.naoInformado}
        tabIndex={0}
        onFocus={() => handleFocusWithKeyboard("Culinária não informada")}
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
        onMouseEnter={() => speakText(`Tipo de Culinária: ${culinaria}`)}
        onFocus={() => handleFocusWithKeyboard(`Tipo de Culinária: ${culinaria}`)}
      >
        {culinaria}
      </span>
    </div>
  );
}
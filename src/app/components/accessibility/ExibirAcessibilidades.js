"use client";
import styles from "./ExibirAcessibilidades.module.css"; // Crie um CSS para ele
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ExibirAcessibilidades({ acessibilidades }) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  if (!acessibilidades || acessibilidades.length === 0) {
    return (
      <p
        className={styles.naoInformado}
        tabIndex={0}
        onFocus={() => handleFocusWithKeyboard("Nenhuma acessibilidade informada")}
      >
        Nenhuma acessibilidade informada
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
          onMouseEnter={() => speakText(item)}
          onFocus={() => handleFocusWithKeyboard(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
"use client";

import styles from "./UserAlternator.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function AlternadorUsuario({ tipoUsuario, setTipoUsuario }) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const getClassNames = (tipo) => {
    let classes = styles.botaoBase;
    classes +=
      tipoUsuario === tipo
        ? ` ${styles.botaoAtivo}`
        : ` ${styles.botaoInativo}`;
    return classes;
  };

  return (
    <div className={styles.alternadorContainer}>
      <button
        onClick={() => setTipoUsuario("cliente")}
        onFocus={() =>
          handleFocusWithKeyboard("Cliente. Busco restaurantes acessíveis.")
        }
        onMouseEnter={() =>
          speakText("Cliente. Busco restaurantes acessíveis.")
        }
        className={getClassNames("cliente")}
        aria-label="Cliente"
      >
        <span className={styles.icone}>👤</span>
        <span className={styles.titulo}>Cliente</span>
      </button>

      <button
        onClick={() => setTipoUsuario("anunciante")}
        onFocus={() =>
          handleFocusWithKeyboard("Anunciante. Tenho um estabelecimento.")
        }
        onMouseEnter={() => speakText("Anunciante. Tenho um estabelecimento.")}
        className={getClassNames("anunciante")}
        aria-label="Anunciante"
      >
        <span className={styles.icone}>🏪</span>
        <span className={styles.titulo}>Anunciante</span>
      </button>
    </div>
  );
}

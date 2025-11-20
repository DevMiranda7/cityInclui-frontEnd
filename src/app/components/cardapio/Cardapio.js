"use client";
import { useEffect } from "react";
import styles from "./Cardapio.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function Cardapio({ formData, setFormData }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();
  
  const opcoes = [
    "Japonês",
    "Italiano",
    "Caseiro",
    "Vegano",
    "Fast Food",
    "Brasileiro",
    "Pizzaria",
    "Outro",
  ];

  const descricaoCampo = "Tipo de cardápio. Selecione a culinária principal";

  // Função auxiliar para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz se o componente desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelContainer}>
        <label
          className={styles.label}
          onClick={() => safeSpeak(descricaoCampo)}
          onMouseEnter={() => safeSpeak(descricaoCampo)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard(descricaoCampo)}
        >
          Tipo de Cardápio (Culinária)
        </label>

        <button
          type="button"
          className={styles.speakButton}
          onClick={() => safeSpeak(descricaoCampo)}
          aria-label="Ouvir descrição do campo Tipo de Cardápio"
        >
          🗣️
        </button>
      </div>

      <div
        className={styles.lista}
        role="group"
        aria-label="Opções de culinária"
        onMouseLeave={stopSpeech} // Para áudio se sair da área da lista
      >
        {opcoes.map((tipo) => {
          const isSelected = formData.cardapio === tipo;
          const textoVoz = `${tipo}. ${isSelected ? "Selecionado" : ""}`;

          return (
            <button
              key={tipo}
              type="button"
              className={`${styles.opcao} ${
                isSelected ? styles.selecionado : ""
              }`}
              onClick={() => {
                setFormData({ ...formData, cardapio: tipo });
                safeSpeak(`Você selecionou: ${tipo}`);
              }}
              
              // Mouse
              onMouseEnter={() => safeSpeak(textoVoz)}
              onMouseLeave={stopSpeech}
              
              // Teclado
              onFocus={() => handleFocusWithKeyboard(textoVoz)}
              
              // Acessibilidade
              aria-pressed={isSelected}
            >
              {tipo}
            </button>
          );
        })}
      </div>
    </div>
  );
}
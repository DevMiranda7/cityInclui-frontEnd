"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ModalMensagem.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ModalMensagem({
  isOpen,
  onClose,
  type = "erro",
  message,
}) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // Função auxiliar para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const titulo = type === "erro" ? "Erro" : "Sucesso";
  const cor = type === "erro" ? styles.erro : styles.sucesso;

  // Efeito: Lê a mensagem automaticamente ao abrir e para ao fechar
  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para garantir que o foco mudou e não haja conflito de áudio
      const timer = setTimeout(() => {
        safeSpeak(`Alerta: ${titulo}. ${message}`);
      }, 100);
      return () => clearTimeout(timer);
    }
    
    // Cleanup: Para a voz se o modal fechar (isOpen false) ou componente desmontar
    return () => stopSpeech();
  }, [isOpen, titulo, message, safeSpeak]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Fecha ao clicar fora
        >
          <motion.div
            className={`${styles.modal} ${cor}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            role="alertdialog"
            aria-labelledby="modal-titulo"
            aria-describedby="modal-mensagem"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
          >
            <h3
              id="modal-titulo"
              onMouseEnter={() => safeSpeak(`Mensagem de ${titulo.toLowerCase()}`)}
              onMouseLeave={stopSpeech}
              onFocus={() =>
                handleFocusWithKeyboard(`Mensagem de ${titulo.toLowerCase()}`)
              }
              tabIndex={0}
            >
              {titulo}
            </h3>

            <p
              id="modal-mensagem"
              onMouseEnter={() => safeSpeak(message)}
              onMouseLeave={stopSpeech}
              onFocus={() => handleFocusWithKeyboard(message)}
              tabIndex={0}
            >
              {message}
            </p>

            <button
              className={styles.botaoFechar}
              onClick={() => {
                stopSpeech(); // Para a voz antes de fechar
                onClose();
              }}
              onMouseEnter={() =>
                safeSpeak("Botão fechar modal. Pressione Enter para fechar.")
              }
              onMouseLeave={stopSpeech}
              onFocus={() =>
                handleFocusWithKeyboard(
                  "Botão fechar modal. Pressione Enter para fechar."
                )
              }
              autoFocus
              aria-label="Fechar mensagem"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
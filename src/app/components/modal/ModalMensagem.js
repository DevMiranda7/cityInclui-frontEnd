"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./ModalMensagem.module.css";
import { speakText, handleFocusWithKeyboard } from "../../utils/useSpeech";

export default function ModalMensagem({ isOpen, onClose, type = "erro", message }) {
  if (!isOpen) return null;

  const titulo = type === "erro" ? "Erro" : "Sucesso";
  const cor = type === "erro" ? styles.erro : styles.sucesso;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`${styles.modal} ${cor}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            role="alertdialog"
            aria-labelledby="modal-titulo"
            aria-describedby="modal-mensagem"
          >
            <h3
              id="modal-titulo"
              onMouseEnter={() => speakText(`Mensagem de ${titulo.toLowerCase()}`)}
              onFocus={() =>
                handleFocusWithKeyboard(`Mensagem de ${titulo.toLowerCase()}`)
              }
              tabIndex={0}
            >
              {titulo}
            </h3>

            <p
              id="modal-mensagem"
              onMouseEnter={() => speakText(message)}
              onFocus={() => handleFocusWithKeyboard(message)}
              tabIndex={0}
            >
              {message}
            </p>

            <button
              className={styles.botaoFechar}
              onClick={onClose}
              onMouseEnter={() =>
                speakText("Botão fechar modal. Pressione Enter para fechar.")
              }
              onFocus={() =>
                handleFocusWithKeyboard("Botão fechar modal. Pressione Enter para fechar.")
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

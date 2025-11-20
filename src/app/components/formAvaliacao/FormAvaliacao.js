"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./FormAvaliacao.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function FormAvaliacao({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");

  // 1. Hooks do Contexto
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // 2. Função para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // 3. Cleanup: Para a voz se o componente desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    stopSpeech();
    safeSpeak("Enviando avaliação, aguarde.");
    if (onSubmit) onSubmit({ rating, comentario });
  };

  const handleStarClick = (value) => {
    setRating(value);
    safeSpeak(`${value} estrelas selecionadas.`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2
        className={styles.title}
        tabIndex={0}
        onMouseEnter={() => safeSpeak("Avaliar Restaurante")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Avaliar Restaurante")}
      >
        Avaliar Restaurante
      </h2>

      {/* ESTRELAS */}
      <div
        className={styles.starsWrapper}
        role="group"
        aria-label="Seleção de classificação em estrelas"
        onMouseLeave={stopSpeech} // Para áudio se sair da área das estrelas
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          return (
            <motion.div
              key={value}
              whileHover={{ scale: 1.2 }}
              
              // Acessibilidade e Eventos
              role="button"
              aria-label={`Classificar com ${value} estrelas`}
              tabIndex={0}
              
              // Mouse
              onMouseEnter={() => {
                setHover(value);
                safeSpeak(`${value} estrelas`);
              }}
              onMouseLeave={() => {
                setHover(0);
                stopSpeech();
              }}
              onClick={() => handleStarClick(value)}
              
              // Teclado (Foco e Seleção)
              onFocus={() => {
                setHover(value);
                handleFocusWithKeyboard(`Classificar com ${value} estrelas`);
              }}
              onBlur={() => setHover(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleStarClick(value);
                }
              }}
            >
              <Star
                size={32}
                className="transition-all"
                fill={value <= (hover || rating) ? "#facc15" : "none"}
                stroke={value <= (hover || rating) ? "#eab308" : "#555"}
              />
            </motion.div>
          );
        })}
      </div>

      {/* CAMPO DE COMENTÁRIO */}
      <div className={styles.textAreaWrapper}>
        <label
          className={styles.textAreaLabel}
          onMouseEnter={() => safeSpeak("Rótulo Comentário")}
          onMouseLeave={stopSpeech}
        >
          Comentário
        </label>
        <textarea
          placeholder="Escreva sua opinião..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className={styles.textArea}
          
          // Lógica de Voz Padronizada (Input/Textarea)
          onMouseEnter={() => safeSpeak("Campo de Comentário. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar sua opinião agora.")}
          onFocus={() =>
            handleFocusWithKeyboard("Campo de texto para comentário. Digite sua opinião.")
          }
        />
      </div>

      {/* BOTÃO */}
      <button
        type="submit"
        className={styles.btnSubmit}
        onMouseEnter={() => safeSpeak("Botão Enviar Avaliação")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Botão Enviar Avaliação")}
      >
        Enviar Avaliação
      </button>
    </form>
  );
}
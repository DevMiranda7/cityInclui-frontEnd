"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./FormAvaliacao.module.css";

export default function FormAvaliacao({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ rating, comentario });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.title}>Avaliar Restaurante</h2>

      {/* ESTRELAS */}
      <div className={styles.starsWrapper}>
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          return (
            <motion.div
              key={value}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(value)}
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
        <label className={styles.textAreaLabel}>Comentário</label>
        <textarea
          placeholder="Escreva sua opinião..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className={styles.textArea}
        />
      </div>

      {/* BOTÃO */}
      <button type="submit" className={styles.btnSubmit}>
        Enviar Avaliação
      </button>
    </form>
  );
}

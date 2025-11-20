"use client";

import StarRating from "../elements/StarRating";
import { User } from "lucide-react";
import styles from "./ListaAvaliacoes.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ListaAvaliacoes({ avaliacoes }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  if (!avaliacoes || avaliacoes.length === 0) {
    const textoVazio = "Ainda não há avaliações para este local.";
    return (
      <p
        className={styles.semAvaliacoes}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(textoVazio)}
        onFocus={() => handleFocusWithKeyboard(textoVazio)}
      >
        {textoVazio}
      </p>
    );
  }

  return (
    <div className={styles.listaContainer}>
      {avaliacoes.map((review, index) => {
        // Formata a data para leitura e exibição
        const dataFormatada = review.data
          ? new Date(
              review.data.split("/").reverse().join("-")
            ).toLocaleDateString()
          : "";

        // Monta o texto completo para a voz
        const textoVoz = `
            Avaliação de ${review.nomeCliente || "Cliente CityInclui"}.
            Nota ${review.nota} estrelas.
            Data: ${dataFormatada || "não informada"}.
            Comentário: ${review.comentario || "Sem comentário escrito"}.
        `;

        return (
          <div
            key={review.id || index}
            className={styles.reviewItem}
            tabIndex={0} // Torna o card focável pelo teclado
            aria-label={`Avaliação de ${review.nomeCliente || "Cliente"}`} // Acessibilidade nativa
            onMouseEnter={() => safeSpeak(textoVoz)}
            onFocus={() => handleFocusWithKeyboard(textoVoz)}
          >
            <div className={styles.header}>
              <div className={styles.userInfo}>
                <div className={styles.userIcon}>
                  <User size={16} color="#555" />
                </div>
                <span className={styles.nomeCliente}>
                  {review.nomeCliente || "Cliente CityInclui"}
                </span>
              </div>

              <span className={styles.dataCriacao}>{dataFormatada}</span>
            </div>

            <div className={styles.rating}>
              <StarRating value={review.nota} size={16} />
            </div>

            <p className={styles.comentario}>{review.comentario}</p>
          </div>
        );
      })}
    </div>
  );
}

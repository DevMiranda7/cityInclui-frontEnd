"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./HeroSection.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function ResultsModal({
  isOpen,
  results,
  onClose
}) {
  const modalRef = useRef(null);
  const router = useRouter();

  // Importando funções do contexto
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

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

  // Detectar clique fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        stopSpeech(); // Para a leitura do item anterior
        safeSpeak("Fechando resultados da pesquisa.");
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, safeSpeak]);

  const list = Array.isArray(results) ? results : results?.content || [];
  if (!isOpen || !list.length) return null;

  function getItemId(item) {
    return (
      item.id ??
      item.restauranteId ??
      item.idRestaurante ??
      item.codigo ??
      item._id ??
      null
    );
  }

  const handleSelect = (item) => {
    stopSpeech(); // Para qualquer áudio atual
    const nome = item.nomeDoRestaurante || "Restaurante";
    const itemId = getItemId(item);

    safeSpeak(`Abrindo página de ${nome}`);

    if (itemId) {
      router.push(`/restaurante/${itemId}`);
    }

    onClose && onClose();
  };

  const handleKeyDown = (e, item) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(item);
    } else if (e.key === "Escape") {
      stopSpeech();
      safeSpeak("Fechando resultados");
      onClose && onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className={styles.suggestionsDropdown}
      role="listbox"
      aria-label="Resultados da pesquisa"
      onMouseLeave={stopSpeech} // Para o áudio se o mouse sair da lista inteira
    >
      <ul className={styles.suggestionsList}>
        {list.map((item, index) => {
          const nome = item.nomeDoRestaurante || "Nome indisponível";

          const culinariaRaw = item.cardapio || "não informado";
          const culinaria = culinariaRaw.includes(" ")
            ? culinariaRaw
            : culinariaRaw.charAt(0).toUpperCase() + culinariaRaw.slice(1);

          const textoFalado = `Restaurante ${nome}. Tipo: ${culinaria}.`;

          return (
            <li
              key={index}
              className={styles.suggestionItem}
              tabIndex={0}
              role="option"
              aria-label={`${nome} — ${culinaria}`}
              
              // Eventos de Voz e Teclado
              onFocus={() => handleFocusWithKeyboard(textoFalado)}
              onMouseEnter={() => safeSpeak(textoFalado)}
              onMouseLeave={stopSpeech} // Corta o áudio ao mover para o próximo item
              
              // Ações
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
            >
              <div className={styles.suggestionRow}>
                <span className={styles.searchIcon}>🔍</span>
                <div className={styles.suggestionTexts}>
                  <span className={styles.suggestionName}>{nome}</span>
                  <span className={styles.suggestionCuisine}>
                    {culinaria}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
"use client";

import React, { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

export default function ResultsModal({
  isOpen,
  results,
  speakText,
  handleFocusWithKeyboard,
  onClose
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const list = Array.isArray(results) ? results : results?.content || [];
  if (!isOpen || !list.length) return null;

  return (
    <div ref={modalRef} className={styles.suggestionsDropdown}>
      <ul className={styles.suggestionsList}>
        {list.map((item, index) => {
          const nome = item.nomeDoRestaurante || "Nome indisponível";
          const culinaria = item.cardapio || "Culinária desconhecida";
          const textoFalado = `${nome}. culinária ${culinaria}.`;

          return (
            <li
              key={index}
              className={styles.suggestionItem}
              tabIndex={0}
              onFocus={() => handleFocusWithKeyboard(textoFalado)}
              onMouseEnter={() => speakText(textoFalado)}
              onClick={() => speakText(`Restaurante ${nome} selecionado.`)}
            >
              <div className={styles.suggestionRow}>
                <span className={styles.searchIcon}>🔍</span>
                <div className={styles.suggestionTexts}>
                  <span className={styles.suggestionName}>{nome}</span>
                  <span className={styles.suggestionCuisine}>{culinaria}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

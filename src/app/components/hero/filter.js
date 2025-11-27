"use client";

import { useEffect, useRef } from "react";
import { useSpeechSettings } from "../../context/SpeechContext";
import styles from "./HeroSection.module.css";

export default function FilterMenu({ showFilter, foodTypes, onSelect, onClose }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!showFilter) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        safeSpeak("Fechando filtros");
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter, onClose, safeSpeak]);

  if (!showFilter) return null;

  return (
    <div
      ref={menuRef}
      className={styles.filterDropdown}
      tabIndex={0}
      onMouseEnter={() => {}}
      onFocus={() => {}}
    >
      <div className={styles.filterHeader}>
        <h3
          onMouseEnter={() => safeSpeak("Filtrar por tipo de comida")}
          onFocus={() => handleFocusWithKeyboard("Filtrar por tipo de comida")}
          tabIndex={0}
        >
          Filtrar por tipo de comida
        </h3>
      </div>

      <div className={styles.filterOptions}>
        {foodTypes.map((food) => (
          <button
            key={food.value}
            type="button"
            className={styles.filterOption}
            onClick={() => {
              safeSpeak(`${food.label} selecionado`);
              onSelect(food.label);
            }}
            onMouseEnter={() => safeSpeak(food.label)}
            onFocus={() => handleFocusWithKeyboard(food.label)}
          >
            {food.label}
          </button>
        ))}
      </div>
    </div>
  );
}

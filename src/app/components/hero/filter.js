"use client";

import { useEffect, useRef } from "react";
import { useSpeechSettings } from "../../context/SpeechContext";
import styles from "./HeroSection.module.css";

export default function FilterMenu({
  showFilter,
  foodTypes,
  onSelect,
  onClose
}) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!showFilter) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  if (!showFilter) return null;

  return (
    <div ref={menuRef} className={styles.filterDropdown}>
      <div className={styles.filterHeader}>
        <h3>Filtrar por tipo de comida</h3>
      </div>

      <div className={styles.filterOptions}>
        {foodTypes.map((food) => (
          <button
            key={food.value}
            type="button"
            className={styles.filterOption}
            onClick={() => onSelect(food.label)}
            onMouseEnter={() => speakText(food.label)}
            onFocus={() => handleFocusWithKeyboard(food.label)}
          >
            {food.label}
          </button>
        ))}
      </div>
    </div>
  );
}

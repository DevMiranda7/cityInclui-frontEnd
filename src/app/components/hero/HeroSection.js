"use client";

import React from "react";
import styles from "./HeroSection.module.css";
import SearchBar from "./SearchBar";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function HeroSection() {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroContent}>
        <h1
          id="hero-title"
          className={styles.title}
          onMouseEnter={() => safeSpeak("Encontre restaurantes na sua região")}
          onFocus={() => handleFocusWithKeyboard("Encontre restaurantes na sua região")}
          tabIndex={0}
        >
          Encontre Restaurantes na Sua Região
        </h1>

        <p
          className={styles.subtitle}
          onMouseEnter={() => safeSpeak("Pesquise pelo nome ou tipo de comida")}
          onFocus={() => handleFocusWithKeyboard("Pesquise pelo nome ou tipo de comida")}
          tabIndex={0}
        >
          Pesquise pelo nome ou tipo de comida.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}

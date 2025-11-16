// components/hero/HeroSection.jsx
"use client";

import React from "react";
import styles from "./HeroSection.module.css";
import SearchBar from "./SearchBar";
import { useSpeechSettings } from "../../context/SpeechContext";

const HeroSection = () => {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1
          tabIndex={0}
          onMouseEnter={() => speakText("Encontre restaurantes acessíveis")}
          onFocus={() =>
            handleFocusWithKeyboard("Encontre restaurantes acessíveis")
          }
        >
          Encontre restaurantes acessíveis
        </h1>

        <p
          tabIndex={0}
          onMouseEnter={() =>
            speakText(
              "Descubra estabelecimentos com boa avaliação de acessibilidade para pessoas com deficiência visual"
            )
          }
          onFocus={() =>
            handleFocusWithKeyboard(
              "Descubra estabelecimentos com boa avaliação de acessibilidade para pessoas com deficiência visual"
            )
          }
        >
          Descubra estabelecimentos com boa avaliação de acessibilidade
        </p>

        <SearchBar />
      </div>
    </section>
  );
};

export default HeroSection;

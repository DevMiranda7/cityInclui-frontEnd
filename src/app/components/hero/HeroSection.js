"use client";

import React, { useState } from "react";
import styles from "./HeroSection.module.css";

import { useSpeechSettings } from "../../context/SpeechContext";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  const handleSearch = (e) => {
    e.preventDefault();
    speakText(`Buscando por: ${searchTerm || "todos os restaurantes"}`);
    console.log("Buscando por:", searchTerm);
  };

  return (
    <section className={styles.hero}>
  
      <div className={styles.heroContent}>
        <h1
          onMouseEnter={() => speakText("Encontre restaurantes acessíveis")}
          onFocus={() =>
            handleFocusWithKeyboard("Encontre restaurantes acessíveis")
          }
          tabIndex={0} 
        >
          Encontre restaurantes acessíveis
        </h1>
        <p
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
          tabIndex={0}
        >
          Descubra estabelecimentos com boa avaliação de acessibilidade para
          pessoas com deficiência visual
        </p>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Digite o nome do restaurante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            aria-label="Campo de busca de restaurante"
            onMouseEnter={() => speakText("Digite o nome do restaurante")}
            onFocus={() =>
              handleFocusWithKeyboard("Digite o nome do restaurante")
            }
          />
          <button
            type="submit"
            className={styles.searchButton}
            onMouseEnter={() => speakText("Botão Buscar")}
            onFocus={() => handleFocusWithKeyboard("Botão Buscar")}
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
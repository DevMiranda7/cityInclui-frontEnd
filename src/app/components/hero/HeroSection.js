"use client";

import React from "react";
import styles from "./HeroSection.module.css";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Encontre Restaurantes na Sua Região</h1>
        <p className={styles.subtitle}>
          Busque por nome, tipo de comida ou palavra-chave.
        </p>
        <SearchBar />
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import styles from "./HeroSection.module.css";

import { useSpeechSettings } from "../../context/SpeechContext";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  // Array com os tipos de comida disponíveis
  const foodTypes = [
    { value: "", label: "Todos os tipos" },
    { value: "japonesa", label: "Japonesa" },
    { value: "brasileira", label: "Brasileira" },
    { value: "italiana", label: "Italiana" },
    { value: "mexicana", label: "Mexicana" },
    { value: "chinesa", label: "Chinesa" },
    { value: "hamburguer", label: "Hamburguer" },
    { value: "pizza", label: "Pizza" },
    { value: "vegetariana", label: "Vegetariana" },
    { value: "saudavel", label: "Saudável" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const searchMessage = selectedFoodType
      ? `Buscando por: ${
          searchTerm || "todos os restaurantes"
        } do tipo ${selectedFoodType}`
      : `Buscando por: ${searchTerm || "todos os restaurantes"}`;

    speakText(searchMessage);
    console.log("Buscando por:", searchTerm, "Tipo:", selectedFoodType);
  };

  const handleFoodTypeSelect = (foodValue, foodLabel) => {
    setSelectedFoodType(foodValue);
    setShowFilter(false);
    speakText(`Filtro aplicado: ${foodLabel}`);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    speakText(
      showFilter ? "Fechar filtros" : "Abrir filtros de tipo de comida"
    );
  };

  const clearFilter = () => {
    setSelectedFoodType("");
    speakText("Filtro removido");
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

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <div className={styles.searchInputContainer}>
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

            {/* Ícone de Filtro - Hambúrguer */}
            <button
              type="button"
              className={`${styles.filterButton} ${
                selectedFoodType ? styles.filterActive : ""
              }`}
              onClick={toggleFilter}
              onMouseEnter={() => speakText("Escolha o tipo de comida")}
              onFocus={() =>
                handleFocusWithKeyboard("Escolha o tipo de comida")
              }
              aria-label="Escolher tipo de comida"
            >
              🍔
              {selectedFoodType && (
                <span className={styles.filterIndicator}></span>
              )}
            </button>

            {/* Menu de Filtros */}
            {showFilter && (
              <div className={styles.filterDropdown}>
                <div className={styles.filterHeader}>
                  <h3>Filtrar por tipo de comida</h3>
                  {selectedFoodType && (
                    <button
                      type="button"
                      className={styles.clearFilterButton}
                      onClick={clearFilter}
                    >
                      Limpar
                    </button>
                  )}
                </div>
                <div className={styles.filterOptions}>
                  {foodTypes.map((food) => (
                    <button
                      key={food.value}
                      type="button"
                      className={`${styles.filterOption} ${
                        selectedFoodType === food.value ? styles.selected : ""
                      }`}
                      onClick={() =>
                        handleFoodTypeSelect(food.value, food.label)
                      }
                      onMouseEnter={() => speakText(food.label)}
                      onFocus={() => handleFocusWithKeyboard(food.label)}
                    >
                      {food.label}
                      {selectedFoodType === food.value && " ✓"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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

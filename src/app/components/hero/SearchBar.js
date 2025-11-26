"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import ResultsModal from "./ResultsModal";
import { searchRestaurants } from "@/src/lib/api/ownerService";
import { useSpeechSettings } from "../../context/SpeechContext";
import { useRouter } from "next/navigation";
import FilterMenu from "./filter";

const SearchBar = () => {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const foodTypes = [
    { value: "japones", label: "Japonês" },
    { value: "italiano", label: "Italiano" },
    { value: "caseiro", label: "Caseiro" },
    { value: "vegano", label: "Vegano" },
    { value: "fastfood", label: "Fast Food" },
    { value: "brasileiro", label: "Brasileiro" },
    { value: "pizzaria", label: "Pizzaria" },
  ];

  function handleSelect(selectedFood) {
    setQuery(selectedFood);
    stopSpeech();
    safeSpeak(`Filtro aplicado: ${selectedFood}. Buscando...`);
    setShowFilter(false);
    router.push(`/resultados?q=${encodeURIComponent(selectedFood)}`);
  }

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 1) {
      try {
        const data = await searchRestaurants(newQuery);
        setSuggestions(data);
        setIsDropdownOpen(true);
      } catch (err) {
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    stopSpeech();
    safeSpeak(`Buscando por ${query}`);
    setIsDropdownOpen(false);
    router.push(`/resultados?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Digite o nome do restaurante..."
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
            
            onMouseEnter={() => safeSpeak("Campo de busca. Clique para digitar.")}
            onMouseLeave={stopSpeech}
            onClick={() => safeSpeak("Pode digitar o nome do restaurante.")}
            onFocus={() => handleFocusWithKeyboard("Campo de busca. Digite o nome do restaurante.")}
          />

          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              stopSpeech();
              safeSpeak(showFilter ? "Fechando filtros" : "Abrindo filtros");
              setShowFilter(!showFilter);
            }}
            
            onMouseEnter={() => safeSpeak("Botão de filtros. Clique para selecionar categorias.")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Botão de filtros. Selecione uma categoria.")}
            aria-label="Filtros de pesquisa"
            aria-expanded={showFilter}
          >
            🍔
          </button>

          <FilterMenu
            showFilter={showFilter}
            foodTypes={foodTypes}
            onSelect={handleSelect}
            onClose={() => setShowFilter(false)}
          />
        </div>

        <button
          type="submit"
          className={styles.searchButton}
          onMouseEnter={() => safeSpeak("Botão Buscar. Pressione Enter para pesquisar.")}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard("Botão Buscar.")}
        >
          Buscar
        </button>
      </form>

      <ResultsModal
        isOpen={isDropdownOpen}
        results={suggestions}
        onClose={() => setIsDropdownOpen(false)}
      />
    </div>
  );
};

export default SearchBar;
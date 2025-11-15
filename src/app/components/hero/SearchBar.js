"use client";

import React, { useState } from "react";
import styles from "./HeroSection.module.css";
import ResultsModal from "./ResultsModal";
import { searchRestaurants } from "@/src/lib/api/ownerService";
import { useSpeechSettings } from "../../context/SpeechContext";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();


  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 1) {
      try {
        const data = await searchRestaurants(newQuery);
        setSuggestions(data);
        setIsDropdownOpen(true);
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
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

    speakText(`Buscando por: ${query}`);
    setIsDropdownOpen(false);

    router.push(`/resultados?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome do restaurante..."
          value={query}
          onChange={handleInputChange}
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
      <ResultsModal
        isOpen={isDropdownOpen}
        results={suggestions}
        speakText={speakText}
        handleFocusWithKeyboard={handleFocusWithKeyboard}
        onClose={() => setIsDropdownOpen(false)} 
      />
    </div>
  );
};

export default SearchBar;

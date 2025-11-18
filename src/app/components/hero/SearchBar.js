"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./HeroSection.module.css";
import ResultsModal from "./ResultsModal";
import { searchRestaurants } from "@/src/lib/api/ownerService";
import { useSpeechSettings } from "../../context/SpeechContext";
import { useRouter } from "next/navigation";
import FilterMenu from "./filter";

const SearchBar = () => {
  const { speakText } = useSpeechSettings();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ---------------------
  // FILTROS (agora só 1)
  // ---------------------
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const router = useRouter();

  // Lista única e centralizada
  const foodTypes = [
    { value: "japones", label: "Japonês" },
    { value: "italiano", label: "Italiano" },
    { value: "caseiro", label: "Caseiro" },
    { value: "vegano", label: "Vegano" },
    { value: "fastfood", label: "Fast Food" },
    { value: "brasileiro", label: "Brasileiro" },
    { value: "pizzaria", label: "Pizzaria" },
  ];

  // Seleção do filtro → redirecionamento imediato
  const handleSelectFilter = (label) => {
    setShowFilter(false);

    speakText(`Filtrando por ${label}`);

    router.push(`/resultados?q=${encodeURIComponent(label)}`);
  };

  // Busca por texto
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

  // Submeter busca pelo texto
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
        <div className={styles.searchInputContainer} ref={filterRef}>
          <input
            type="text"
            placeholder="Digite o nome do restaurante..."
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
          />

          {/* BOTÃO DO MENU */}
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => setShowFilter(!showFilter)}
          >
            🍔
          </button>

          <FilterMenu
            showFilter={showFilter}
            foodTypes={foodTypes}
            onSelect={handleSelectFilter}
            onClose={() => setShowFilter(false)}
          />
        </div>

        <button type="submit" className={styles.searchButton}>
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

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchRestaurants } from "@/src/lib/api/ownerService";
import { useSpeechSettings } from "../context/SpeechContext"; 

import styles from "./ResultadosPage.module.css";
import RestaurantCard from "../components/restaurantCard/RestaurantCard";

const ResultadosPageComponent = () => {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
         setLoading(false);
         setResults([]);
         return;
      }
      
      try {
        setLoading(true);
        setError("");
        
        const data = await searchRestaurants(query, page, pageSize);
        const finalResults = data.content || [];

        setResults(finalResults); 
        
        setTotalPages(Math.ceil(data.totalElements / pageSize));

        speakText(`Resultados da busca: ${query}, página ${page + 1}`);
        
      } catch (err) {
        setError("Erro ao buscar restaurantes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]); 

  if (loading) return <p className={styles.statusText}>Carregando...</p>;
  if (error) return <p className={styles.statusText}>{error}</p>;
  if (!results.length && query)
    return <p className={styles.statusText}>Nenhum restaurante encontrado.</p>;
  if (!results.length && !query)
     return <p className={styles.statusText}>Digite algo para buscar.</p>;

  return (
    <section className={styles.pageContainer}>
      <h1
        className={styles.pageTitle}
        tabIndex={0}
        onMouseEnter={() => speakText(`Resultados da busca: ${query}`)}
        onFocus={() => handleFocusWithKeyboard(`Resultados da busca: ${query}`)}
      >
        Resultados para: <span>{`"${query}"`}</span>
      </h1>

      <ul className={styles.resultsGrid}>
        {results.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button
            className={`${styles.pageButton} ${page <= 0 ? styles.disabled : ""}`}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page <= 0}
            onMouseEnter={() => speakText("Página anterior")}
            onFocus={() => handleFocusWithKeyboard("Página anterior")}
          >
            ←
          </button>

          {(() => {
            const pagesToShow = Array.from({ length: totalPages }, (_, i) => i)
              .filter(
                (i) =>
                  Math.abs(i - page) <= 2 || i === 0 || i === totalPages - 1
              );

            const paginationItems = [];
            let lastPage = -1;

            for (const i of pagesToShow) {
              if (lastPage !== -1 && i - lastPage > 1) {
                paginationItems.push("...");
              }
              paginationItems.push(i);
              lastPage = i;
            }

            return paginationItems.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className={styles.paginationEllipsis}
                  >
                    ...
                  </span>
                );
              }
              const i = item;
              const isCurrent = i === page;
              return (
                <button
                  key={i}
                  className={`${styles.pageNumber} ${
                    isCurrent ? styles.activePage : ""
                  }`}
                  onClick={() => setPage(i)}
                  onMouseEnter={() => speakText(`Página ${i + 1}`)}
                  onFocus={() => handleFocusWithKeyboard(`Página ${i + 1}`)}
                >
                  {i + 1}
                </button>
              );
            });
          })()}

          <button
            className={`${styles.pageButton} ${
              page + 1 >= totalPages ? styles.disabled : ""
            }`}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page + 1 >= totalPages}
            onMouseEnter={() => speakText("Próxima página")}
            onFocus={() => handleFocusWithKeyboard("Próxima página")}
          >
            →
          </button>
        </div>
      )}

      <button
        className={styles.backButton}
        onClick={() => router.back()}
        onMouseEnter={() => speakText("Voltar")}
        onFocus={() => handleFocusWithKeyboard("Voltar")}
      >
        Voltar
      </button>
    </section>
  );
};

export default ResultadosPageComponent;
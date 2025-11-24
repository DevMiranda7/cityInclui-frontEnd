"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchRestaurants } from "@/src/lib/api/ownerService";
import { useSpeechSettings } from "../context/SpeechContext";

import styles from "./ResultadosPage.module.css";
import RestaurantCard from "../components/restaurantCard/RestaurantCard";

const ResultadosPageComponent = () => {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 9;

  // Função auxiliar para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz se o componente desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  // =====================================================================
  // 🔍 BUSCA DE RESULTADOS
  // =====================================================================
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        setResults([]);
        setTotalPages(0);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchRestaurants(query, page, pageSize);

        const list = data?.content || [];
        const total = data?.totalElements || 0;

        setResults(list);
        setTotalPages(Math.ceil(total / pageSize));

        // 🔊 Feedback de voz ao carregar resultados
        // Pequeno delay para não atropelar o "Carregando"
        setTimeout(() => {
           safeSpeak(`Resultados da busca por ${query}, página ${page + 1}`);
        }, 500);

      } catch (err) {
        console.error(err);
        setError("Erro ao buscar restaurantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page, pageSize]); 


  if (loading)
    return (
      <p
        className={styles.statusText}
        tabIndex={0}
        onMouseEnter={() => safeSpeak("Pesquisando restaurantes, aguarde...")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Pesquisando restaurantes...")}
      >
        Carregando...
      </p>
    );

  if (error)
    return (
      <p
        className={styles.statusText}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(`Erro: ${error}`)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(`Erro: ${error}`)}
      >
        {error}
      </p>
    );

  if (!results.length)
    return (
      <p
        className={styles.statusText}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(`Nenhum restaurante encontrado para ${query}`)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(`Nenhum restaurante encontrado para ${query}`)}
      >
        Nenhum restaurante encontrado para `${query}`
      </p>
    );

  return (
    <section className={styles.pageContainer}>
      {/* TÍTULO */}
      <h1
        className={styles.pageTitle}
        tabIndex={0}
        onMouseEnter={() => safeSpeak(`Resultados da busca para: ${query}`)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(`Resultados da busca para: ${query}`)}
      >
        Resultados para: <span> {query}</span>
      </h1>

      {/* LISTA */}
      <ul className={styles.resultsGrid}>
        {results.map((restaurant) => (
          // O Card já tem sua própria lógica de voz interna
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>

      {/* PAGINAÇÃO */}
      {totalPages > 1 && (
        <div 
            className={styles.paginationContainer} 
            role="navigation" 
            aria-label="Paginação"
            onMouseLeave={stopSpeech}
        >
          {/* VOLTAR */}
          <button
            className={`${styles.pageButton} ${
              page <= 0 ? styles.disabled : ""
            }`}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page <= 0}
            onMouseEnter={() => safeSpeak("Página anterior")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Página anterior")}
            aria-label="Página anterior"
          >
            ←
          </button>

          {/* NUMERAÇÃO */}
          {(() => {
            const pagesToShow = Array.from({ length: totalPages }, (_, i) => i)
              .filter(
                (i) => Math.abs(i - page) <= 2 || i === 0 || i === totalPages - 1
              );

            let lastPage = -1;
            const paginationItems = [];

            for (const i of pagesToShow) {
              if (lastPage !== -1 && i - lastPage > 1) {
                paginationItems.push("...");
              }
              paginationItems.push(i);
              lastPage = i;
            }

            return paginationItems.map((item, index) => {
              if (item === "...") {
                return (
                  <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                    ...
                  </span>
                );
              }

              const isCurrent = item === page;

              return (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`${styles.pageNumber} ${
                    isCurrent ? styles.activePage : ""
                  }`}
                  aria-current={isCurrent ? "page" : undefined}
                  onMouseEnter={() => safeSpeak(`Ir para página ${item + 1}`)}
                  onMouseLeave={stopSpeech}
                  onFocus={() => handleFocusWithKeyboard(`Ir para página ${item + 1}`)}
                >
                  {item + 1}
                </button>
              );
            });
          })()}

          {/* AVANÇAR */}
          <button
            className={`${styles.pageButton} ${
              page + 1 >= totalPages ? styles.disabled : ""
            }`}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page + 1 >= totalPages}
            onMouseEnter={() => safeSpeak("Próxima página")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Próxima página")}
            aria-label="Próxima página"
          >
            →
          </button>
        </div>
      )}

      {/* VOLTAR AO INÍCIO */}
      <button
        className={styles.backButton}
        onClick={() => router.back()}
        onMouseEnter={() => safeSpeak("Botão Voltar")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Botão Voltar")}
      >
        Voltar
      </button>
    </section>
  );
};

export default ResultadosPageComponent;
"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr"; 
import PerfilRestaurante from "../../components/restaurantePerfil/restaurantePerfil";
import LoadingScreen from "../../components/loading/LoadingScreen";
// 1. Importação do Contexto de Voz
import { useSpeechSettings } from "../../context/SpeechContext";

// Função fetcher padrão
const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Erro ao buscar");
  return res.json();
});

export default function RestaurantePage() {
  const params = useParams();
  const restauranteId = params.id;

  // 2. Hooks de Voz
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // Função auxiliar para parar o áudio (cleanup)
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz ao desmontar a página (sair dela)
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const { data: restaurante, error, isLoading } = useSWR(
    restauranteId ? `/api/proxy/restaurante/${restauranteId}` : null,
    fetcher,
    {
      revalidateOnFocus: true, 
      shouldRetryOnError: false,
    }
  );

  // O LoadingScreen geralmente é visual, mas se ele tiver suporte interno a voz, funcionará.
  if (isLoading) return <LoadingScreen text="Carregando restaurante..." />;

  // 3. Tratamento de Erro com Voz
  if (error) {
    const msgErro = "Erro ao carregar restaurante. Tente recarregar a página.";
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <p
          tabIndex={0}
          role="alert"
          onMouseEnter={() => safeSpeak(msgErro)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard(msgErro)}
        >
          {msgErro}
        </p>
      </div>
    );
  }

  // 4. Tratamento de Não Encontrado com Voz
  if (!restaurante) {
    const msgNotFound = "Restaurante não encontrado.";
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <p
          tabIndex={0}
          role="alert"
          onMouseEnter={() => safeSpeak(msgNotFound)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard(msgNotFound)}
        >
          {msgNotFound}
        </p>
      </div>
    );
  }

  // 5. Sucesso: O componente PerfilRestaurante já possui sua própria acessibilidade configurada
  return <PerfilRestaurante restaurante={restaurante} />;
}
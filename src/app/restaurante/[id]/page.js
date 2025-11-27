"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr"; 
import PerfilRestaurante from "../../components/restaurantePerfil/restaurantePerfil";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { useSpeechSettings } from "../../context/SpeechContext";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Erro ao buscar");
  return res.json();
});

export default function RestaurantePage() {
  const params = useParams();
  const restauranteId = params.id;
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

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

  if (isLoading) return <LoadingScreen text="Carregando restaurante..." />;

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

  return <PerfilRestaurante restaurante={restaurante} />;
}
"use client";

import React, { useEffect } from "react";
import { useSpeechSettings } from "../context/SpeechContext";
import { Volume2, VolumeX } from "lucide-react";

export default function MuteButton() {
  const { speechEnabled, toggleSpeech, safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

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

  const enabled = speechEnabled === true;
  const label = enabled ? "Desativar leitura por voz" : "Ativar leitura por voz";

  const handle = () => {
    stopSpeech(); // Para qualquer som atual antes de trocar o estado
    
    const willEnable = !enabled;
    toggleSpeech();

    if (willEnable) {
      // Pequeno delay para garantir que o estado atualizou para 'true' antes de tentar falar
      setTimeout(() => safeSpeak("Leitura de voz ativada."), 120);
    }
  };

  return (
    <button
      onClick={handle}
      
      // Acessibilidade Nativa
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      
      // Estilos
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
      
     
      onMouseEnter={() => safeSpeak(label)}
      onMouseLeave={stopSpeech}
      onFocus={() => handleFocusWithKeyboard(label)}
    >
      {enabled ? <Volume2 /> : <VolumeX />}
    </button>
  );
}
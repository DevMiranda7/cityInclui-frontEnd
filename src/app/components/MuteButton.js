"use client";

import React, { useEffect } from "react";
import { useSpeechSettings } from "../context/SpeechContext";
import { Volume2, VolumeX } from "lucide-react";

export default function MuteButton() {
  const { speechEnabled, toggleSpeech, safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const enabled = speechEnabled === true;
  const label = enabled ? "Desativar leitura por voz" : "Ativar leitura por voz";

  const handle = () => {
    stopSpeech(); 
  
    const willEnable = !enabled;
    toggleSpeech();

    if (willEnable) {
      setTimeout(() => safeSpeak("Leitura de voz ativada."), 120);
    }
  };

  return (
    <button
      onClick={handle}
      
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
      
     
      onMouseEnter={() => safeSpeak(label)}
      onMouseLeave={stopSpeech}
      onFocus={() => handleFocusWithKeyboard(label)}
    >
      {enabled ? <Volume2 /> : <VolumeX />}
    </button>
  );
}
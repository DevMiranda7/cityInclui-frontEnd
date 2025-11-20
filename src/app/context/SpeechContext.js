"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const SpeechContext = createContext();

export function SpeechProvider({ children }) {
  // null -> ainda carregando preferências; boolean -> estado conhecido
  const [speechEnabled, setSpeechEnabled] = useState(null);
  const speakTimeoutRef = useRef(null);
  const lastInteractionByKeyboard = useRef(false);

  // Carregar preferência
  useEffect(() => {
    try {
      const saved = localStorage.getItem("speechEnabled");
      setSpeechEnabled(saved !== "false"); // padrão true
    } catch {
      setSpeechEnabled(true);
    }
  }, []);

  // Persistir preferência quando disponível
  useEffect(() => {
    if (speechEnabled !== null) {
      try {
        localStorage.setItem("speechEnabled", String(speechEnabled));
      } catch {}
    }
  }, [speechEnabled]);

  const toggleSpeech = useCallback(() => {
    setSpeechEnabled((prev) => (prev === null ? true : !prev));
  }, []);

  // função primária (internal) que efetivamente fala — assume que já checaram habilitação
  const _speak = useCallback((text) => {
    if (!text) return;
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    clearTimeout(speakTimeoutRef.current);
    speakTimeoutRef.current = setTimeout(() => {
      try {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = "pt-BR";
        utt.rate = 1;
        utt.pitch = 1;
        window.speechSynthesis.speak(utt);
      } catch (e) {
        // swallow
        // console.warn("speech error", e);
      }
    }, 80);
  }, []);

  // função pública segura: só fala quando speechEnabled === true (não fala quando null/false)
  const safeSpeak = useCallback(
    (text) => {
      if (speechEnabled !== true) return;
      _speak(text);
    },
    [_speak, speechEnabled]
  );

  // detectar se foco veio do teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") lastInteractionByKeyboard.current = true;
    };
    const handleMouseDown = () => {
      lastInteractionByKeyboard.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // desbloquear a API de forma silenciosa (sem falar): algumas plataformas exigem interação do usuário
  useEffect(() => {
    function unlockAudio() {
      try {
        const utter = new SpeechSynthesisUtterance();
        utter.volume = 0; // silencioso
        window.speechSynthesis.speak(utter);
      } catch {}
    }

    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // função auxiliar para lidar com focus via teclado
  const handleFocusWithKeyboard = useCallback(
    (text) => {
      if (lastInteractionByKeyboard.current) safeSpeak(text);
    },
    [safeSpeak]
  );

  return (
    <SpeechContext.Provider
      value={{
        speechEnabled, // null | true | false
        toggleSpeech,
        safeSpeak,
        handleFocusWithKeyboard,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeechSettings() {
  return useContext(SpeechContext);
}

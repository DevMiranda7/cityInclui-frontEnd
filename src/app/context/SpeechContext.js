"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const SpeechContext = createContext();

export function SpeechProvider({ children }) {
  const [speechEnabled, setSpeechEnabled] = useState(null);
  const speakTimeoutRef = useRef(null);
  const lastInteractionByKeyboard = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("speechEnabled");
      setSpeechEnabled(saved !== "false");
    } catch {
      setSpeechEnabled(true);
    }
  }, []);

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
      }
    }, 80);
  }, []);

  const safeSpeak = useCallback(
    (text) => {
      if (speechEnabled !== true) return;
      _speak(text);
    },
    [_speak, speechEnabled]
  );

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

  useEffect(() => {
    function unlockAudio() {
      try {
        const utter = new SpeechSynthesisUtterance();
        utter.volume = 0;
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

  const handleFocusWithKeyboard = useCallback(
    (text) => {
      if (lastInteractionByKeyboard.current) safeSpeak(text);
    },
    [safeSpeak]
  );

  return (
    <SpeechContext.Provider
      value={{
        speechEnabled,
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

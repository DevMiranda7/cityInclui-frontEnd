"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SpeechContext = createContext();

export function SpeechProvider({ children }) {
  const [speechEnabled, setSpeechEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("speechEnabled");
    setSpeechEnabled(saved !== "false"); 
  }, []);

  useEffect(() => {
    localStorage.setItem("speechEnabled", speechEnabled);
  }, [speechEnabled]);

  function toggleSpeech() {
    setSpeechEnabled((prev) => !prev);
  }

  function speakText(text) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (!speechEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  let lastInteractionByKeyboard = false;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") lastInteractionByKeyboard = true;
    };
    const handleMouseDown = () => {
      lastInteractionByKeyboard = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  function handleFocusWithKeyboard(text) {
    if (lastInteractionByKeyboard) speakText(text);
  }

  return (
    <SpeechContext.Provider
      value={{ speechEnabled, toggleSpeech, speakText, handleFocusWithKeyboard }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeechSettings() {
  return useContext(SpeechContext);
}

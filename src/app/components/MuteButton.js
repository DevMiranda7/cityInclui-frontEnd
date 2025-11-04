"use client";
import { useSpeechSettings } from "../context/SpeechContext";
import { Volume2, VolumeX } from "lucide-react";

export default function MuteButton() {
  const { speechEnabled, toggleSpeech, speakText } = useSpeechSettings();

  const handle = () => {
    const willEnable = !speechEnabled;
    toggleSpeech();
 
    if (willEnable) {
      setTimeout(() => speakText("Leitura de voz ativada"), 100);
    }
  };

  return (
    <button
      onClick={handle}
      aria-pressed={!speechEnabled}
      title={speechEnabled ? "Desativar leitura de voz" : "Ativar leitura de voz"}
    >
      {speechEnabled ? <Volume2 /> : <VolumeX />}
    </button>
  );
}

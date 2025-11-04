"use client";

import { SpeechProvider } from "../context/SpeechContext";
import MuteButton from "./MuteButton"; // botão global

export default function SpeechProviderWrapper({ children }) {
  return (
    <SpeechProvider>
      <MuteButton />
      {children}
    </SpeechProvider>
  );
}

"use client";

import React from "react";
import { SpeechProvider } from "../context/SpeechContext";
import MuteButton from "./MuteButton";

export default function SpeechProviderWrapper({ children }) {
  return (
    <SpeechProvider>
      {/* - botão global (pode ser reposicionado no layout) */}
      <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}>
        <MuteButton />
      </div>

      {children}
    </SpeechProvider>
  );
}

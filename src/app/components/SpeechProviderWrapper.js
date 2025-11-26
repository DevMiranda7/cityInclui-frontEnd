"use client";

import React from "react";
import { SpeechProvider } from "../context/SpeechContext";
import MuteButton from "./MuteButton";

export default function SpeechProviderWrapper({ children }) {
  return (
    <SpeechProvider>
      <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}>
        <MuteButton />
      </div>

      {children}
    </SpeechProvider>
  );
}

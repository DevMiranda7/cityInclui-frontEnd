"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import EditarPageOwner from "./EditarPageOwner";
import EditarPageCliente from "./EditarPageCliente";
import LoadingScreen from "../components/loading/LoadingScreen";
import { useSpeechSettings } from "../context/SpeechContext";

export default function GerenciadorPerfil() {
  const { userType, loadingUser } = useAuth();

  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  if (loadingUser) {
    return <LoadingScreen text="Verificando permissões..." />;
  }

  if (userType === "OWNER") {
    return <EditarPageOwner />;
  }

  if (userType === "CLIENT") {
    return <EditarPageCliente />;
  }

  const msgErro = "Você precisa fazer login para acessar essa página.";

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <p
        tabIndex={0}
        onMouseEnter={() => safeSpeak(msgErro)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(msgErro)}
      >
        {msgErro}
      </p>

      <div style={{ marginTop: "20px" }}>
        <a
          href="/login"
          style={{
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onMouseEnter={() => safeSpeak("Link. Ir para página de login.")}
          onMouseLeave={stopSpeech}
          onFocus={() =>
            handleFocusWithKeyboard("Link. Ir para página de login.")
          }
        >
          Ir para Login
        </a>
      </div>
    </div>
  );
}

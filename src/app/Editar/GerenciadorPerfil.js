"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import EditarPageOwner from "./EditarPageOwner";
import EditarPageCliente from "./EditarPageCliente";
import LoadingScreen from "../components/loading/LoadingScreen";
// 1. Importação do Contexto de Voz
import { useSpeechSettings } from "../context/SpeechContext";

export default function GerenciadorPerfil() {
  const { userType, loadingUser } = useAuth();
  
  // 2. Hooks de Voz
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // Função auxiliar para parar o áudio (cleanup)
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz ao desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  if (loadingUser) {
    // Opcional: Anunciar que está verificando
    // (Colocamos um LoadingScreen que geralmente é visual, mas podemos tentar falar se demorar)
    return <LoadingScreen text="Verificando permissões..." />;
  }

  if (userType === "OWNER") {
    return <EditarPageOwner />;
  }

  if (userType === "CLIENT") {
    return <EditarPageCliente />;
  }

  // Caso não esteja logado ou tipo desconhecido
  const msgErro = "Você precisa fazer login para acessar essa página.";

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <p
        tabIndex={0}
        // Acessibilidade por voz
        onMouseEnter={() => safeSpeak(msgErro)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(msgErro)}
      >
        {msgErro}
      </p>
      
    
      <div style={{ marginTop: "20px" }}>
        <a 
          href="/login"
          style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
          onMouseEnter={() => safeSpeak("Link. Ir para página de login.")}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard("Link. Ir para página de login.")}
        >
          Ir para Login
        </a>
      </div>
    </div>
  );
}
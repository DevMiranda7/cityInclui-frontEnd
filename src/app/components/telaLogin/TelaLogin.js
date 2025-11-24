"use client";

import React, { useState, useEffect } from "react";
import styles from "./TelaLogin.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/api/authService";
import ModalMensagem from "../../components/modal/ModalMensagem";
import { useAuth } from "../../context/AuthContext"; // Contexto global
import { useSpeechSettings } from "../../context/SpeechContext"; // ⬅️ Contexto de Voz

export default function TelaLogin() {
  const [userType, setUserType] = useState("CLIENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { loginSuccess } = useAuth();
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // Função auxiliar para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz se o componente desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    stopSpeech(); // Para qualquer leitura anterior
    setLoading(true);

    if (!email || !password) {
      setModalMessage("Preencha todos os campos para continuar.");
      setModalOpen(true);
      setLoading(false);
      return;
    }

    try {
      safeSpeak("Tentando realizar login...");
      const data = await login(email, password, userType);

      if (data && data.token) {
        loginSuccess(data.token);
        safeSpeak("Login realizado com sucesso. Redirecionando.");
        router.push("/");
      } else {
        throw new Error("Token não recebido do servidor.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setModalMessage(err.message || "Erro ao fazer login.");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* LADO ESQUERDO */}
      <div className={styles.loginLeft}>
        <img
          src="https://i.ibb.co/p6nzSB6p/imagem-2025-10-29-224844608.png"
          alt="CityInclui App"
          className={styles.phoneImage}
          onMouseEnter={() =>
            safeSpeak("Imagem ilustrativa do aplicativo City Inclui no celular")
          }
          onMouseLeave={stopSpeech}
        />
      </div>

      {/* LADO DIREITO */}
      <div className={styles.loginRight}>
        <div className={styles.loginCard}>
          <Link
            href="/"
            className={styles.logo}
            onMouseEnter={() =>
              safeSpeak("Logo City Inclui. Voltar para página inicial")
            }
            onMouseLeave={stopSpeech}
            onFocus={() =>
              handleFocusWithKeyboard("Logo City Inclui. Voltar para página inicial")
            }
          >
            City<span>Inclui</span>
          </Link>

          {/* Tipo de usuário */}
          <div
            className={styles.userTypeSelector}
            role="radiogroup"
            aria-label="Selecione o tipo de usuário"
          >
            {/* Opção Cliente */}
            <div className={styles.userTypeOption}>
              <input
                type="radio"
                id="cliente"
                name="tipo"
                checked={userType === "CLIENT"}
                onChange={() => {
                  setUserType("CLIENT");
                  safeSpeak("Selecionado: Cliente");
                }}
                onFocus={() => handleFocusWithKeyboard("Opção Cliente")}
              />
              <label
                htmlFor="cliente"
                onMouseEnter={() => safeSpeak("Opção: Entrar como Cliente")}
                onMouseLeave={stopSpeech}
              >
                Cliente
              </label>
            </div>

            {/* Opção Restaurante */}
            <div className={styles.userTypeOption}>
              <input
                type="radio"
                id="owner"
                name="tipo"
                checked={userType === "OWNER"}
                onChange={() => {
                  setUserType("OWNER");
                  safeSpeak("Selecionado: Restaurante");
                }}
                onFocus={() => handleFocusWithKeyboard("Opção Restaurante")}
              />
              <label
                htmlFor="owner"
                onMouseEnter={() => safeSpeak("Opção: Entrar como Restaurante")}
                onMouseLeave={stopSpeech}
              >
                Restaurante
              </label>
            </div>
          </div>

          {/* Formulário */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // Lógica completa de acessibilidade
                onMouseEnter={() => safeSpeak("Campo de email. Clique para digitar.")}
                onMouseLeave={stopSpeech}
                onClick={() => safeSpeak("Pode digitar seu email agora.")}
                onFocus={() => handleFocusWithKeyboard("Campo de email. Digite seu email.")}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // Lógica completa de acessibilidade
                onMouseEnter={() => safeSpeak("Campo de senha. Clique para digitar.")}
                onMouseLeave={stopSpeech}
                onClick={() => safeSpeak("Pode digitar sua senha.")}
                onFocus={() => handleFocusWithKeyboard("Campo de senha. Digite sua senha.")}
              />
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
              onMouseEnter={() =>
                safeSpeak(loading ? "Aguarde, entrando..." : "Botão Entrar")
              }
              onMouseLeave={stopSpeech}
              onFocus={() => handleFocusWithKeyboard("Botão Entrar")}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <div className={styles.registerCard}>
          <p className={styles.registerLink}>
            Não tem uma conta?{" "}
            <Link
              href="/register"
              onMouseEnter={() => safeSpeak("Link para criar nova conta")}
              onMouseLeave={stopSpeech}
              onFocus={() => handleFocusWithKeyboard("Link para criar nova conta")}
            >
              Criar agora
            </Link>
          </p>
        </div>
      </div>

     
      <ModalMensagem
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="erro"
        message={modalMessage}
      />
    </div>
  );
}
"use client";
import React, { useEffect } from "react";
import styles from "./FormClient.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function FormClient({ formData, setFormData }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTelefoneChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, telefone: valor }));
  };

  return (
    <div
      className={styles.formContainer}
      role="form"
      aria-label="Formulário de cadastro de cliente"
    >
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeCompleto"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Nome Completo")}
            onMouseLeave={stopSpeech}
          >
            Nome Completo
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Nome completo. Digite seu nome completo")}
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeCompleto"
          type="text"
          placeholder="Seu nome completo"
          className={styles.inputField}
          value={formData.nomeCompleto || ""}
          onChange={handleChange}
          required
          onMouseEnter={() => safeSpeak("Campo Nome Completo. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar seu nome agora.")}
          onFocus={() => handleFocusWithKeyboard("Campo Nome Completo. Digite seu nome.")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="telefone"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Telefone")}
            onMouseLeave={stopSpeech}
          >
            Telefone
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Telefone. Digite seu telefone com DDD")}
          >
            🗣️
          </button>
        </div>
        <input
          id="telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          className={styles.inputField}
          value={formData.telefone || ""}
          onChange={handleTelefoneChange}
          maxLength={11}
          inputMode="numeric"
          required
          onMouseEnter={() => safeSpeak("Campo Telefone. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar o telefone com DDD.")}
          onFocus={() => handleFocusWithKeyboard("Campo Telefone. Digite apenas números.")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="email"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo E-mail")}
            onMouseLeave={stopSpeech}
          >
            E-mail
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("E-mail. Digite seu melhor e-mail")}
          >
            🗣️
          </button>
        </div>
        <input
          id="email"
          type="email"
          placeholder="Seu melhor e-mail"
          className={styles.inputField}
          value={formData.email || ""}
          onChange={handleChange}
          required
          onMouseEnter={() => safeSpeak("Campo E-mail. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar seu e-mail agora.")}
          onFocus={() => handleFocusWithKeyboard("Campo E-mail.")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="senha"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Senha")}
            onMouseLeave={stopSpeech}
          >
            Senha
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Senha. Digite sua senha")}
          >
            🗣️
          </button>
        </div>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          className={styles.inputField}
          value={formData.senha || ""}
          onChange={handleChange}
          required
          onMouseEnter={() => safeSpeak("Campo Senha. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar sua senha segura.")}
          onFocus={() => handleFocusWithKeyboard("Campo Senha.")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="confirmarSenha"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Confirmar Senha")}
            onMouseLeave={stopSpeech}
          >
            Confirmar Senha
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Confirmar senha. Repita sua senha")}
          >
            🗣️
          </button>
        </div>
        <input
          id="confirmarSenha"
          type="password"
          placeholder="Repita sua senha"
          className={styles.inputField}
          value={formData.confirmarSenha || ""}
          onChange={handleChange}
          required
          onMouseEnter={() => safeSpeak("Campo Confirmar Senha. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Repita a senha digitada anteriormente.")}
          onFocus={() => handleFocusWithKeyboard("Campo Confirmar Senha.")}
        />
      </div>
    </div>
  );
}
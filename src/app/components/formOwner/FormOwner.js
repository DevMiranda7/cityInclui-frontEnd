"use client";
import { useState, useEffect } from "react";
import styles from "./FormOwner.module.css";
import UploadImagem from "../uploadImg/UploadImage";
import { useSpeechSettings } from "../../context/SpeechContext";
import Cardapio from "../cardapio/Cardapio";
import Acessibilidades from "../accessibility/Acessibilidades";

export default function FormOwner({ formData, setFormData, setFoto }) {
  const [telefone, setTelefone] = useState("");
  
  // 1. Hooks do Contexto
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // 2. Função para parar o áudio
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // 3. Cleanup ao desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleTelefoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setTelefone(onlyNums);
    setFormData((prev) => ({ ...prev, telefone: onlyNums }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      className={styles.formContainer}
      role="group"
      aria-label="Formulário de cadastro de anunciante"
    >
      {/* Nome do Restaurante */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeDoRestaurante"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Nome do Restaurante")}
            onMouseLeave={stopSpeech}
          >
            Nome do Restaurante
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Nome do restaurante. Digite o nome do seu restaurante")}
            aria-label="Ouvir descrição do campo Nome do Restaurante"
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeDoRestaurante"
          type="text"
          placeholder="Nome do seu restaurante"
          className={styles.inputField}
          value={formData.nomeDoRestaurante || ""}
          onChange={handleChange}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo Nome do Restaurante. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar o nome do restaurante.")}
          onFocus={() => handleFocusWithKeyboard("Campo Nome do Restaurante.")}
        />
      </div>

      {/* Nome do Anunciante */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeDoAnunciante"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Seu Nome (Responsável)")}
            onMouseLeave={stopSpeech}
          >
            Seu Nome (Responsável)
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Seu nome. Digite o nome do responsável pelo restaurante")}
            aria-label="Ouvir descrição do campo Nome do Anunciante"
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeDoAnunciante"
          type="text"
          placeholder="Seu nome completo"
          className={styles.inputField}
          value={formData.nomeDoAnunciante || ""}
          onChange={handleChange}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo Nome do Responsável. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar seu nome completo.")}
          onFocus={() => handleFocusWithKeyboard("Campo Nome do Responsável.")}
        />
      </div>

      {/* Componente Cardápio (Já possui voz interna) */}
      <Cardapio formData={formData} setFormData={setFormData} />

      {/* Descrição */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="descricao"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Descrição do Restaurante")}
            onMouseLeave={stopSpeech}
          >
            Descrição do Restaurante (100-500 caracteres)
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Descrição do Restaurante. Descreva seu restaurante e os recursos de acessibilidade. Mínimo 100 caracteres.")}
            aria-label="Ouvir descrição do campo Descrição do Restaurante"
          >
            🗣️
          </button>
        </div>
        <textarea
          id="descricao"
          placeholder="Descreva seu restaurante, focando nos detalhes de acessibilidade (mínimo 100 caracteres)"
          className={styles.inputField}
          rows="5"
          minLength="100"
          maxLength="500"
          value={formData.descricao || ""}
          onChange={handleChange}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo de texto Descrição. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar a descrição do restaurante.")}
          onFocus={() => handleFocusWithKeyboard("Campo de texto Descrição. Mínimo 100 caracteres.")}
        />
      </div>

      {/* Componente Acessibilidades (Já possui voz interna) */}
      <Acessibilidades formData={formData} setFormData={setFormData} />

      {/* Email */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="email"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo E-mail de Contato")}
            onMouseLeave={stopSpeech}
          >
            E-mail de Contato
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("E-mail de contato. Digite seu melhor e-mail")}
            aria-label="Ouvir descrição do campo E-mail de Contato"
          >
            🗣️
          </button>
        </div>
        <input
          id="email"
          type="email"
          placeholder="contato@restaurante.com"
          className={styles.inputField}
          value={formData.email || ""}
          onChange={handleChange}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo E-mail de contato. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar o e-mail de contato.")}
          onFocus={() => handleFocusWithKeyboard("Campo E-mail de contato.")}
        />
      </div>

      {/* Telefone */}
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
            aria-label="Ouvir descrição do campo Telefone"
          >
            🗣️
          </button>
        </div>
        <input
          id="telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={telefone}
          onChange={handleTelefoneChange}
          className={styles.inputField}
          maxLength={11}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo Telefone. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar o telefone com DDD.")}
          onFocus={() => handleFocusWithKeyboard("Campo Telefone.")}
        />
      </div>

      {/* Senha */}
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
            onClick={() => safeSpeak("Senha. Crie uma senha forte")}
            aria-label="Ouvir descrição do campo Senha"
          >
            🗣️
          </button>
        </div>
        <input
          id="senha"
          type="password"
          placeholder="Crie uma senha forte"
          className={styles.inputField}
          value={formData.senha || ""}
          onChange={handleChange}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo Senha. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Pode digitar sua senha.")}
          onFocus={() => handleFocusWithKeyboard("Campo Senha.")}
        />
      </div>

      {/* Confirmar Senha */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="confirmarSenhaAnunciante"
            className={styles.label}
            onMouseEnter={() => safeSpeak("Rótulo Confirmar Senha")}
            onMouseLeave={stopSpeech}
          >
            Confirmar Senha
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => safeSpeak("Confirmar senha. Repita a senha para confirmar")}
            aria-label="Ouvir descrição do campo Confirmar Senha"
          >
            🗣️
          </button>
        </div>
        <input
          id="confirmarSenhaAnunciante"
          type="password"
          placeholder="Repita a senha"
          className={styles.inputField}
          value={formData.confirmarSenhaAnunciante || ""}
          onChange={handleChange}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo Confirmar Senha. Clique para digitar.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Repita a senha digitada anteriormente.")}
          onFocus={() => handleFocusWithKeyboard("Campo Confirmar Senha.")}
        />
      </div>

      {/* Componente Upload (Geralmente lida com sua própria UI, mas pode receber props se necessário) */}
      <UploadImagem onFileSelect={setFoto} />
    </div>
  );
}
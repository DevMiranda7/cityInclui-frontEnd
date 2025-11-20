"use client";
import React, { useState, useRef, useEffect } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import styles from "./UploadImage.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function UploadImagem({ onFileSelect, initialImage = null, allowRemove = true }) {
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState("");
  const inputRef = useRef(null);
  
  // 1. Hooks do Contexto
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // 2. Função para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // 3. Cleanup: Para a voz se o componente desmontar
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  // Mantém a imagem inicial
  useEffect(() => {
    if (initialImage) {
      setFoto(initialImage);
    }
  }, [initialImage]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      const mensagemErro = "Apenas imagens PNG, JPEG ou WebP são permitidas.";
      setErro(mensagemErro);
      setFoto(initialImage || null);
      onFileSelect?.(null);
      safeSpeak(`Erro: ${mensagemErro}`);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const mensagemErro = `A imagem é muito grande. O limite é ${MAX_FILE_SIZE_MB}MB.`;
      setErro(mensagemErro);
      setFoto(initialImage || null);
      onFileSelect?.(null);
      safeSpeak(`Erro: ${mensagemErro}`);
      return;
    }

    setErro("");
    const previewUrl = URL.createObjectURL(file);
    setFoto(previewUrl);
    onFileSelect?.(file);
    safeSpeak("Você selecionou uma imagem com sucesso.");
  };

  const handleRemoverImagem = () => {
    if (!allowRemove) return;

    if (foto && foto !== initialImage) {
      URL.revokeObjectURL(foto);
    }
    setFoto(null);
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = null;
    safeSpeak("Você removeu a imagem.");
  };

  return (
    <div className={styles.uploadContainer}>
      <label
        htmlFor="fotoRestaurante"
        className={styles.label}
        onMouseEnter={() => safeSpeak(`Envie uma foto. Limite de ${MAX_FILE_SIZE_MB} megas.`)}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard(`Envie uma foto. Limite de ${MAX_FILE_SIZE_MB} megas.`)}
      >
        Foto do Restaurante (Máx: {MAX_FILE_SIZE_MB}MB)
      </label>

      <div
        className={styles.uploadBox}
        // Voice feedback no container também, caso o mouse passe pelas bordas
        onMouseEnter={() => safeSpeak("Área de upload. Clique para escolher uma foto.")}
        onMouseLeave={stopSpeech}
      >
        <input
          id="fotoRestaurante"
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleChange}
          className={styles.inputField}
          
          // Eventos de Acessibilidade
          onMouseEnter={() => safeSpeak("Campo de envio de foto. Clique para selecionar um arquivo.")}
          onMouseLeave={stopSpeech}
          onClick={() => safeSpeak("Abrindo seletor de arquivos.")}
          onFocus={() => handleFocusWithKeyboard("Campo de envio de foto. Pressione Enter para selecionar.")}
        />
        
        <div className={styles.uploadContent}>
          <Upload className={styles.uploadIcon} />
          <span>Clique para substituir a imagem</span>
        </div>
      </div>

      {erro && (
        <p 
          className={styles.errorMessage} 
          role="alert"
          tabIndex={0}
          onMouseEnter={() => safeSpeak(`Erro: ${erro}`)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard(`Erro: ${erro}`)}
        >
          <AlertCircle size={16} style={{ marginRight: "8px" }} />
          {erro}
        </p>
      )}

      {foto && (
        <div className={styles.previewContainer}>
          <img
            src={foto || undefined}
            alt="Prévia da foto do restaurante"
            className={styles.previewImage}
            tabIndex={0}
            onMouseEnter={() => safeSpeak("Prévia da imagem selecionada")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Prévia da imagem selecionada")}
          />
          
          {allowRemove && (
            <button
              type="button"
              onClick={handleRemoverImagem}
              className={styles.removeButton}
              aria-label="Remover imagem selecionada"
              
              // Eventos de Acessibilidade
              onMouseEnter={() => safeSpeak("Botão Remover imagem selecionada")}
              onMouseLeave={stopSpeech}
              onFocus={() => handleFocusWithKeyboard("Botão Remover imagem selecionada")}
            >
              <X size={16} /> Remover
            </button>
          )}
          
        </div>
      )}
    </div>
  );
}
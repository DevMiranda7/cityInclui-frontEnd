"use client";
import React, { useState, useRef } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import styles from "./UploadImage.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";


const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function UploadImagem({ onFileSelect }) {
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState("");
  const inputRef = useRef(null);
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

 
    if (!ACCEPTED_TYPES.includes(file.type)) {
      const mensagemErro = "Apenas imagens PNG, JPEG ou WebP são permitidas.";
      setErro(mensagemErro);
      setFoto(null);
      onFileSelect?.(null);
      
    
      speakText(`Erro: ${mensagemErro}`);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const mensagemErro = `A imagem é muito grande. O limite é ${MAX_FILE_SIZE_MB}MB.`;
      setErro(mensagemErro);
      setFoto(null);
      onFileSelect?.(null);
      
      speakText(`Erro: ${mensagemErro}`);
      return;
    }

    setErro("");
    setFoto(URL.createObjectURL(file));
    onFileSelect?.(file);

    speakText("Você selecionou uma imagem");
  };

  const handleRemoverImagem = () => {
    if (foto) {
      URL.revokeObjectURL(foto);
      setFoto(null);
      onFileSelect?.(null);

      speakText("Você apagou a imagem");
    }

    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <label
        htmlFor="fotoRestaurante"
        className={styles.label}
        onClick={() => speakText(`Envie uma foto. Limite: ${MAX_FILE_SIZE_MB}MB`)}
        onMouseEnter={() => speakText(`Envie uma foto. Limite: ${MAX_FILE_SIZE_MB}MB`)}
        onFocus={() => handleFocusWithKeyboard(`Envie uma foto. Limite: ${MAX_FILE_SIZE_MB}MB`)}
      >
        Foto do Restaurante (Máx: {MAX_FILE_SIZE_MB}MB)
      </label>

      <div className={styles.uploadBox}>
        <input
          id="fotoRestaurante"
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleChange}
          className={styles.inputField}
          onFocus={() => handleFocusWithKeyboard("Envie uma imagem")}
          onClick={() => speakText("Envie uma imagem")}
          onMouseEnter={() => speakText("Envie uma imagem")}
        />
        <div className={styles.uploadContent}>
          <Upload className={styles.uploadIcon} />
          <span>Clique para escolher ou arraste uma imagem</span>
        </div>
      </div>

      {erro && (
        <p className={styles.errorMessage} role="alert">
          <AlertCircle size={16} style={{ marginRight: "8px" }} />
          {erro}
        </p>
      )}

      {foto && (
        <div className={styles.previewContainer}>
          <img
            src={foto}
            alt="Prévia da foto do restaurante"
            className={styles.previewImage}
          />
          <button
            type="button"
            onClick={handleRemoverImagem}
            className={styles.removeButton}
          >
            <X size={16} /> Remover
          </button>
        </div>
      )}
    </div>
  );
}
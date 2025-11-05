import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import styles from "./UploadImage.module.css";
import { speakText, handleFocusWithKeyboard } from "../../utils/useSpeech";

export default function UploadImagem({onFileSelect}) {
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setErro("Apenas imagens PNG ou JPEG são permitidas.");
      setFoto(null);
      onFileSelect?.(null)
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
        onClick={() => speakText("Envie uma imagem")}
        onMouseEnter={() => speakText("Envie uma imagem")}
        onFocus={() => handleFocusWithKeyboard("Envie uma imagem")}
      >
        Foto do Restaurante
      </label>

      <div className={styles.uploadBox}>
        <input
          id="fotoRestaurante"
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
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

      {erro && <p className={styles.errorMessage}>{erro}</p>}

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

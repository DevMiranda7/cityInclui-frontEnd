"use client";
import { useState, useEffect } from "react";
import styles from "./EditarRestaurante.module.css";
import UploadImagem from "../uploadImg/UploadImage";
import { useSpeechSettings } from "../../context/SpeechContext";
import Cardapio from "../cardapio/Cardapio";
import Acessibilidades from "../accessibility/Acessibilidades";

export default function EditarRestaurante({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({});
  const [novaFoto, setNovaFoto] = useState(null);
  
  // 1. Hooks do Contexto
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  // 2. Função para parar o áudio imediatamente
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // 3. Cleanup
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleTelefoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, telefone: onlyNums }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = (file) => {
    setNovaFoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, novaFoto);
  };

  // --- VERIFICAR MUDANÇAS ---
  const temAlteracoes = () => {
    if (novaFoto) return true;
    if (!initialData || !formData) return false;
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  };

  const podeSalvar = temAlteracoes();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div
        role="group"
        aria-label="Formulário de edição de restaurante"
        style={{ display: "contents" }}
      >
        {/* --- LINHA 1: NOMES --- */}
        <div className={styles.gridRow}>
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
                onClick={() => safeSpeak("Nome do restaurante. Edite se necessário.")}
                aria-label="Ouvir descrição do campo Nome do Restaurante"
              >
                🗣️
              </button>
            </div>
            <input
              id="nomeDoRestaurante"
              type="text"
              className={styles.inputField}
              value={formData.nomeDoRestaurante || ""}
              onChange={handleChange}
              
              // Acessibilidade
              onMouseEnter={() => safeSpeak("Campo Nome do Restaurante. Clique para editar.")}
              onMouseLeave={stopSpeech}
              onClick={() => safeSpeak("Pode digitar o novo nome do restaurante.")}
              onFocus={() => handleFocusWithKeyboard("Campo Nome do Restaurante")}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label 
                htmlFor="nomeDoAnunciante" 
                className={styles.label}
                onMouseEnter={() => safeSpeak("Rótulo Seu Nome")}
                onMouseLeave={stopSpeech}
              >
                Seu Nome
              </label>
              <button
                type="button"
                className={styles.speakButton}
                onClick={() => safeSpeak("Seu nome. Edite se necessário.")}
                aria-label="Ouvir descrição do campo Seu Nome"
              >
                🗣️
              </button>
            </div>
            <input
              id="nomeDoAnunciante"
              type="text"
              className={styles.inputField}
              value={formData.nomeDoAnunciante || ""}
              onChange={handleChange}
              
              // Acessibilidade
              onMouseEnter={() => safeSpeak("Campo Seu Nome. Clique para editar.")}
              onMouseLeave={stopSpeech}
              onClick={() => safeSpeak("Pode digitar seu nome.")}
              onFocus={() => handleFocusWithKeyboard("Campo Seu Nome")}
            />
          </div>
        </div>

        {/* --- BLOCO 2: CARDÁPIO (Já tem voz interna) --- */}
        <Cardapio formData={formData} setFormData={setFormData} />

        {/* --- BLOCO 3: DESCRIÇÃO --- */}
        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label 
              htmlFor="descricao" 
              className={styles.label}
              onMouseEnter={() => safeSpeak("Rótulo Descrição")}
              onMouseLeave={stopSpeech}
            >
              Descrição (100-200 carac.)
            </label>
            <button
              type="button"
              className={styles.speakButton}
              onClick={() => safeSpeak("Descrição do restaurante. Mínimo 50 caracteres.")}
              aria-label="Ouvir descrição do campo Descrição"
            >
              🗣️
            </button>
          </div>
          <textarea
            id="descricao"
            className={`${styles.inputField} ${styles.textareaField}`}
            rows="4"
            minLength="50"
            maxLength="200"
            value={formData.descricao || ""}
            onChange={handleChange}
            
            // Acessibilidade
            onMouseEnter={() => safeSpeak("Campo de texto Descrição. Clique para editar.")}
            onMouseLeave={stopSpeech}
            onClick={() => safeSpeak("Pode digitar a descrição do restaurante.")}
            onFocus={() => handleFocusWithKeyboard("Campo Descrição do restaurante")}
          />
        </div>

        {/* --- BLOCO 4: ACESSIBILIDADES (Já tem voz interna) --- */}
        <Acessibilidades formData={formData} setFormData={setFormData} />

        {/* --- BLOCO 5: CONTATO (EMAIL E TELEFONE) --- */}
        <div className={styles.gridRow}>
          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label 
                className={styles.label}
                onMouseEnter={() => safeSpeak("Rótulo E-mail. Não editável.")}
                onMouseLeave={stopSpeech}
              >
                E-mail
              </label>
            </div>
            <input
              type="email"
              className={`${styles.inputField} ${styles.nonEditable}`}
              value={formData.email || ""}
              readOnly
              disabled
              title="Este campo não pode ser editado"
              
              // Acessibilidade
              onMouseEnter={() => safeSpeak("Este campo de e-mail não pode ser alterado.")}
              onMouseLeave={stopSpeech}
              onFocus={() => handleFocusWithKeyboard("Campo E-mail. Apenas leitura.")}
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
                onClick={() => safeSpeak("Telefone. Edite seu número com DDD.")}
                aria-label="Ouvir descrição do campo Telefone"
              >
                🗣️
              </button>
            </div>
            <input
              id="telefone"
              type="tel"
              className={styles.inputField}
              value={formData.telefone || ""}
              onChange={handleTelefoneChange}
              maxLength={15}
              placeholder="(00) 00000-0000"
              
              // Acessibilidade
              onMouseEnter={() => safeSpeak("Campo Telefone. Clique para editar.")}
              onMouseLeave={stopSpeech}
              onClick={() => safeSpeak("Pode digitar o novo telefone.")}
              onFocus={() => handleFocusWithKeyboard("Campo Telefone. Edite o número.")}
            />
          </div>
        </div>

        {/* --- UPLOAD DE NOVA IMAGEM --- */}
        <UploadImagem
          onFileSelect={handleFileSelect}
          initialImage={formData.urlFoto || formData.foto || null}
          allowRemove={false}
        />

        {/* --- BLOCO 7: AÇÕES --- */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            
            // Acessibilidade
            onMouseEnter={() => safeSpeak("Botão Cancelar")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Botão Cancelar")}
          >
            Cancelar
          </button>
          
          {/* BOTÃO COM A LÓGICA DE DISABLED */}
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={!podeSalvar}
            title={!podeSalvar ? "Faça alguma alteração para salvar" : "Salvar alterações"}
            
            // Acessibilidade
            onMouseEnter={() => 
              safeSpeak(podeSalvar ? "Botão Salvar Alterações" : "Botão Salvar desabilitado. Nenhuma alteração detectada.")
            }
            onMouseLeave={stopSpeech}
            onFocus={() => 
              handleFocusWithKeyboard(podeSalvar ? "Botão Salvar Alterações" : "Botão Salvar desabilitado")
            }
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </form>
  );
}
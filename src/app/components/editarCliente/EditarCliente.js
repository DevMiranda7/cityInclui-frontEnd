"use client";
import { useState, useEffect } from "react";
import styles from "./EditarCliente.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function EditarCliente({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({});
  
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

  // Função auxiliar para aplicar a máscara de telefone
  const mascaraTelefone = (valor) => {
    if (!valor) return "";
    let v = valor.replace(/\D/g, "");
    v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nomeCompleto || initialData.nome || "",
        email: initialData.email || "",
        telefone: mascaraTelefone(initialData.telefone || ""),
      });
    }
  }, [initialData]);

  const handleTelefoneChange = (e) => {
    const valorMascarado = mascaraTelefone(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: valorMascarado }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // ✅ LÓGICA DE BLOQUEIO: Verifica se houve mudança real
  const temAlteracoes = () => {
    if (!initialData || !formData) return false;
    const telefoneAtual = (formData.telefone || "").replace(/\D/g, "");
    const telefoneInicial = (initialData.telefone || "").replace(/\D/g, "");
    const nomeAtual = (formData.nome || "").trim();
    const nomeInicial = (
      initialData.nomeCompleto || initialData.nome || ""
    ).trim();

    return nomeAtual !== nomeInicial || telefoneAtual !== telefoneInicial;
  };

  const podeSalvar = temAlteracoes();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div role="group" aria-label="Edição de perfil de cliente">
        
        {/* --- NOME --- */}
        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label
              htmlFor="nome"
              className={styles.label}
              onMouseEnter={() => safeSpeak("Rótulo Nome Completo")}
              onMouseLeave={stopSpeech}
            >
              Nome Completo
            </label>
            <button
              type="button"
              className={styles.speakButton}
              onClick={() => safeSpeak("Nome completo. Digite seu nome atualizado.")}
              aria-label="Ouvir descrição do campo Nome"
            >
              🗣️
            </button>
          </div>
          <input
            id="nome"
            type="text"
            className={styles.inputField}
            value={formData.nome || ""}
            onChange={handleChange}
            
            // Eventos de Acessibilidade
            onMouseEnter={() => safeSpeak("Campo Nome Completo. Clique para editar.")}
            onMouseLeave={stopSpeech}
            onClick={() => safeSpeak("Pode digitar o novo nome.")}
            onFocus={() => handleFocusWithKeyboard("Campo Nome Completo. Edite seu nome.")}
          />
        </div>

        {/* --- EMAIL (Bloqueado) --- */}
        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label 
              className={styles.label}
              onMouseEnter={() => safeSpeak("Campo E-mail. Não editável.")}
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
            aria-label="Email (não editável)"
            onMouseEnter={() => safeSpeak("Este campo de e-mail não pode ser alterado.")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Campo de e-mail. Apenas leitura.")}
          />
        </div>

        {/* --- TELEFONE --- */}
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
              onClick={() => safeSpeak("Telefone. Digite seu número com DDD.")}
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
            
            // Eventos de Acessibilidade
            onMouseEnter={() => safeSpeak("Campo Telefone. Clique para editar.")}
            onMouseLeave={stopSpeech}
            onClick={() => safeSpeak("Pode digitar o novo telefone com DDD.")}
            onFocus={() => handleFocusWithKeyboard("Campo Telefone. Edite seu número.")}
          />
        </div>

        {/* --- BOTÕES --- */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            onMouseEnter={() => safeSpeak("Botão Cancelar")}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard("Botão Cancelar")}
          >
            Cancelar
          </button>

          {/* Botão Salvar */}
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
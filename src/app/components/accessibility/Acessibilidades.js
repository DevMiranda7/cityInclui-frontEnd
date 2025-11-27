"use client";
import { useEffect } from "react";
import styles from "./Acessibilidades.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

const opcoes = [
  "Rampa de acesso",
  "Cardápio em Braille",
  "Banheiro adaptado",
  "Cão-guia permitido",
  "Mesas acessíveis (cadeira de rodas)",
  "Sinalização tátil",
  "Funcionário fluente em LIBRAS",
  "Vaga de estacionamento reservada",
];

export default function Acessibilidades({ formData, setFormData }) {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();
  const descricaoCampo =
    "Acessibilidades. Selecione um ou mais itens que seu restaurante oferece.";

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  let listaAtual = formData.acessibilidades || [];

  if (typeof listaAtual === "object" && !Array.isArray(listaAtual)) {
    listaAtual = Object.keys(listaAtual).filter(
      (key) => listaAtual[key] === true
    );
    listaAtual = listaAtual.map((key) => {
      const mapeamento = {
        rampaAcesso: "Rampa de acesso",
        banheiroAdaptado: "Banheiro adaptado",
        cardapioBraile: "Cardápio em Braille",
        atendimentoLibras: "Funcionário fluente em LIBRAS",
        estacionamentoAcessivel: "Vaga de estacionamento reservada",
      };
      return mapeamento[key] || key;
    });
  }

  const handleSelect = (opcao) => {
    let novaLista;
    const jaSelecionado = listaAtual.includes(opcao);

    if (jaSelecionado) {
      novaLista = listaAtual.filter((item) => item !== opcao);
      safeSpeak(`Você removeu: ${opcao}`);
    } else {
      novaLista = [...listaAtual, opcao];
      safeSpeak(`Você selecionou: ${opcao}`);
    }

    setFormData({ ...formData, acessibilidades: novaLista });
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelContainer}>
        <label
          className={styles.label}
          onClick={() => safeSpeak(descricaoCampo)}
          onMouseEnter={() => safeSpeak(descricaoCampo)}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard(descricaoCampo)}
        >
          Acessibilidades (Selecione um ou mais)
        </label>

        <button
          type="button"
          className={styles.speakButton}
          onClick={() => safeSpeak(descricaoCampo)}
          aria-label="Ouvir descrição do campo Acessibilidades"
        >
          🗣️
        </button>
      </div>

      <div
        className={styles.lista}
        onMouseLeave={stopSpeech}
        role="group"
        aria-label="Opções de acessibilidade"
      >
        {opcoes.map((tipo) => {
          const isSelected = listaAtual.includes(tipo);
          const textoVoz = `${tipo}. ${isSelected ? "Selecionado" : ""}`;

          return (
            <button
              key={tipo}
              type="button"
              className={`${styles.opcao} ${
                isSelected ? styles.selecionado : ""
              }`}
              onClick={() => handleSelect(tipo)}
              
              onMouseEnter={() => safeSpeak(textoVoz)}
              onMouseLeave={stopSpeech}
              
              onFocus={() => handleFocusWithKeyboard(textoVoz)}
              
              aria-pressed={isSelected}
            >
              {tipo}
            </button>
          );
        })}
      </div>
    </div>
  );
}
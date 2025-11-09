"use client";
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
   const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const descricaoCampo =
    "Acessibilidades. Selecione um ou mais itens que seu restaurante oferece.";

  const listaAtual = formData.acessibilidades || [];

  const handleSelect = (opcao) => {
    let novaLista;
    const jaSelecionado = listaAtual.includes(opcao);

    if (jaSelecionado) {
      novaLista = listaAtual.filter((item) => item !== opcao);
      speakText(`Você removeu: ${opcao}`);
    } else {
      novaLista = [...listaAtual, opcao];
      speakText(`Você selecionou: ${opcao}`);
    }

    setFormData({ ...formData, acessibilidades: novaLista });
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelContainer}>
        <label
          className={styles.label}
          onClick={() => speakText(descricaoCampo)}
          onMouseEnter={() => speakText(descricaoCampo)}
          onFocus={() => handleFocusWithKeyboard(descricaoCampo)}
        >
          Acessibilidades (Selecione um ou mais)
        </label>

        <button
          type="button"
          className={styles.speakButton}
          onClick={() => speakText(descricaoCampo)}
          aria-label="Ouvir descrição do campo Acessibilidades"
        >
          🗣️
        </button>
      </div>

      <div
        className={styles.lista}
        onMouseEnter={() => speakText(descricaoCampo)}
        onFocus={() => handleFocusWithKeyboard(descricaoCampo)}
        tabIndex={0}
      >
        {opcoes.map((tipo) => {
          const isSelected = listaAtual.includes(tipo);

          return (
            <button
              key={tipo}
              type="button"
              className={`${styles.opcao} ${
                isSelected ? styles.selecionado : ""
              }`}
          
              onClick={() => handleSelect(tipo)}
              onMouseEnter={() => speakText(tipo)}
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
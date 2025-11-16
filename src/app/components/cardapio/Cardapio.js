import styles from "./Cardapio.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function Cardapio({ formData, setFormData }) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const opcoes = [
    "Japonês",
    "Italiano",
    "Caseiro",
    "Vegano",
    "Fast Food",
    "Brasileiro",
    "Pizzaria",
    "Outro",
  ];

  const descricaoCampo = "Tipo de cardápio. Selecione a culinária principal";

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelContainer}>
        <label
          className={styles.label}
          onClick={() => speakText(descricaoCampo)}
          onMouseEnter={() => speakText(descricaoCampo)}
          onFocus={() => handleFocusWithKeyboard(descricaoCampo)}
        >
          Tipo de Cardápio (Culinária)
        </label>

        <button
          type="button"
          className={styles.speakButton}
          onClick={() => speakText(descricaoCampo)}
          aria-label="Ouvir descrição do campo Tipo de Cardápio"
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
        {opcoes.map((tipo) => (
          <button
            key={tipo}
            type="button"
            className={`${styles.opcao} ${
              formData.cardapio === tipo ? styles.selecionado : ""
            }`}
            onClick={() => {
              setFormData({ ...formData, cardapio: tipo });
              speakText(`Você selecionou: ${tipo}`);
            }}
            onMouseEnter={() => speakText(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import styles from "./FormClient.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";

export default function FormularioCliente() {
  const [telefone, setTelefone] = useState("");
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  const handleTelefoneChange = (e) => {
    const valor = e.target.value;
    const regexNumeros = /^[0-9]*$/;
    if (regexNumeros.test(valor)) {
      setTelefone(valor);
    }
  };

  return (
    <div
      className={styles.formContainer}
      role="form"
      aria-label="Formulário de cadastro de cliente"
    >
      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label
              htmlFor="nomeCompleto"
              className={styles.label}
              onClick={() =>
                speakText("Nome completo. Digite seu nome completo")
              }
              onMouseEnter={() =>
                speakText("Nome completo. Digite seu nome completo")
              }
              onFocus={() =>
                handleFocusWithKeyboard(
                  "Nome completo. Digite seu nome completo"
                )
              }
            >
              Nome Completo
            </label>
            <button
              type="button"
              className={styles.speakButton}
              onClick={() =>
                speakText("Nome completo. Digite seu nome completo")
              }
              aria-label="Ouvir descrição do campo Nome Completo"
            >
              🗣️
            </button>
          </div>

          <input
            id="nomeCompleto"
            type="text"
            placeholder="Seu nome completo"
            className={styles.inputField}
            onFocus={() =>
              handleFocusWithKeyboard("Nome completo. Digite seu nome completo")
            }
            onClick={() => speakText("Nome completo. Digite seu nome completo")}
            onMouseEnter={() =>
              speakText("Nome completo. Digite seu nome completo")
            }
            aria-required="true"
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label
              htmlFor="telefone"
              className={styles.label}
              onClick={() => speakText("Telefone. Digite seu telefone com DDD")}
              onMouseEnter={() =>
                speakText("Telefone. Digite seu telefone com DDD")
              }
              onFocus={() =>
                handleFocusWithKeyboard("Telefone. Digite seu telefone com DDD")
              }
            >
              Telefone
            </label>
            <button
              type="button"
              className={styles.speakButton}
              onClick={() => speakText("Telefone. Digite seu telefone com DDD")}
              aria-label="Ouvir descrição do campo Telefone"
            >
              🗣️
            </button>
          </div>

          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={handleTelefoneChange}
            inputMode="numeric"
            maxLength={11}
            placeholder="(00) 00000-0000"
            className={styles.inputField}
            onFocus={() =>
              handleFocusWithKeyboard("Telefone. Digite seu telefone com DDD")
            }
            onClick={() => speakText("Telefone. Digite seu telefone com DDD")}
            onMouseEnter={() =>
              speakText("Telefone. Digite seu telefone com DDD")
            }
            aria-required="true"
          />
        </div>
      </div>

      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label
              htmlFor="email"
              className={styles.label}
              onClick={() => speakText("E-mail. Digite seu melhor e-mail")}
              onMouseEnter={() => speakText("E-mail. Digite seu melhor e-mail")}
              onFocus={() =>
                handleFocusWithKeyboard("E-mail. Digite seu melhor e-mail")
              }
            >
              E-mail
            </label>
            <button
              type="button"
              className={styles.speakButton}
              onClick={() => speakText("E-mail. Digite seu melhor e-mail")}
              aria-label="Ouvir descrição do campo E-mail"
            >
              🗣️
            </button>
          </div>

          <input
            id="email"
            type="email"
            placeholder="Seu melhor e-mail"
            className={styles.inputField}
            onFocus={() =>
              handleFocusWithKeyboard("E-mail. Digite seu melhor e-mail")
            }
            onClick={() => speakText("E-mail. Digite seu melhor e-mail")}
            onMouseEnter={() => speakText("E-mail. Digite seu melhor e-mail")}
            aria-required="true"
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label
              htmlFor="confirmEmail"
              className={styles.label}
              onClick={() =>
                speakText("Confirmar e-mail. Repita o e-mail para confirmar")
              }
              onMouseEnter={() =>
                speakText("Confirmar e-mail. Repita o e-mail para confirmar")
              }
              onFocus={() =>
                handleFocusWithKeyboard(
                  "Confirmar e-mail. Repita o e-mail para confirmar"
                )
              }
            >
              Confirmar E-mail
            </label>
            <button
              type="button"
              className={styles.speakButton}
              onClick={() =>
                speakText("Confirmar e-mail. Repita o e-mail para confirmar")
              }
              aria-label="Ouvir descrição do campo Confirmar E-mail"
            >
              🗣️
            </button>
          </div>

          <input
            id="confirmEmail"
            type="email"
            placeholder="Repita o e-mail"
            className={styles.inputField}
            onFocus={() =>
              handleFocusWithKeyboard(
                "Confirmar e-mail. Repita o e-mail para confirmar"
              )
            }
            onClick={() =>
              speakText("Confirmar e-mail. Repita o e-mail para confirmar")
            }
            onMouseEnter={() =>
              speakText("Confirmar e-mail. Repita o e-mail para confirmar")
            }
            aria-required="true"
          />
        </div>
      </div>
    </div>
  );
}

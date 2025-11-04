"use client";

import { useState } from "react";
import styles from "./register.module.css";

import { speakText, handleFocusWithKeyboard } from "../utils/useSpeech";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import AlternadorUsuario from "../components/userAlternator/UserAlternator";
import FormClient from "../components/formClient/FormClient";
import FormOwner from "../components/formOwner/FormOwner";

export default function RegisterPage() {
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

  const textoAtual =
    tipoUsuario === "cliente"
      ? "Formulário para cliente. Informe seus dados para encontrar restaurantes acessíveis."
      : "Formulário para anunciante. Informe os dados do seu estabelecimento.";

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.formWrapper}>
          <h2
            className={styles.formTitle}
            onMouseEnter={() =>
              speakText("Página de registro. Escolha seu tipo de usuário.")
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "Página de registro. Escolha seu tipo de usuário."
              )
            }
          >
            Você é:
          </h2>

          <AlternadorUsuario
            tipoUsuario={tipoUsuario}
            setTipoUsuario={setTipoUsuario}
          />

          <p
            className={styles.formDescription}
            onMouseEnter={() => speakText(textoAtual)}
            onFocus={() => handleFocusWithKeyboard(textoAtual)}
            tabIndex={0}
          >
            {textoAtual}
          </p>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              speakText("Cadastrando...");
              setTimeout(
                () => speakText("Cadastro realizado com sucesso!"),
                1500
              );
            }}
          >
            {tipoUsuario === "cliente" ? <FormClient /> : <FormOwner />}

            <div className={styles.submitWrapper}>
              <button
                type="submit"
                className={styles.submitButton}
                onMouseEnter={() =>
                  speakText(
                    "Botão cadastrar. Pressione Enter para enviar o formulário."
                  )
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "Botão cadastrar. Pressione Enter para enviar o formulário."
                  )
                }
                aria-label="Botão cadastrar"
                aria-describedby="submitHint"
              >
                Cadastrar
              </button>

              <button
                type="button"
                onClick={() =>
                  speakText(
                    "Botão cadastrar. Pressione Enter para enviar o formulário."
                  )
                }
                aria-label="Ouvir instrução do botão cadastrar"
                className={styles.voiceButton}
              >
                🗣️
              </button>
            </div>

            <small id="submitHint" className={styles.hidden}>
              Pressione Enter para enviar o formulário.
            </small>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

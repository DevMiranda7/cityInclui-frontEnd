"use client";

import { useState } from "react";
import styles from "./register.module.css";

import { speakText, handleFocusWithKeyboard } from "../utils/useSpeech";
import AlternadorUsuario from "../components/userAlternator/UserAlternator";
import FormClient from "../components/formClient/FormClient";
import FormOwner from "../components/formOwner/FormOwner";
import { createOwner } from "../../lib/api/ownerService";
import ModalMensagem from "../components/modal/ModalMensagem";

export default function RegisterPage() {
  const [tipoUsuario, setTipoUsuario] = useState("cliente");
  const [formData, setFormData] = useState({});
  const [foto, setFoto] = useState(null);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  // funções do modal
  const abrirModal = (type, message) => {
    setModal({ open: true, type, message });
    speakText(message);
  };
  const fecharModal = () => setModal({ open: false, type: "", message: "" });

  const textoAtual =
    tipoUsuario === "cliente"
      ? "Formulário para cliente. Informe seus dados para encontrar restaurantes acessíveis."
      : "Formulário para anunciante. Informe os dados do seu estabelecimento.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    speakText("Cadastrando...");

    try {
      if (tipoUsuario === "cliente") {
        throw new Error("Cadastro de cliente não implementado.");
      } else {
        if (!formData.senha || !formData.confirmarSenhaAnunciante) {
          throw new Error("Por favor, preencha a senha e a confirmação.");
        }
        if (formData.senha !== formData.confirmarSenhaAnunciante) {
          throw new Error("As senhas não conferem. Por favor, verifique.");
        }

        if (!foto) {
          throw new Error("Por favor, selecione uma foto para o anúncio.");
        }

        await createOwner(formData, [foto]);
      }

      abrirModal("sucesso", "Cadastro realizado com sucesso!");
      setFormData({});
      setFoto(null);
    } catch (error) {
      const msg = error.message || "Erro desconhecido.";
      abrirModal("erro", msg);
      console.error(msg);
    }
  };

  return (
    <div className={styles.pageContainer}>
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

          <form className={styles.form} onSubmit={handleSubmit}>
            {tipoUsuario === "cliente" ? (
              <FormClient
                formData={formData}
                setFormData={setFormData}
                speakText={speakText}
                handleFocusWithKeyboard={handleFocusWithKeyboard}
              />
            ) : (
              <FormOwner
                formData={formData}
                setFormData={setFormData}
                foto={foto}
                setFoto={setFoto}
                speakText={speakText}
                handleFocusWithKeyboard={handleFocusWithKeyboard}
              />
            )}

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

      {/* MODAL */}
      <ModalMensagem
        isOpen={modal.open}
        onClose={fecharModal}
        type={modal.type}
        message={modal.message}
      />
    </div>
  );
}

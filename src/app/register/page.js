"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { useSpeechSettings } from "../context/SpeechContext";
import AlternadorUsuario from "../components/userAlternator/UserAlternator";
import FormClient from "../components/formClient/FormClient";
import FormOwner from "../components/formOwner/FormOwner";
import { createOwner } from "../../lib/api/ownerService";
import ModalMensagem from "../components/modal/ModalMensagem";

export default function RegisterPage() {
  const router = useRouter();

  const [tipoUsuario, setTipoUsuario] = useState("cliente");
  const [formData, setFormData] = useState({});
  const [foto, setFoto] = useState(null);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const abrirModal = (type, message) => {
    setModal({ open: true, type, message });
  };

  const fecharModal = () => {
    setModal({ open: false, type: "", message: "" });
  };

  const textoAtual =
    tipoUsuario === "cliente"
      ? "Formulário para cliente. Informe seus dados para encontrar restaurantes acessíveis."
      : "Formulário para anunciante. Informe os dados do seu estabelecimento.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    stopSpeech();
    safeSpeak("Cadastrando, aguarde um momento...");

    try {
      if (tipoUsuario === "cliente") {
        const { nomeCompleto, email, telefone, senha, confirmarSenha } = formData;

        if (!nomeCompleto || !email || !telefone || !senha || !confirmarSenha) {
          throw new Error("Por favor, preencha todos os campos obrigatórios.");
        }

        if (senha !== confirmarSenha) {
          throw new Error("As senhas não conferem. Verifique e tente novamente.");
        }

        const response = await fetch("/api/proxy/cadastrar-cliente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nomeCompleto, email, telefone, senha }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao cadastrar cliente.");
        }
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

      setTimeout(() => {
        router.push("/login");
      }, 1500);

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
            tabIndex={0}
            onMouseEnter={() =>
              safeSpeak("Página de registro. Escolha seu tipo de usuário.")
            }
            onMouseLeave={stopSpeech}
            onFocus={() =>
              handleFocusWithKeyboard("Página de registro. Escolha seu tipo de usuário.")
            }
          >
            Você é:
          </h2>

          <AlternadorUsuario tipoUsuario={tipoUsuario} setTipoUsuario={setTipoUsuario} />

          <p
            className={styles.formDescription}
            tabIndex={0}
            onMouseEnter={() => safeSpeak(textoAtual)}
            onMouseLeave={stopSpeech}
            onFocus={() => handleFocusWithKeyboard(textoAtual)}
          >
            {textoAtual}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {tipoUsuario === "cliente" ? (
              <FormClient formData={formData} setFormData={setFormData} />
            ) : (
              <FormOwner formData={formData} setFormData={setFormData} foto={foto} setFoto={setFoto} />
            )}

            <div className={styles.submitWrapper}>
              <button
                type="submit"
                className={styles.submitButton}
                onMouseEnter={() =>
                  safeSpeak("Botão cadastrar. Pressione Enter para enviar o formulário.")
                }
                onMouseLeave={stopSpeech}
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
                  safeSpeak("Botão cadastrar. Pressione Enter para enviar o formulário.")
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

      <ModalMensagem
        isOpen={modal.open}
        onClose={fecharModal}
        type={modal.type}
        message={modal.message}
      />
    </div>
  );
}
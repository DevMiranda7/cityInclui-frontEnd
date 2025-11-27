"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditarCliente from "../components/editarCliente/EditarCliente";
import {
  getProfileClient,
  updateClientProfile,
} from "@/src/lib/api/clienteService";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/loading/LoadingScreen";
import styles from "./EditarPage.module.css";
import { useSpeechSettings } from "../context/SpeechContext";
import ModalMensagem from "../components/modal/ModalMensagem";

export default function EditarPageCliente() {
  const { userType, loadingUser } = useAuth();

  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const [dadosCliente, setDadosCliente] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("sucesso");
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    if (!loadingUser && !userType) {
      router.replace("/login");
    }
  }, [userType, loadingUser, router]);

  useEffect(() => {
    if (!userType) return;

    const carregarDados = async () => {
      try {
        setCarregando(true);
        const dados = await getProfileClient();
        setDadosCliente(dados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setModalType("erro");
        setModalMessage("Erro ao carregar dados do perfil.");
        setModalOpen(true);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [userType]);

  const handleSalvar = async (dadosAtualizados) => {
    try {
      setSalvando(true);
      safeSpeak("Salvando alterações...");

      await updateClientProfile(dadosAtualizados);

      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setSalvando(false);

      setModalType("erro");
      setModalMessage(
        "Erro ao atualizar perfil: " + (error.message || "Tente novamente.")
      );
      setModalOpen(true);
    }
  };

  if (carregando || loadingUser)
    return <LoadingScreen text="Carregando perfil..." />;

  return (
    <div className={styles.pageWrapper}>
      <button
        onClick={() => router.back()}
        className={styles.backButton}
        onMouseEnter={() => safeSpeak("Botão Voltar")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Botão Voltar")}
      >
        ← Voltar
      </button>

      <h1
        className={styles.title}
        tabIndex={0}
        onMouseEnter={() => safeSpeak("Título: Editar Perfil")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Título: Editar Perfil")}
      >
        Editar Perfil
      </h1>

      <EditarCliente
        initialData={dadosCliente}
        onSave={handleSalvar}
        onCancel={() => router.back()}
      />

      {salvando && (
        <div className={styles.savingOverlay}>
          <div
            className={styles.savingBox}
            role="alert"
            onMouseEnter={() => safeSpeak("Aguarde. Atualizando perfil...")}
          >
            <div className={styles.spinner}></div>
            <p>Atualizando perfil...</p>
          </div>
        </div>
      )}

      <ModalMensagem
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}

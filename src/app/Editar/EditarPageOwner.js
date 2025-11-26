"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditarRestaurante from "../components/editarRestaurante/EditarRestaurante";
import { updateOwnerProfile, getProfile } from "@/src/lib/api/ownerService";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/loading/LoadingScreen";
import styles from "./EditarPage.module.css";

import { useSpeechSettings } from "../context/SpeechContext";
import ModalMensagem from "../components/modal/ModalMensagem";

export default function EditarPageOwner() {
  const { userType, loadingUser } = useAuth();

  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const [dadosRestaurante, setDadosRestaurante] = useState(null);
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
        const dados = await getProfile();

        setDadosRestaurante({
          ...dados,
          foto: dados.photo?.length ? dados.photo[0].urlFoto : null,
          acessibilidades:
            dados.acessibilidadeDTOS?.map((a) => a.acessibilidade) || [],
        });
      } catch (error) {
        console.error(error);
        setModalType("erro");
        setModalMessage("Não foi possível carregar os dados do restaurante.");
        setModalOpen(true);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [userType]);

  const handleSalvar = async (dadosAtualizados, novaFotoFile) => {
    try {
      setSalvando(true);
      safeSpeak("Salvando alterações do restaurante...");

      const updatedData = await updateOwnerProfile(
        dadosAtualizados,
        novaFotoFile ? [novaFotoFile] : []
      );

      const idRestaurante = updatedData.id || dadosRestaurante.id;
      
      stopSpeech();
      router.refresh();
      router.push(`/restaurante/${idRestaurante}`);
    } catch (error) {
      console.error(error);
      setSalvando(false);
      setModalType("erro");
      setModalMessage("Erro ao salvar as alterações. Tente novamente.");
      setModalOpen(true);
    }
  };

  const handleCancelar = () => {
    stopSpeech();
    router.back();
  };

  if (carregando || loadingUser)
    return <LoadingScreen text="Carregando dados do restaurante..." />;

  if (!dadosRestaurante) {
    return (
      <div 
        className={styles.errorContainer}
        tabIndex={0}
        onMouseEnter={() => safeSpeak("Erro. Não foi possível carregar os dados. Recarregue a página.")}
        onFocus={() => handleFocusWithKeyboard("Erro. Não foi possível carregar os dados.")}
      >
        Não foi possível carregar os dados. Recarregue a página.
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <button 
        onClick={handleCancelar} 
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
        onMouseEnter={() => safeSpeak("Editar Informações do Restaurante")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Editar Informações do Restaurante")}
      >
        Editar Informações do Restaurante
      </h1>
      
      <p 
        className={styles.subtitle}
        tabIndex={0}
        onMouseEnter={() => safeSpeak("Atualize as informações do seu restaurante abaixo")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Atualize as informações do seu restaurante abaixo")}
      >
        Atualize as informações do seu restaurante abaixo
      </p>

      <EditarRestaurante
        initialData={dadosRestaurante}
        onSave={handleSalvar}
        onCancel={handleCancelar}
      />

      {salvando && (
        <div className={styles.savingOverlay}>
          <div 
            className={styles.savingBox}
            role="alert"
            onMouseEnter={() => safeSpeak("Aguarde. Salvando alterações...")}
          >
            <div className={styles.spinner}></div>
            <p>Salvando alterações...</p>
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
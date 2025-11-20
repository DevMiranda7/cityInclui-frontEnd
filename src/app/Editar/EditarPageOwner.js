"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditarRestaurante from "../components/editarRestaurante/EditarRestaurante";
import { updateOwnerProfile, getProfile } from "@/src/lib/api/ownerService";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/loading/LoadingScreen";
import styles from "./EditarPage.module.css";

// 1. Importações de Voz e Modal
import { useSpeechSettings } from "../context/SpeechContext";
import ModalMensagem from "../components/modal/ModalMensagem";

export default function EditarPageOwner() {
  const { userType, loadingUser } = useAuth();

  // 2. Hooks de Voz
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const [dadosRestaurante, setDadosRestaurante] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // 3. Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("sucesso");
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();

  // Função auxiliar para parar o áudio (cleanup)
  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup: Para a voz ao desmontar
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
        // Feedback visual e sonoro de erro ao carregar
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
      safeSpeak("Salvando alterações do restaurante..."); // Feedback de voz

      const updatedData = await updateOwnerProfile(
        dadosAtualizados,
        novaFotoFile ? [novaFotoFile] : []
      );

      const idRestaurante = updatedData.id || dadosRestaurante.id;
      
      // Para o áudio antes de navegar
      stopSpeech();
      router.refresh();
      router.push(`/restaurante/${idRestaurante}`);
    } catch (error) {
      console.error(error);
      setSalvando(false); // Para o loading se der erro

      // 4. Substituição do Alert pelo Modal
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
        // Voz no botão voltar
        onMouseEnter={() => safeSpeak("Botão Voltar")}
        onMouseLeave={stopSpeech}
        onFocus={() => handleFocusWithKeyboard("Botão Voltar")}
      >
        ← Voltar
      </button>

      <h1 
        className={styles.title}
        tabIndex={0}
        // Voz no Título
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

      {/* 5. Modal de Mensagem */}
      <ModalMensagem
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
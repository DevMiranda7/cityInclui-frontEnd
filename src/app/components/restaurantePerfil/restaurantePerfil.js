"use client";

import { useState, useEffect } from "react";
import styles from "./restaurantePerfil.module.css";

import ExibirCardapio from "../cardapio/ExibirCardapio";
import ExibirAcessibilidades from "../accessibility/ExibirAcessibilidades";
import FormAvaliacao from "../formAvaliacao/FormAvaliacao";
import ListaAvaliacoes from "../avaliacoes/ListaAvaliacoes";

import { useAuth } from "../../context/AuthContext";
import { createReview, getReviews } from "@/src/lib/api/reviewService";
import { useSpeechSettings } from "../../context/SpeechContext";

import ModalMensagem from "../modal/ModalMensagem";

export default function PerfilRestaurante({ restaurante }) {
  const { userType } = useAuth();
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings(); 

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const isClient = userType === "CLIENT";

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("sucesso");
  const [modalMessage, setModalMessage] = useState("");

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    if (restaurante?.id) {
      getReviews(restaurante.id)
        .then((data) => setAvaliacoes(data))
        .finally(() => setLoadingReviews(false));
    }
  }, [restaurante]);

  if (!restaurante) {
    return (
      <p
        tabIndex={0}
        onMouseEnter={() => safeSpeak("Carregando perfil do restaurante...")}
        onFocus={() => handleFocusWithKeyboard("Carregando perfil do restaurante...")}
      >
        Carregando...
      </p>
    );
  }

  const tipoCulinaria = restaurante.cardapio || null;
  const listaAcessibilidades =
    restaurante.acessibilidadeDTOS?.map((a) => a.acessibilidade) || [];

  const handleSubmitAvaliacao = async (dados) => {
    if (!isClient) return;

    try {
      stopSpeech();
      const novaReview = await createReview(restaurante.id, dados);
      setAvaliacoes((prev) => [novaReview, ...prev]);

      setModalType("sucesso");
      setModalMessage("Avaliação enviada com sucesso!");
      setModalOpen(true);
    } catch (error) {
      console.error(error);

      setModalType("erro");
      setModalMessage(error.message);
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.photos}>
        {restaurante.photo?.length > 0 ? (
          restaurante.photo.map((photo, i) => (
            <img
              key={i}
              src={photo.urlFoto}
              className={styles.photo}
              alt={`Foto ${i + 1} do restaurante ${restaurante.nomeDoRestaurante}`}
              tabIndex={0}
              onMouseEnter={() =>
                safeSpeak(`Foto ${i + 1} do restaurante ${restaurante.nomeDoRestaurante}`)
              }
              onMouseLeave={stopSpeech}
              onFocus={() =>
                handleFocusWithKeyboard(
                  `Foto ${i + 1} do restaurante ${restaurante.nomeDoRestaurante}`
                )
              }
            />
          ))
        ) : (
          <img
            src="https://placehold.co/600x400"
            className={styles.photo}
            alt="Sem Foto disponível"
            tabIndex={0}
            onMouseEnter={() => safeSpeak("Sem foto disponível para este restaurante")}
            onMouseLeave={stopSpeech}
            onFocus={() =>
              handleFocusWithKeyboard("Sem foto disponível para este restaurante")
            }
          />
        )}
      </div>

      <div className={styles.infoRestaurante}>
        <h1
          tabIndex={0}
          onMouseEnter={() => safeSpeak(`Restaurante ${restaurante.nomeDoRestaurante}`)}
          onMouseLeave={stopSpeech}
          onFocus={() =>
            handleFocusWithKeyboard(`Restaurante ${restaurante.nomeDoRestaurante}`)
          }
        >
          {restaurante.nomeDoRestaurante}
        </h1>
        <p
          tabIndex={0}
          onMouseEnter={() => safeSpeak(`Descrição: ${restaurante.descricao}`)}
          onMouseLeave={stopSpeech}
          onFocus={() =>
            handleFocusWithKeyboard(`Descrição: ${restaurante.descricao}`)
          }
        >
          {restaurante.descricao}
        </p>
      </div>

      <div className={styles.cardapioWrapper}>
        <h2
          tabIndex={0}
          onMouseEnter={() => safeSpeak("Seção: Tipo de Culinária")}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard("Seção: Tipo de Culinária")}
        >
          Tipo de Culinária
        </h2>
        <ExibirCardapio culinaria={tipoCulinaria} />
      </div>

      <div className={styles.acessibilidadeWrapper}>
        <h2
          tabIndex={0}
          onMouseEnter={() => safeSpeak("Seção: Acessibilidades disponíveis")}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard("Seção: Acessibilidades disponíveis")}
        >
          Acessibilidades
        </h2>
        <ExibirAcessibilidades acessibilidades={listaAcessibilidades} />
      </div>

      <div className={styles.avaliacaoWrapper}>
        <h2
          tabIndex={0}
          onMouseEnter={() => safeSpeak("Seção: Avaliações dos clientes")}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard("Seção: Avaliações dos clientes")}
        >
          Avaliações
        </h2>

        {loadingReviews ? (
          <p
            tabIndex={0}
            onMouseEnter={() => safeSpeak("Carregando opiniões...")}
            onFocus={() => handleFocusWithKeyboard("Carregando opiniões...")}
          >
            Carregando opiniões...
          </p>
        ) : (
          <ListaAvaliacoes avaliacoes={avaliacoes} />
        )}

        <div className={styles.divider}></div>

        {isClient ? (
          <div>
            <h3
              tabIndex={0}
              onMouseEnter={() => safeSpeak("Formulário: Deixe sua Avaliação")}
              onMouseLeave={stopSpeech}
              onFocus={() => handleFocusWithKeyboard("Formulário: Deixe sua Avaliação")}
            >
              Deixe sua Avaliação
            </h3>
            <FormAvaliacao onSubmit={handleSubmitAvaliacao} />
          </div>
        ) : userType === null ? (
          <p
            className={styles.loginMessage}
            tabIndex={0}
            onMouseEnter={() =>
              safeSpeak("Faça login como cliente para avaliar este local.")
            }
            onMouseLeave={stopSpeech}
            onFocus={() =>
              handleFocusWithKeyboard("Faça login como cliente para avaliar este local.")
            }
          >
            Faça <a href="/login">login como cliente</a> para avaliar este local.
          </p>
        ) : null}
      </div>

      <ModalMensagem
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
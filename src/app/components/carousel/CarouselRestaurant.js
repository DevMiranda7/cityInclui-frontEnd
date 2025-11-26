"use client";
import styles from "./CarouselRestaurant.module.css";
import React, { useState, useEffect } from "react";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { getRestaurantes } from "@/src/lib/api/ownerService";
import { useSpeechSettings } from "../../context/SpeechContext";
import Link from "next/link";
import StarRating from "../../components/elements/StarRating";

const RestaurantCarousel = ({ autoRotate = true }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurantes();
        setRestaurants(data);
      } catch (err) {
        setError("Não foi possível carregar os restaurantes no momento.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!autoRotate || restaurants.length === 0) return;

    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % restaurants.length),
      50000
    );

    return () => clearInterval(interval);
  }, [restaurants.length, autoRotate]);

  useEffect(() => {
    if (restaurants.length === 0) return;


    const timer = setTimeout(() => {
        const current = restaurants[currentSlide];
        const texto = `
          Restaurante em destaque: ${current.nomeDoRestaurante || "Sem nome"}.
          Categoria: ${current.categoria || "Categoria não informada"}.
          Descrição: ${current.descricao || "Sem descrição disponível"}.
          Itens de acessibilidade: ${
            current.acessibilidadeDTOS?.map((a) => a.acessibilidade).join(", ") ||
            "Nenhum item informado"
          }.
        `;
        safeSpeak(texto);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide, restaurants, safeSpeak]);

  const changeSlide = (index) =>
    restaurants.length > 0 &&
    setCurrentSlide((index + restaurants.length) % restaurants.length);

  const goToPrevSlide = () => changeSlide(currentSlide - 1);
  const goToNextSlide = () => changeSlide(currentSlide + 1);

  if (loading) return <LoadingScreen text="Carregando informações..." />;

  if (error)
    return (
      <section className={styles.restaurantsSection}>
        <p className={styles.errorMessage}>{error}</p>
      </section>
    );

  if (!restaurants.length)
    return (
      <section className={styles.restaurantsSection}>
        <p className={styles.emptyMessage}>
          Nenhum restaurante em destaque encontrado.
        </p>
      </section>
    );

  return (
    <section
      className={styles.restaurantsSection}
      aria-label="Carrossel de restaurantes em destaque"
      onMouseLeave={stopSpeech}
    >
      <h2
        tabIndex={0}
        className={styles.sectionTitle}
        onMouseEnter={() => safeSpeak("Restaurantes em destaque")}
        onMouseLeave={stopSpeech} 
        onFocus={() =>
          handleFocusWithKeyboard("Restaurantes em destaque")
        }
      >
        Restaurantes em Destaque
      </h2>

      <div className={styles.rotatingRestaurant}>

        <button
          className={`${styles.slideArrow} ${styles.prevArrow}`}
          onClick={goToPrevSlide}
          aria-label="Restaurante anterior"
          onMouseEnter={() => safeSpeak("Restaurante anterior")}
          onMouseLeave={stopSpeech}
          onFocus={() =>
            handleFocusWithKeyboard("Restaurante anterior")
          }
        />

        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant.id || index}
            className={`${styles.restaurantSlide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <img
              tabIndex={0}
              src={
                restaurant.photo?.[0]?.urlFoto ||
                "https://placehold.co/600x600/cccccc/333333?text=Sem+Foto"
              }
              alt={restaurant.nomeDoRestaurante || "Restaurante sem nome"}
              className={styles.restaurantImage}
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/600x600/cccccc/333333?text=Sem+Foto")
              }
              onMouseEnter={() =>
                safeSpeak(
                  `Imagem do restaurante ${restaurant.nomeDoRestaurante || "sem nome"}`
                )
              }
              onMouseLeave={stopSpeech}
              onFocus={() =>
                handleFocusWithKeyboard(
                  `Imagem do restaurante ${restaurant.nomeDoRestaurante || "sem nome"}`
                )
              }
            />

            <div className={styles.restaurantInfo}>
              <h3
                tabIndex={0}
                className={styles.restaurantName}
                onMouseEnter={() =>
                  safeSpeak(
                    `Restaurante ${restaurant.nomeDoRestaurante || "sem nome"}`
                  )
                }
                onMouseLeave={stopSpeech}
                onFocus={() =>
                  handleFocusWithKeyboard(
                    `Restaurante ${restaurant.nomeDoRestaurante || "sem nome"}`
                  )
                }
              >
                {restaurant.nomeDoRestaurante || "Nome não informado"}
              </h3>

              <p
                tabIndex={0}
                className={styles.restaurantCategory}
                onMouseEnter={() =>
                  safeSpeak(
                    `Cardápio: ${restaurant.cardapio || "Cardápio não informado"}`
                  )
                }
                onMouseLeave={stopSpeech}
                onFocus={() =>
                  handleFocusWithKeyboard(
                    `Cardápio: ${restaurant.cardapio || "Cardápio não informado"}`
                  )
                }
              >
                {restaurant.cardapio || "Cardápio não informado"}
              </p>

              <div
                tabIndex={0}
                className={styles.rating}
                onMouseEnter={() =>
                  safeSpeak(
                    `Avaliação ${
                      restaurant.mediaAvaliacao?.toFixed(1) || "não avaliado"
                    } estrelas`
                  )
                }
                onMouseLeave={stopSpeech}
                onFocus={() =>
                  handleFocusWithKeyboard(
                    `Avaliação ${
                      restaurant.mediaAvaliacao?.toFixed(1) || "não avaliado"
                    } estrelas`
                  )
                }
              >
                <div className={styles.ratingStarsWrapper}>
                  <StarRating
                    value={Number(restaurant.mediaAvaliacao) || 0}
                    size={22}
                  />
                  <span className={styles.ratingValue}>
                    {restaurant.mediaAvaliacao
                      ? Number(restaurant.mediaAvaliacao).toFixed(1)
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className={styles.accessibilityTags}>
                {(restaurant.acessibilidadeDTOS || []).map((dto) => (
                  <span
                    key={dto.id}
                    tabIndex={0}
                    className={styles.tag}
                    onMouseEnter={() =>
                      safeSpeak(`Acessibilidade: ${dto.acessibilidade}`)
                    }
                    onMouseLeave={stopSpeech}
                    onFocus={() =>
                      handleFocusWithKeyboard(
                        `Acessibilidade: ${dto.acessibilidade}`
                      )
                    }
                  >
                    {dto.acessibilidade}
                  </span>
                ))}
              </div>

              <p
                tabIndex={0}
                className={styles.restaurantDescription}
                onMouseEnter={() =>
                  safeSpeak(
                    restaurant.descricao || "Descrição não disponível"
                  )
                }
                onMouseLeave={stopSpeech}
                onFocus={() =>
                  handleFocusWithKeyboard(
                    restaurant.descricao || "Descrição não disponível"
                  )
                }
              >
                {restaurant.descricao || "Descrição não disponível"}
              </p>

              <Link
                href={`/restaurante/${restaurant.id}`}
                className={styles.btn}
                onMouseEnter={() =>
                  safeSpeak(
                    `Ver detalhes do restaurante ${restaurant.nomeDoRestaurante}`
                  )
                }
                onMouseLeave={stopSpeech}
                onClick={stopSpeech} 
                onFocus={() =>
                  handleFocusWithKeyboard(
                    `Ver detalhes do restaurante ${restaurant.nomeDoRestaurante}`
                  )
                }
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}

        <button
          className={`${styles.slideArrow} ${styles.nextArrow}`}
          onClick={goToNextSlide}
          aria-label="Próximo restaurante"
          onMouseEnter={() => safeSpeak("Próximo restaurante")}
          onMouseLeave={stopSpeech}
          onFocus={() => handleFocusWithKeyboard("Próximo restaurante")}
        />
      </div>

      <div className={styles.restaurantControls}>
        {restaurants.map((_, index) => (
          <div
            key={index}
            tabIndex={0}
            className={`${styles.controlDot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => {
              changeSlide(index);
              safeSpeak(`Indo para restaurante ${index + 1}`);
            }}
            onMouseEnter={() => safeSpeak(`Ir para restaurante ${index + 1}`)}
            onMouseLeave={stopSpeech}
            onFocus={() =>
              handleFocusWithKeyboard(`Ir para restaurante ${index + 1}`)
            }
            aria-label={`Ir para restaurante ${index + 1}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default RestaurantCarousel;
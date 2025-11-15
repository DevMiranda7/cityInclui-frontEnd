"use client";

import React from "react";
import Link from "next/link";

import styles from "./RestaurantCard.module.css"; 
import { useSpeechSettings } from "../../context/SpeechContext";
import StarRating from "../elements/StarRating"; 

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const getAccessibilityText = (restaurant) => {
  if (
    !restaurant.acessibilidadeDTOS ||
    restaurant.acessibilidadeDTOS.length === 0
  ) {
    return "";
  }
  return (
    "Acessibilidades: " +
    restaurant.acessibilidadeDTOS.map((a) => a.acessibilidade).join(", ")
  );
};

export default function RestaurantCard({ restaurant }) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  const accessibilitySpeakText = getAccessibilityText(restaurant);
  const linkDescription = `Restaurante ${
    restaurant.nomeDoRestaurante || "Nome não informado"
  }. ${
    restaurant.cardapio ? "Culinária: " + restaurant.cardapio + "." : ""
  } ${accessibilitySpeakText}`;

  const imageUrl =
    restaurant.photo?.[0]?.urlFoto ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    alert("Restaurante favoritado!");
  };

  return (
    <li className={styles.resultCard}>
      <Link
        href={`/restaurante/${restaurant.id}`}
        className={styles.resultLink}
        aria-label={linkDescription}
        onMouseEnter={() => speakText(linkDescription)}
        onFocus={() => handleFocusWithKeyboard(linkDescription)}
      >
        <div className={styles.cardImageContainer}>
    
          <button
            className={styles.heartButton}
            onClick={handleFavoriteClick}
            aria-label="Favoritar restaurante"
          >
            <HeartIcon />
          </button>
          <span className={styles.cardTag}>Preferido</span>
          <img
            src={imageUrl}
            alt={`Imagem do restaurante ${restaurant.nomeDoRestaurante}`}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.restaurantName}>
            {restaurant.nomeDoRestaurante || "Nome não informado"}
          </div>

          {restaurant.cardapio && (
            <div className={styles.cuisineText}>{restaurant.cardapio}</div>
          )}

          <div className={styles.mediaContainer}>
            <StarRating value={Number(restaurant.mediaAvaliacao)} size={18} />
            <span className={styles.mediaText}>
              {(Number(restaurant.mediaAvaliacao) || 0).toFixed(1)} / 5
            </span>
          </div>

          {restaurant.acessibilidadeDTOS &&
            restaurant.acessibilidadeDTOS.length > 0 && (
              <div className={styles.accessibilityContainer} aria-hidden="true">
                <div className={styles.accessibilityTagList}>
                  {restaurant.acessibilidadeDTOS.slice(0, 2).map((a) => (
                    <span
                      key={a.id || a.acessibilidade}
                      className={styles.accessibilityTag}
                    >
                      {a.acessibilidade}
                    </span>
                  ))}
                  {restaurant.acessibilidadeDTOS.length > 2 && (
                    <span className={styles.accessibilityTag}>
                      +{restaurant.acessibilidadeDTOS.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
        </div>
      </Link>
    </li>
  );
}
"use client";

import React from "react";
import Link from "next/link";
import styles from "./RestaurantCard.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";
import StarRating from "../elements/StarRating";

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
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

  const accessibilitySpeakText = getAccessibilityText(restaurant);
  
  const linkDescription = `Restaurante ${
    restaurant.nomeDoRestaurante || "Nome não informado"
  }. ${
    restaurant.cardapio ? "Culinária: " + restaurant.cardapio + "." : ""
  } ${accessibilitySpeakText}`;

  const imageUrl =
    restaurant.photo?.[0]?.urlFoto ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

  return (
    <li className={styles.resultCard}>
      <Link
        href={`/restaurante/${restaurant.id}`}
        className={styles.resultLink}
        aria-label={linkDescription}
        onMouseEnter={() => safeSpeak(linkDescription)}
        onFocus={() => handleFocusWithKeyboard(linkDescription)}
      >
        <div className={styles.cardImageContainer}>
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
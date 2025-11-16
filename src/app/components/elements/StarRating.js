"use client";

import styles from "./StarRating.module.css";
import { Star, StarHalf, StarOff } from "lucide-react";

export default function StarRating({ value = 0, size = 20 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFull = value >= i;
    const isHalf = !isFull && value >= i - 0.5;

    if (isFull) {
      stars.push(
        <Star
          key={i}
          size={size}
          className={styles.starFilled}
        />
      );
    } else if (isHalf) {
      stars.push(
        <StarHalf
          key={i}
          size={size}
          className={styles.starFilled}
        />
      );
    } else {
      stars.push(
        <StarOff
          key={i}
          size={size}
          className={styles.starEmpty}
        />
      );
    }
  }

  return <div className={styles.starWrapper}>{stars}</div>;
}

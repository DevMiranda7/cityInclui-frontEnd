"use client";

import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ text = "Carregando..." }) {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{text}</p>
    </div>
  );
}
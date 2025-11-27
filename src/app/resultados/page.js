import React, { Suspense } from "react";
import ResultadosPageComponent from "./ResultadosPageComponent";
import styles from "./ResultadosPage.module.css"


function LoadingFallback() {
  return <p className={styles.statusText}>Carregando...</p>;
}

export default function ResultadosPage() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <ResultadosPageComponent />
      </Suspense>
    </main>
  );
}
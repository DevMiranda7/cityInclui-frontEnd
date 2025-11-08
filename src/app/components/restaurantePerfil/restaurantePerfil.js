"use client";
import styles from "./restaurantePerfil.module.css";
import { useSpeechSettings } from "../../context/SpeechContext";
import ExibirCardapio from "../cardapio/ExibirCardapio";
import ExibirAcessibilidades from "../accessibility/ExibirAcessibilidades";

export default function PerfilRestaurante({ restaurante }) {
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  if (!restaurante) {
    return <p>Carregando...</p>;
  }

  const tipoCulinaria = restaurante.cardapio || null;
  const listaAcessibilidades =
    restaurante.acessibilidadeDTOS?.map((a) => a.acessibilidade) || [];

  return (
    <div className={styles.container}>

      <div className={styles.photos}>
        {restaurante.photo?.length > 0 ? (
          restaurante.photo.map((photo, i) => (
            <img
              key={photo.id || i}
              src={photo.urlFoto}
              alt={`${restaurante.nomeDoRestaurante} - Foto ${i + 1}`}
              onMouseEnter={() => speakText(`Foto ${i + 1} do restaurante`)}
              onFocus={() =>
                handleFocusWithKeyboard(`Foto ${i + 1} do restaurante`)
              }
              className={styles.photo}
            />
          ))
        ) : (
          <img
            src="https://placehold.co/600x400/cccccc/333333?text=Sem+Foto"
            alt="Sem foto"
            className={styles.photo}
          />
        )}
      </div>

    
      <div className={styles.infoRestaurante}>
        <h1
          tabIndex={0}
          onMouseEnter={() => speakText(restaurante.nomeDoRestaurante)}
          onFocus={() => handleFocusWithKeyboard(restaurante.nomeDoRestaurante)}
        >
          {restaurante.nomeDoRestaurante}
        </h1>
        <p
          tabIndex={0}
          onMouseEnter={() =>
            speakText(`Anunciante: ${restaurante.nomeDoAnunciante}`)
          }
          onFocus={() =>
            handleFocusWithKeyboard(
              `Anunciante: ${restaurante.nomeDoAnunciante}`
            )
          }
        >
              Anunciante: {restaurante.nomeDoAnunciante}
        </p>
        <p
          tabIndex={0}
          onMouseEnter={() => speakText(`Descrição: ${restaurante.descricao}`)}
          onFocus={() =>
            handleFocusWithKeyboard(`Descrição: ${restaurante.descricao}`)
          }
        >
          {restaurante.descricao}
        </p>
        <p
          tabIndex={0}
          onMouseEnter={() => speakText(`Telefone: ${restaurante.telefone}`)}
          onFocus={() =>
            handleFocusWithKeyboard(`Telefone: ${restaurante.telefone}`)
          }
        >
          Telefone: {restaurante.telefone}
        </p>
        <p
          tabIndex={0}
          onMouseEnter={() => speakText(`Email: ${restaurante.email}`)}
          onFocus={() => handleFocusWithKeyboard(`Email: ${restaurante.email}`)}
        >
          E-mail: {restaurante.email}
        </p>
      </div>

      <div className={styles.cardapioWrapper}>
        <h2>Tipo de Culinária</h2>
        <ExibirCardapio culinaria={tipoCulinaria} />
      </div>

      <div className={styles.acessibilidadeWrapper}>
        <h2>Acessibilidades</h2>
        <ExibirAcessibilidades acessibilidades={listaAcessibilidades} />
      </div>
    </div>
  );
}
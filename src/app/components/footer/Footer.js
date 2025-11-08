"use client";
import { useSpeechSettings } from "../../context/SpeechContext";

import styles from "./Footer.module.css";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const handleSpeak = (text) => speakText(text);
  const handleFocus = (text) => handleFocusWithKeyboard(text);
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  return (
    <footer
      className={styles.footerContainer}
      role="contentinfo"
      aria-label="Rodapé do site CityInclui"
    >
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.section}>
            <div className={styles.labelContainer}>
              <h4
                className={styles.sectionTitle}
                onClick={() =>
                  handleSpeak("CityInclui. Encontrando restaurantes acessíveis para todos.")
                }
                onMouseEnter={() =>
                  handleSpeak("CityInclui. Encontrando restaurantes acessíveis para todos.")
                }
                onFocus={() =>
                  handleFocus("CityInclui. Encontrando restaurantes acessíveis para todos.")
                }
                tabIndex={0}
              >
                CityInclui
              </h4>
              <button
                className={styles.speakButton}
                onClick={() =>
                  handleSpeak("CityInclui. Encontrando restaurantes acessíveis para todos.")
                }
                aria-label="Ouvir descrição sobre CityInclui"
              >
                🗣️
              </button>
            </div>
            <p className={styles.descriptionText}>
              Encontrando restaurantes acessíveis para todos.
            </p>
          </div>

          <div className={styles.section}>
            <div className={styles.labelContainer}>
              <h4
                className={styles.sectionTitle}
                onClick={() => handleSpeak("Entre em contato conosco")}
                onMouseEnter={() => handleSpeak("Entre em contato conosco")}
                onFocus={() => handleFocus("Entre em contato conosco")}
                tabIndex={0}
              >
                Contato
              </h4>
              <button
                className={styles.speakButton}
                onClick={() => handleSpeak("Entre em contato conosco")}
                aria-label="Ouvir informações de contato"
              >
                🗣️
              </button>
            </div>
            <p
              className={styles.descriptionText}
              onMouseEnter={() => handleSpeak("E-mail de contato: contato arroba cityinclui ponto com ponto br")}
              tabIndex={0}
            >
              contato@cityinclui.com.br
            </p>
            <p
              className={styles.descriptionText}
              onMouseEnter={() => handleSpeak("Telefone de contato. Onze quatro mil e dois oitenta e nove vinte e dois")}
              tabIndex={0}
            >
              (11) 4002-8922
            </p>
          </div>

          <div className={styles.section}>
            <div className={styles.labelContainer}>
              <h4
                className={styles.sectionTitle}
                onClick={() =>
                  handleSpeak("Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter")
                }
                onMouseEnter={() =>
                  handleSpeak("Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter")
                }
                onFocus={() =>
                  handleFocus("Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter")
                }
                tabIndex={0}
              >
                Redes Sociais
              </h4>
              <button
                className={styles.speakButton}
                onClick={() =>
                  handleSpeak("Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter")
                }
                aria-label="Ouvir redes sociais disponíveis"
              >
                🗣️
              </button>
            </div>
            <div className={styles.socialIcons}>
              <a
                href="#"
                className={styles.iconLink}
                aria-label="Facebook da CityInclui"
                onMouseEnter={() => handleSpeak("Facebook da CityInclui")}
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className={styles.iconLink}
                aria-label="Instagram da CityInclui"
                onMouseEnter={() => handleSpeak("Instagram da CityInclui")}
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className={styles.iconLink}
                aria-label="Twitter da CityInclui"
                onMouseEnter={() => handleSpeak("Twitter da CityInclui")}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.footerBottom}>
          <p
            className={styles.copyrightText}
            onMouseEnter={() => handleSpeak("Copyright 2025 CityInclui. Todos os direitos reservados.")}
            tabIndex={0}
          >
            © 2025 <span>CityInclui</span>. Todos os direitos reservados.
          </p>

          <button
            className={styles.suggestionButton}
            onClick={() =>
              handleSpeak("Botão de sugestão de restaurante. Clique para sugerir um novo restaurante acessível.")
            }
            onMouseEnter={() =>
              handleSpeak("Botão de sugestão de restaurante. Clique para sugerir um novo restaurante acessível.")
            }
            onFocus={() =>
              handleFocus("Botão de sugestão de restaurante. Clique para sugerir um novo restaurante acessível.")
            }
          >
            Restaurante Sugestão
          </button>
        </div>
      </div>
    </footer>
  );
}

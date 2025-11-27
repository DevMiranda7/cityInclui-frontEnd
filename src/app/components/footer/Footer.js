"use client";

import { useSpeechSettings } from "../../context/SpeechContext";
import styles from "./Footer.module.css";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const { safeSpeak, handleFocusWithKeyboard } = useSpeechSettings();

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
                  safeSpeak(
                    "CityInclui. Encontrando restaurantes acessíveis para todos."
                  )
                }
                onMouseEnter={() =>
                  safeSpeak(
                    "CityInclui. Encontrando restaurantes acessíveis para todos."
                  )
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "CityInclui. Encontrando restaurantes acessíveis para todos."
                  )
                }
                tabIndex={0}
              >
                CityInclui
              </h4>
              <button
                className={styles.speakButton}
                onClick={() =>
                  safeSpeak(
                    "CityInclui. Encontrando restaurantes acessíveis para todos."
                  )
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
                onClick={() => safeSpeak("Entre em contato conosco")}
                onMouseEnter={() => safeSpeak("Entre em contato conosco")}
                onFocus={() =>
                  handleFocusWithKeyboard("Entre em contato conosco")
                }
                tabIndex={0}
              >
                Contato
              </h4>
              <button
                className={styles.speakButton}
                onClick={() => safeSpeak("Entre em contato conosco")}
                aria-label="Ouvir informações de contato"
              >
                🗣️
              </button>
            </div>
            <p
              className={styles.descriptionText}
              onMouseEnter={() =>
                safeSpeak(
                  "E-mail de contato: contato arroba cityinclui ponto com ponto br"
                )
              }
              onFocus={() =>
                handleFocusWithKeyboard(
                  "E-mail de contato: contato arroba cityinclui ponto com ponto br"
                )
              }
              tabIndex={0}
            >
              contato@cityinclui.com.br
            </p>
            <p
              className={styles.descriptionText}
              onMouseEnter={() =>
                safeSpeak(
                  "Telefone de contato. Onze quatro mil e dois oitenta e nove vinte e dois"
                )
              }
              onFocus={() =>
                handleFocusWithKeyboard(
                  "Telefone de contato. Onze quatro mil e dois oitenta e nove vinte e dois"
                )
              }
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
                  safeSpeak(
                    "Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter"
                  )
                }
                onMouseEnter={() =>
                  safeSpeak(
                    "Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter"
                  )
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter"
                  )
                }
                tabIndex={0}
              >
                Redes Sociais
              </h4>
              <button
                className={styles.speakButton}
                onClick={() =>
                  safeSpeak(
                    "Siga a CityInclui nas redes sociais: Facebook, Instagram e Twitter"
                  )
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
                onMouseEnter={() => safeSpeak("Facebook da CityInclui")}
                onFocus={() =>
                  handleFocusWithKeyboard("Facebook da CityInclui")
                }
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className={styles.iconLink}
                aria-label="Instagram da CityInclui"
                onMouseEnter={() => safeSpeak("Instagram da CityInclui")}
                onFocus={() =>
                  handleFocusWithKeyboard("Instagram da CityInclui")
                }
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className={styles.iconLink}
                aria-label="Twitter da CityInclui"
                onMouseEnter={() => safeSpeak("Twitter da CityInclui")}
                onFocus={() =>
                  handleFocusWithKeyboard("Twitter da CityInclui")
                }
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
            onMouseEnter={() =>
              safeSpeak(
                "Copyright 2025 CityInclui. Todos os direitos reservados."
              )
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "Copyright 2025 CityInclui. Todos os direitos reservados."
              )
            }
            tabIndex={0}
          >
            © 2025 <span>CityInclui</span>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
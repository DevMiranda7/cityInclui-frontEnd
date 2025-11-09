"use client";
import { useState } from "react";
import styles from "./FormOwner.module.css";
import UploadImagem from "../uploadImg/UploadImage";
import { useSpeechSettings } from "../../context/SpeechContext";
import Cardapio from "../cardapio/Cardapio";
import Acessibilidades from "../accessibility/Acessibilidades";

export default function FormOwner({ formData, setFormData, setFoto }) {
  const [telefone, setTelefone] = useState("");
 const { speakText, handleFocusWithKeyboard } = useSpeechSettings();
  const handleTelefoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setTelefone(onlyNums);
    setFormData((prev) => ({ ...prev, telefone: onlyNums }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      className={styles.formContainer}
      role="group"
      aria-label="Formulário de cadastro de anunciante"
    >
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeDoRestaurante"
            className={styles.label}
            onClick={() =>
              speakText("Nome do restaurante. Digite o nome do seu restaurante")
            }
            onMouseEnter={() =>
              speakText("Nome do restaurante. Digite o nome do seu restaurante")
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "Nome do restaurante. Digite o nome do seu restaurante"
              )
            }
          >
            Nome do Restaurante
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() =>
              speakText("Nome do restaurante. Digite o nome do seu restaurante")
            }
            aria-label="Ouvir descrição do campo Nome do Restaurante"
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeDoRestaurante"
          type="text"
          placeholder="Nome do seu restaurante"
          className={styles.inputField}
          value={formData.nomeDoRestaurante || ""}
          onChange={handleChange}
          onFocus={() =>
            handleFocusWithKeyboard(
              "Nome do restaurante. Digite o nome do seu restaurante"
            )
          }
          onMouseEnter={() =>
            speakText("Nome do restaurante. Digite o nome do seu restaurante")
          }
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeDoAnunciante"
            className={styles.label}
            onClick={() =>
              speakText(
                "Seu nome. Digite o nome do responsável pelo restaurante"
              )
            }
            onMouseEnter={() =>
              speakText(
                "Seu nome. Digite o nome do responsável pelo restaurante"
              )
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "Seu nome. Digite o nome do responsável pelo restaurante"
              )
            }
          >
            Seu Nome (Responsável)
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() =>
              speakText(
                "Seu nome. Digite o nome do responsável pelo restaurante"
              )
            }
            aria-label="Ouvir descrição do campo Nome do Anunciante"
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeDoAnunciante"
          type="text"
          placeholder="Seu nome completo"
          className={styles.inputField}
          value={formData.nomeDoAnunciante || ""}
          onChange={handleChange}
          onFocus={() =>
            handleFocusWithKeyboard(
              "Seu nome. Digite o nome do responsável pelo restaurante"
            )
          }
          onMouseEnter={() =>
            speakText("Seu nome. Digite o nome do responsável pelo restaurante")
          }
        />
      </div>

      <Cardapio formData={formData} setFormData={setFormData} />

          <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="descricao"
            className={styles.label}
            onClick={() =>
              speakText(
                "Descrição do Restaurante. Descreva seu restaurante. Mínimo 100 caracteres."
              )
            }
            onMouseEnter={() =>
              speakText(
                "Descrição do Restaurante. Descreva seu restaurante. Mínimo 100 caracteres."
              )
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "Descrição do Restaurante. Descreva seu restaurante e os recursos de acessibilidade. Mínimo 100 caracteres."
              )
            }
          >
            Descrição do Restaurante (100-500 caracteres)
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() =>
              speakText(
                "Descrição do Restaurante. Descreva seu restaurante e os recursos de acessibilidade. Mínimo 100 caracteres."
              )
            }
            aria-label="Ouvir descrição do campo Descrição do Restaurante"
          >
            🗣️
          </button>
        </div>
        <textarea
          id="descricao"
          placeholder="Descreva seu restaurante, focando nos detalhes de acessibilidade (mínimo 100 caracteres)"
          className={styles.inputField} 
          rows="5"
          minLength="100" 
          maxLength="500" 
          value={formData.descricao || ""}
          onChange={handleChange}
          onFocus={() =>
            handleFocusWithKeyboard(
              "Descrição do Restaurante. Descreva seu restaurante. Mínimo 100 caracteres."
            )
          }
          onMouseEnter={() =>
            speakText(
              "Descrição do Restaurante. Descreva seu restaurante. Mínimo 100 caracteres."
            )
          }
        />
      </div>

      <Acessibilidades formData={formData} setFormData={setFormData} />

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="email"
            className={styles.label}
            onClick={() =>
              speakText("E-mail de contato. Digite seu melhor e-mail")
            }
            onMouseEnter={() =>
              speakText("E-mail de contato. Digite seu melhor e-mail")
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "E-mail de contato. Digite seu melhor e-mail"
              )
            }
          >
            E-mail de Contato
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() =>
              speakText("E-mail de contato. Digite seu melhor e-mail")
            }
            aria-label="Ouvir descrição do campo E-mail de Contato"
          >
            🗣️
          </button>
        </div>
        <input
          id="email"
          type="email"
          placeholder="contato@restaurante.com"
          className={styles.inputField}
          value={formData.email || ""}
          onChange={handleChange}
          onFocus={() =>
            handleFocusWithKeyboard(
              "E-mail de contato. Digite seu melhor e-mail"
            )
          }
          onMouseEnter={() =>
            speakText("E-mail de contato. Digite seu melhor e-mail")
          }
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="telefone"
            className={styles.label}
            onClick={() => speakText("Telefone. Digite seu telefone com DDD")}
            onMouseEnter={() =>
              speakText("Telefone. Digite seu telefone com DDD")
            }
            onFocus={() =>
              handleFocusWithKeyboard("Telefone. Digite seu telefone com DDD")
            }
          >
            Telefone
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => speakText("Telefone. Digite seu telefone com DDD")}
            aria-label="Ouvir descrição do campo Telefone"
          >
            🗣️
          </button>
        </div>
        <input
          id="telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={telefone}
          onChange={handleTelefoneChange}
          className={styles.inputField}
          maxLength={11}
          onFocus={() =>
            handleFocusWithKeyboard("Telefone. Digite seu telefone com DDD")
          }
          onMouseEnter={() =>
            speakText("Telefone. Digite seu telefone com DDD")
          }
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="senha"
            className={styles.label}
            onClick={() => speakText("Senha. Crie uma senha forte")}
            onMouseEnter={() => speakText("Senha. Crie uma senha forte")}
            onFocus={() =>
              handleFocusWithKeyboard("Senha. Crie uma senha forte")
            }
          >
            Senha
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => speakText("Senha. Crie uma senha forte")}
            aria-label="Ouvir descrição do campo Senha"
          >
            🗣️
          </button>
        </div>
        <input
          id="senha"
          type="password"
          placeholder="Crie uma senha forte"
          className={styles.inputField}
          value={formData.senha || ""}
          onChange={handleChange}
          onFocus={() => handleFocusWithKeyboard("Senha. Crie uma senha forte")}
          onMouseEnter={() => speakText("Senha. Crie uma senha forte")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="confirmarSenhaAnunciante"
            className={styles.label}
            onClick={() =>
              speakText("Confirmar senha. Repita a senha para confirmar")
            }
            onMouseEnter={() =>
              speakText("Confirmar senha. Repita a senha para confirmar")
            }
            onFocus={() =>
              handleFocusWithKeyboard(
                "Confirmar senha. Repita a senha para confirmar"
              )
            }
          >
            Confirmar Senha
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() =>
              speakText("Confirmar senha. Repita a senha para confirmar")
            }
            aria-label="Ouvir descrição do campo Confirmar Senha"
          >
            🗣️
          </button>
        </div>
        <input
          id="confirmarSenhaAnunciante"
          type="password"
          placeholder="Repita a senha"
          className={styles.inputField}
          value={formData.confirmarSenhaAnunciante || ""}
          onChange={handleChange}
          onFocus={() =>
            handleFocusWithKeyboard(
              "Confirmar senha. Repita a senha para confirmar"
            )
          }
          onMouseEnter={() =>
            speakText("Confirmar senha. Repita a senha para confirmar")
          }
        />
      </div>
      <UploadImagem onFileSelect={setFoto} />
    </div>
  );
}

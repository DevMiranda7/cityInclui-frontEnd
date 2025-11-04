"use client";
import UploadImagem from "../uploadImg/UploadImage";
import { useState } from "react";
import styles from "./FormOwner.module.css";
import { speakText, handleFocusWithKeyboard } from "../../utils/useSpeech";

export default function FormularioAnunciante() {
  const [telefone, setTelefone] = useState("");

  const handleTelefoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setTelefone(onlyNums);
  };

  return (
    <div
      className={styles.formContainer}
      role="form"
      aria-label="Formulário de cadastro de anunciante"
    >
      {/* Nome do Restaurante */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeRestaurante"
            className={styles.label}
            onClick={() => speakText("Nome do restaurante. Digite o nome do seu restaurante")}
            onMouseEnter={() => speakText("Nome do restaurante. Digite o nome do seu restaurante")}
            onFocus={() => handleFocusWithKeyboard("Nome do restaurante. Digite o nome do seu restaurante")}
          >
            Nome do Restaurante
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => speakText("Nome do restaurante. Digite o nome do seu restaurante")}
            aria-label="Ouvir descrição do campo Nome do Restaurante"
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeRestaurante"
          type="text"
          placeholder="Nome do seu restaurante"
          className={styles.inputField}
          onFocus={() => handleFocusWithKeyboard("Nome do restaurante. Digite o nome do seu restaurante")}
          onMouseEnter={() => speakText("Nome do restaurante. Digite o nome do seu restaurante")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="nomeAnunciante"
            className={styles.label}
            onClick={() => speakText("Seu nome. Digite o nome do responsável pelo restaurante")}
            onMouseEnter={() => speakText("Seu nome. Digite o nome do responsável pelo restaurante")}
            onFocus={() => handleFocusWithKeyboard("Seu nome. Digite o nome do responsável pelo restaurante")}
          >
            Seu Nome (Responsável)
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => speakText("Seu nome. Digite o nome do responsável pelo restaurante")}
            aria-label="Ouvir descrição do campo Nome do Anunciante"
          >
            🗣️
          </button>
        </div>
        <input
          id="nomeAnunciante"
          type="text"
          placeholder="Seu nome completo"
          className={styles.inputField}
          onFocus={() => handleFocusWithKeyboard("Seu nome. Digite o nome do responsável pelo restaurante")}
          onMouseEnter={() => speakText("Seu nome. Digite o nome do responsável pelo restaurante")}
        />
      </div>

      <div className={styles.inputGroup}>
  <div className={styles.labelContainer}>
    <label
      htmlFor="cardapio"
      className={styles.label}
      onClick={() => speakText("Tipo de cardápio. Selecione a culinária principal")}
      onMouseEnter={() => speakText("Tipo de cardápio. Selecione a culinária principal")}
      onFocus={() => handleFocusWithKeyboard("Tipo de cardápio. Selecione a culinária principal")}
    >
      Tipo de Cardápio (Culinária)
    </label>
    <button
      type="button"
      className={styles.speakButton}
      onClick={() => speakText("Tipo de cardápio. Selecione a culinária principal")}
      aria-label="Ouvir descrição do campo Tipo de Cardápio"
    >
      🗣️
    </button>
    </div>

    <select
      id="cardapio"
      className={styles.inputField}
      defaultValue=""
      onFocus={() => handleFocusWithKeyboard("Tipo de cardápio. Selecione a culinária principal")}
      onMouseEnter={() => speakText("Tipo de cardápio. Selecione a culinária principal")}
      onChange={(e) =>
        speakText(`Você selecionou: ${e.target.options[e.target.selectedIndex].text}`)
      }
    >
      <option value="" disabled>
        Selecione a culinária principal
      </option>
      <option value="japones">Japonês</option>
      <option value="italiano">Italiano</option>
      <option value="caseiro">Caseiro</option>
      <option value="vegano">Vegano</option>
      <option value="fast-food">Fast Food</option>
      <option value="brasileiro">Brasileiro</option>
      <option value="pizzaria">Pizzaria</option>
      <option value="outro">Outro</option>
    </select>
  </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="emailAnunciante"
            className={styles.label}
            onClick={() => speakText("E-mail de contato. Digite seu melhor e-mail")}
            onMouseEnter={() => speakText("E-mail de contato. Digite seu melhor e-mail")}
            onFocus={() => handleFocusWithKeyboard("E-mail de contato. Digite seu melhor e-mail")}
          >
            E-mail de Contato
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => speakText("E-mail de contato. Digite seu melhor e-mail")}
            aria-label="Ouvir descrição do campo E-mail de Contato"
          >
            🗣️
          </button>
        </div>
        <input
          id="emailAnunciante"
          type="email"
          placeholder="contato@restaurante.com"
          className={styles.inputField}
          onFocus={() => handleFocusWithKeyboard("E-mail de contato. Digite seu melhor e-mail")}
          onMouseEnter={() => speakText("E-mail de contato. Digite seu melhor e-mail")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="telefoneAnunciante"
            className={styles.label}
            onClick={() => speakText("Telefone. Digite seu telefone com DDD")}
            onMouseEnter={() => speakText("Telefone. Digite seu telefone com DDD")}
            onFocus={() => handleFocusWithKeyboard("Telefone. Digite seu telefone com DDD")}
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
          id="telefoneAnunciante"
          type="tel"
          placeholder="(00) 00000-0000"
          onChange={handleTelefoneChange}
          value={telefone}
          className={styles.inputField}
          maxLength={11}
          onFocus={() => handleFocusWithKeyboard("Telefone. Digite seu telefone com DDD")}
          onMouseEnter={() => speakText("Telefone. Digite seu telefone com DDD")}
        />
      </div>

      {/* Senha */}
      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="senhaAnunciante"
            className={styles.label}
            onClick={() => speakText("Senha. Crie uma senha forte")}
            onMouseEnter={() => speakText("Senha. Crie uma senha forte")}
            onFocus={() => handleFocusWithKeyboard("Senha. Crie uma senha forte")}
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
          id="senhaAnunciante"
          type="password"
          placeholder="Crie uma senha forte"
          className={styles.inputField}
          onFocus={() => handleFocusWithKeyboard("Senha. Crie uma senha forte")}
          onMouseEnter={() => speakText("Senha. Crie uma senha forte")}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelContainer}>
          <label
            htmlFor="confirmarSenhaAnunciante"
            className={styles.label}
            onClick={() => speakText("Confirmar senha. Repita a senha para confirmar")}
            onMouseEnter={() => speakText("Confirmar senha. Repita a senha para confirmar")}
            onFocus={() => handleFocusWithKeyboard("Confirmar senha. Repita a senha para confirmar")}
          >
            Confirmar Senha
          </label>
          <button
            type="button"
            className={styles.speakButton}
            onClick={() => speakText("Confirmar senha. Repita a senha para confirmar")}
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
          onFocus={() => handleFocusWithKeyboard("Confirmar senha. Repita a senha para confirmar")}
          onMouseEnter={() => speakText("Confirmar senha. Repita a senha para confirmar")}
        />
      </div>

      <UploadImagem />
    </div>
  );
}

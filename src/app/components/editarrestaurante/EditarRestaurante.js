"use client";
import { useState, useEffect } from "react";
import styles from "./EditarRestaurante.module.css";
import UploadImagem from "../uploadImg/UploadImage";
import { useSpeechSettings } from "../../context/SpeechContext";
import Cardapio from "../cardapio/Cardapio";
import Acessibilidades from "../accessibility/Acessibilidades";

export default function EditarRestaurante({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({});
  const [telefone, setTelefone] = useState("");
  const { speakText, handleFocusWithKeyboard } = useSpeechSettings();

  // Atualiza o formData quando initialData mudar
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setTelefone(initialData.telefone || "");
    }
  }, [initialData]);

  const handleTelefoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setTelefone(onlyNums);
    setFormData((prev) => ({ ...prev, telefone: onlyNums }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, foto: file }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div
        role="group"
        aria-label="Formulário de edição de informações do restaurante"
      >
        {/* Primeira linha com grid */}
        <div className={styles.gridRow}>
          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label
                htmlFor="nomeDoRestaurante"
                className={styles.label}
                onClick={() =>
                  speakText("Nome do restaurante. Edite o nome do seu restaurante")
                }
                onMouseEnter={() =>
                  speakText("Nome do restaurante. Edite o nome do seu restaurante")
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "Nome do restaurante. Edite o nome do seu restaurante"
                  )
                }
              >
                Nome do Restaurante
              </label>
              <button
                type="button"
                className={styles.speakButton}
                onClick={() =>
                  speakText("Nome do restaurante. Edite o nome do seu restaurante")
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
                  "Nome do restaurante. Edite o nome do seu restaurante"
                )
              }
              onMouseEnter={() =>
                speakText("Nome do restaurante. Edite o nome do seu restaurante")
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
                    "Seu nome. Edite o nome do responsável pelo restaurante"
                  )
                }
                onMouseEnter={() =>
                  speakText(
                    "Seu nome. Edite o nome do responsável pelo restaurante"
                  )
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "Seu nome. Edite o nome do responsável pelo restaurante"
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
                    "Seu nome. Edite o nome do responsável pelo restaurante"
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
                  "Seu nome. Edite o nome do responsável pelo restaurante"
                )
              }
              onMouseEnter={() =>
                speakText("Seu nome. Edite o nome do responsável pelo restaurante")
              }
            />
          </div>
        </div>

        <Cardapio formData={formData} setFormData={setFormData} />

        <div className={styles.inputGroup}>
          <div className={styles.labelContainer}>
            <label
              htmlFor="descricao"
              className={styles.label}
              onClick={() =>
                speakText(
                  "Descrição do Restaurante. Edite a descrição do seu restaurante. Mínimo 100 caracteres."
                )
              }
              onMouseEnter={() =>
                speakText(
                  "Descrição do Restaurante. Edite a descrição do seu restaurante. Mínimo 100 caracteres."
                )
              }
              onFocus={() =>
                handleFocusWithKeyboard(
                  "Descrição do Restaurante. Edite a descrição do seu restaurante e os recursos de acessibilidade. Mínimo 100 caracteres."
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
                  "Descrição do Restaurante. Edite a descrição do seu restaurante e os recursos de acessibilidade. Mínimo 100 caracteres."
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
            className={`${styles.inputField} ${styles.textareaField}`}
            rows="5"
            minLength="100" 
            maxLength="500" 
            value={formData.descricao || ""}
            onChange={handleChange}
            onFocus={() =>
              handleFocusWithKeyboard(
                "Descrição do Restaurante. Edite a descrição do seu restaurante. Mínimo 100 caracteres."
              )
            }
            onMouseEnter={() =>
              speakText(
                "Descrição do Restaurante. Edite a descrição do seu restaurante. Mínimo 100 caracteres."
              )
            }
          />
        </div>

        <Acessibilidades formData={formData} setFormData={setFormData} />

        {/* Segunda linha com grid para campos de contato */}
        <div className={styles.gridRow}>
          {/* Campo NÃO editável - Email */}
          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label
                htmlFor="email"
                className={styles.label}
                onClick={() =>
                  speakText("E-mail de contato. Campo não editável")
                }
                onMouseEnter={() =>
                  speakText("E-mail de contato. Campo não editável")
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "E-mail de contato. Campo não editável"
                  )
                }
              >
                E-mail de Contato (Não editável)
              </label>
              <button
                type="button"
                className={styles.speakButton}
                onClick={() =>
                  speakText("E-mail de contato. Campo não editável")
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
              className={`${styles.inputField} ${styles.nonEditable}`}
              value={formData.email || ""}
              readOnly
              disabled
              onFocus={() =>
                handleFocusWithKeyboard(
                  "E-mail de contato. Campo não editável"
                )
              }
              onMouseEnter={() =>
                speakText("E-mail de contato. Campo não editável")
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label
                htmlFor="telefone"
                className={styles.label}
                onClick={() => speakText("Telefone. Edite seu telefone com DDD")}
                onMouseEnter={() =>
                  speakText("Telefone. Edite seu telefone com DDD")
                }
                onFocus={() =>
                  handleFocusWithKeyboard("Telefone. Edite seu telefone com DDD")
                }
              >
                Telefone
              </label>
              <button
                type="button"
                className={styles.speakButton}
                onClick={() => speakText("Telefone. Edite seu telefone com DDD")}
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
                handleFocusWithKeyboard("Telefone. Edite seu telefone com DDD")
              }
              onMouseEnter={() =>
                speakText("Telefone. Edite seu telefone com DDD")
              }
            />
          </div>
        </div>

        {/* Terceira linha com grid para senhas */}
        <div className={styles.gridRow}>
          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label
                htmlFor="novaSenha"
                className={styles.label}
                onClick={() => speakText("Nova senha. Deixe em branco para manter a atual")}
                onMouseEnter={() => speakText("Nova senha. Deixe em branco para manter a atual")}
                onFocus={() =>
                  handleFocusWithKeyboard("Nova senha. Deixe em branco para manter a atual")
                }
              >
                Nova Senha (Opcional)
              </label>
              <button
                type="button"
                className={styles.speakButton}
                onClick={() => speakText("Nova senha. Deixe em branco para manter a atual")}
                aria-label="Ouvir descrição do campo Nova Senha"
              >
                🗣️
              </button>
            </div>
            <input
              id="novaSenha"
              type="password"
              placeholder="Deixe em branco para manter a senha atual"
              className={styles.inputField}
              value={formData.novaSenha || ""}
              onChange={handleChange}
              onFocus={() => handleFocusWithKeyboard("Nova senha. Deixe em branco para manter a atual")}
              onMouseEnter={() => speakText("Nova senha. Deixe em branco para manter a atual")}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelContainer}>
              <label
                htmlFor="confirmarNovaSenha"
                className={styles.label}
                onClick={() =>
                  speakText("Confirmar nova senha. Repita a nova senha")
                }
                onMouseEnter={() =>
                  speakText("Confirmar nova senha. Repita a nova senha")
                }
                onFocus={() =>
                  handleFocusWithKeyboard(
                    "Confirmar nova senha. Repita a nova senha"
                  )
                }
              >
                Confirmar Nova Senha
              </label>
              <button
                type="button"
                className={styles.speakButton}
                onClick={() =>
                  speakText("Confirmar nova senha. Repita a nova senha")
                }
                aria-label="Ouvir descrição do campo Confirmar Nova Senha"
              >
                🗣️
              </button>
            </div>
            <input
              id="confirmarNovaSenha"
              type="password"
              placeholder="Repita a nova senha"
              className={styles.inputField}
              value={formData.confirmarNovaSenha || ""}
              onChange={handleChange}
              onFocus={() =>
                handleFocusWithKeyboard(
                  "Confirmar nova senha. Repita a nova senha"
                )
              }
              onMouseEnter={() =>
                speakText("Confirmar nova senha. Repita a nova senha")
              }
            />
          </div>
        </div>

        <UploadImagem onFileSelect={handleFileSelect} initialImage={formData.foto} />

        {/* Botões de ação */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            onFocus={() => handleFocusWithKeyboard("Botão cancelar edição")}
            onMouseEnter={() => speakText("Cancelar edição")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            onFocus={() => handleFocusWithKeyboard("Botão salvar alterações")}
            onMouseEnter={() => speakText("Salvar alterações")}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </form>
  );
}
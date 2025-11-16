"use client";

import React, { useState } from "react";
import styles from "./TelaLogin.module.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { login } from '../../../lib/api/authService';
import ModalMensagem from "../../components/modal/ModalMensagem"; // ajuste o path conforme necessário

export default function TelaLogin() {
  const [userType, setUserType] = useState("CLIENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setModalMessage("Preencha todos os campos para continuar.");
      setModalOpen(true);
      setLoading(false);
      return;
    }

    try {
      const data = await login(email, password, userType);

      Cookies.set('token', data.token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      if (userType === "CLIENT") {
        router.push('/');
      } else {
        router.push('/dashboard-owner');
      }

    } catch (err) {
      // Mostra o erro no modal
      setModalMessage(err.message || "Erro ao fazer login.");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* LADO ESQUERDO */}
      <div className={styles.loginLeft}>
        <img
          src="https://i.ibb.co/p6nzSB6p/imagem-2025-10-29-224844608.png"
          alt="CityInclui App"
          className={styles.phoneImage}
        />
      </div>

      {/* LADO DIREITO */}
      <div className={styles.loginRight}>
        <div className={styles.loginCard}>
          <Link href="/" className={styles.logo}>
            City<span>Inclui</span>
          </Link>

          <div className={styles.userTypeSelector}>
            <div className={styles.userTypeOption}>
              <input
                type="radio"
                id="cliente"
                name="tipo"
                checked={userType === "CLIENT"}
                onChange={() => setUserType("CLIENT")}
              />
              <label htmlFor="cliente">Cliente</label>
            </div>
            <div className={styles.userTypeOption}>
              <input
                type="radio"
                id="owner"
                name="tipo"
                checked={userType === "OWNER"}
                onChange={() => setUserType("OWNER")}
              />
              <label htmlFor="owner">Restaurante</label>
            </div>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className={styles.forgotPassword}>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <div className={styles.registerCard}>
          <p className={styles.registerLink}>
            Não tem uma conta? <Link href="/register">Criar agora</Link>
          </p>
        </div>
      </div>

      {/* Modal de erro/sucesso */}
      <ModalMensagem
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="erro"
        message={modalMessage}
      />
    </div>
  );
}

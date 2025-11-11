"use client";
import styles from "./TelaLogin.module.css";
import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Lado Esquerdo - Imagem do Header */}
      <div className={styles.loginLeft}>
        <img 
          src="https://i.ibb.co/p6nzSB6p/imagem-2025-10-29-224844608.png"
          alt="CityInclui App" 
          className={styles.phoneImage}
        />
      </div>

      {/* Lado Direito - Login */}
      <div className={styles.loginRight}>
        <div className={styles.loginCard}>
          <Link href="/" className={styles.logo}>
            City<span>Inclui</span>
          </Link>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Entrar
            </button>

            <div className={styles.forgotPassword}>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Esqueceu a senha?
              </Link>
            </div>
          </form>
        </div>

        <div className={styles.registerCard}>
          <div className={styles.registerLink}>
            Não tem uma conta?{' '}
            <Link href="/register">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
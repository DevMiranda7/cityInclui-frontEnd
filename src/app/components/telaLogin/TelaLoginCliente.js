"use client";
import styles from "./TelaLogin.module.css"; // Reutiliza o mesmo CSS
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { login } from '../../lib/api/authService'; // Importa a função unificada

const TelaLoginCliente = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { email, senha } = formData;

    try {
      // Chama a API unificada com o tipo "CLIENT"
      const data = await login(email, senha, "CLIENT");

      // Salva o token no cookie
      Cookies.set('token', data.token, { 
        expires: 1, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict' 
      });

      // Redireciona para a Home
      router.push('/');

    } catch (err) {
      // Mostra o erro (ex: "E-mail ou senha inválidos")
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <img 
          src="https://i.ibb.co/p6nzSB6p/imagem-2025-10-29-224844608.png"
          alt="CityInclui App" 
          className={styles.phoneImage}
        />
      </div>

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
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
            
            {error && <p className={styles.errorMessage}>{error}</p>}

            <button 
              type="submit" 
              className={styles.loginButton} 
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
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

export default TelaLoginCliente;
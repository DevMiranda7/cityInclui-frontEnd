"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "@/src/lib/api/ownerService"; // Importe o service

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ Novo estado global para ID
  const [loadingUser, setLoadingUser] = useState(true);

  const loginSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem("auth_token", newToken);
    processToken(newToken); // Extraímos a lógica para função
  };

  const processToken = async (tokenStr) => {
    try {
      const decoded = jwtDecode(tokenStr);
      const roles = decoded.roles || [];
      
      let type = null;
      if (roles.includes("ROLE_CLIENT") || roles.includes("CLIENT")) type = "CLIENT";
      else if (roles.includes("ROLE_OWNER") || roles.includes("OWNER")) type = "OWNER";
      
      setUserType(type);

      // ✅ LÓGICA CENTRALIZADA: Se for Owner, buscamos o ID aqui
      if (type === "OWNER") {
        try {
          // Verifica se já temos o ID para não buscar a toa
          const profile = await getProfile(); // Seu fetch existente
          if (profile?.id) setUserId(profile.id);
        } catch (err) {
          console.error("Erro ao buscar ID no AuthContext", err);
        }
      }

    } catch (err) {
      console.error("Erro token", err);
      setUserType(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
    setUserId(null); // Limpa ID
    localStorage.removeItem("auth_token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
      processToken(savedToken).finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      // ✅ Expomos userId para toda a aplicação
      value={{ token, userType, userId, loadingUser, loginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
"use client";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AlternadorUsuario from "./components/AlternadorUsuario";
import FormularioCliente from "./components/FormularioCliente";
import FormularioAnunciante from "./components/FormularioAnunciante";

export default function RegistroPage() {
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-8">
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
            Você é:
          </h2>

          <AlternadorUsuario
            tipoUsuario={tipoUsuario}
            setTipoUsuario={setTipoUsuario}
          />

          <form className="space-y-4">
            {tipoUsuario === "cliente" ? (
              <FormularioCliente />
            ) : (
              <FormularioAnunciante />
            )}
            <button type="submit" className="btn-enviar">
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

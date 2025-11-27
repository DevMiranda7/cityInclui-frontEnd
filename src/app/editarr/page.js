import { Metadata } from "next";
import GerenciadorPerfil from "./GerenciadorPerfil";

export const metadata = {
  title: "Editar Perfil | CityInclui",
  description:
    "Atualize seus dados pessoais ou informações do seu estabelecimento.",
};

export default function EditarPage() {
  return (
    <main>
      <GerenciadorPerfil />
    </main>
  );
}

import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { SpeechProvider } from "./context/SpeechContext";
import { AuthProvider } from "./context/AuthContext"; 

export const metadata = {
  title: "CityInclui",
  description: "Plataforma acessível para todos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider> {/* ✅ Aqui */}
          <SpeechProvider>
            <Header />
            {children}
            <Footer />
          </SpeechProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { SpeechProvider } from "./context/SpeechContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <SpeechProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SpeechProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { SpeechProvider } from "./context/SpeechContext";

export const metadata = {
  title: "CityInclui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <SpeechProvider>{children}</SpeechProvider>
      </body>
    </html>
  );
}

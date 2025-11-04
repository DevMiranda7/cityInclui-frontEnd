import "./globals.css";

export const metadata = {
  title: "CityInclui",
  description: "Encontrando restaurantes acessíveis para todos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CityInclui</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

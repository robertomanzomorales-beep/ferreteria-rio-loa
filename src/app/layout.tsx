import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ferretería Río Loa | Calama",
  description:
    "Ferretería Río Loa en Calama. Productos y soluciones para empresas, contratistas y clientes particulares. Solicita información o cotización.",

  icons: {
    icon: [
      {
        url: "/ico-ferreteria-rio-loa.webp",
        type: "image/webp",
        sizes: "512x512",
      },
    ],
    shortcut: "/ico-ferreteria-rio-loa.webp",
    apple: "/ico-ferreteria-rio-loa.webp",
  },

  openGraph: {
    title: "Ferretería Río Loa | Calama",
    description:
      "Productos y soluciones de ferretería para empresas, contratistas y clientes particulares en Calama.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
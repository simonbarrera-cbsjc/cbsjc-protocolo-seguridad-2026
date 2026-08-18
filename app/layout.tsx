import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Protocolos Institucionales de Seguridad 2026 - CBSJC S.A.S.",
  description: "Plataforma interactiva para la socialización, entrenamiento y acreditación en Protocolos Institucionales de Seguridad (SJB-RGD003 Versión 2) del Colegio Bilingüe San José Campestre para Docentes y Directivos.",
  keywords: ["CBSJC", "Protocolos de Seguridad", "Custodia Escolar", "SJB-RGD003", "Pickup SJ", "SEED BLOOM", "Docentes 2026"],
  authors: [{ name: "CBSJC S.A.S. — Colegio Bilingüe San José Campestre" }],
  icons: {
    icon: "/logo-cbsjc.png",
    shortcut: "/logo-cbsjc.png",
    apple: "/logo-cbsjc.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-bg-soft text-text-dark selection:bg-accent/25 selection:text-primary">
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

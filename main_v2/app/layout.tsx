import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "@/components/ui/Navbar";
import ChangeTheme from "@/components/ChangeTheme";
import NavbarProvider from "@/components/providers/navbar-provider";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Escuela De Educación Técnica N° 3117 Mto. Daniel O. Reyes",
    default: "Escuela De Educación Técnica N° 3117 Mto. Daniel O. Reyes"
  },
  description: "En un mundo cada vez más interconectado y dependiente de la tecnología, la educación no puede quedarse atrás. Por ello, presentamos con orgullo nuestro proyecto de Campus Virtual, una plataforma innovadora diseñada para transformar la experiencia educativa en nuestro colegio. Este proyecto, desarrollado por un equipo dedicado de seis estudiantes apasionados por la tecnología y la educación, tiene como objetivo principal brindar una solución integral para el aprendizaje y la interacción escolar en un entorno digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <ChangeTheme>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavbarProvider>
            <Navbar />
          </NavbarProvider>

          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer />
        </body>
      </ChangeTheme>
    </ViewTransitions>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ChangeThemeProvider from "@/components/providers/change-theme-provider";
import ChangeThemeHTML from "@/components/ChangeTheme";
import MainLayout from "@/components/ui/layouts/main-layout";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s - E.E.T 3117',
    default: 'Plataforma - E.E.T 3117'
  },
  description: "En un mundo cada vez más interconectado y dependiente de la tecnología, la educación no puede quedarse atrás. Por ello, presentamos con orgullo nuestro proyecto de Campus Virtual, una plataforma innovadora diseñada para transformar la experiencia educativa en nuestro colegio. Este proyecto, desarrollado por un equipo dedicado de seis estudiantes apasionados por la tecnología y la educación, tiene como objetivo principal brindar una solución integral para el aprendizaje y la interacción escolar en un entorno digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChangeThemeProvider>
      <ChangeThemeHTML>
        <SessionProvider>
          <body className={roboto.className}>
            <MainLayout>
              {children}
            </MainLayout>
          </body>
        </SessionProvider>
      </ChangeThemeHTML>
    </ChangeThemeProvider>
  );
}

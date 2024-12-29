import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ChangeThemeHTML from "@/components/ChangeTheme";
import MainLayout from "@/components/ui/layouts/main-layout";
import { SessionProvider } from "next-auth/react";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { auth } from "@/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s - E.E.T 3117',
    default: 'Plataforma - E.E.T 3117'
  },
  description: "En un mundo cada vez más interconectado y dependiente de la tecnología, la educación no puede quedarse atrás. Por ello, presentamos con orgullo nuestro proyecto de Campus Virtual, una plataforma innovadora diseñada para transformar la experiencia educativa en nuestro colegio. Este proyecto, desarrollado por un equipo dedicado de seis estudiantes apasionados por la tecnología y la educación, tiene como objetivo principal brindar una solución integral para el aprendizaje y la interacción escolar en un entorno digital.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <ChangeThemeHTML>
      <SessionProvider>
        <body className={geistSans.className}>
          <Suspense>
            <MainLayout session={session}>
              <Loading />
              {children}
            </MainLayout>
          </Suspense>
        </body>
      </SessionProvider>
    </ChangeThemeHTML>
  );
}

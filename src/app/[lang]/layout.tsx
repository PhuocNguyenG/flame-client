import NavBar from "@/components/header/nav";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { NextAuthProvider } from "@/provider";
import { Locale } from "@/lib/i18n/setting";
import Footer from "@/components/footer/footer";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Flame",
  description: "Flame Agricultural by PhuocLinh",
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang}>
      <Head>{/* <link rel="icon" href="/favicon.ico" /> */}</Head>
      <body className={inter.className}>
        <NextAuthProvider>
          <NextTopLoader
            color="#1A0004ED"
            showSpinner={true}
            initialPosition={0.3}
          />
          <NavBar />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}

import NavBar from "@/components/header/nav";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import ReduxProvider, { NextAuthProvider } from "@/provider";
import { Locale } from "@/lib/i18n/setting";
import Footer from "@/components/footer/footer";
import NextTopLoader from "nextjs-toploader";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Flame",
  description: "Flame Agricultural by PhuocLinh",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  //const pathname = headers().get("x-invoke-path") || "";

  return (
    <html lang={params.lang}>
      <Head>{/* <link rel="icon" href="/favicon.ico" /> */}</Head>
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider>
            <NextTopLoader
              color="#1A0004ED"
              initialPosition={0.3}
            />
            <NavBar>
              <main>{children}</main>
              <Toaster />
              <Footer />
            </NavBar>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import NavBar from "@/components/header/nav";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider, { NextAuthProvider } from "@/provider";
import Footer from "@/components/footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { FloatButton } from "@/components/button/group-float-button";
import { Locale } from "@/lib/i18n/setting";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Flame",
  description: "Flame Agricultural by PhuocLinh",
};

export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;

  params: { lang: Locale };
}) {

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider>
            <NextTopLoader color="#F7E509" initialPosition={0.3} showSpinner={false} />
            <NavBar lang={lang}>
              <main>{children}</main>
              <Toaster />
              <FloatButton />
              <Footer lang={lang} />
            </NavBar>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

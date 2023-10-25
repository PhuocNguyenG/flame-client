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

export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "en" }];
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title:
      lang === "en"
        ? "Flame Agricultural | Agricultural products, import and export"
        : "Nông sản Flame | Sản phẩm nông sản và xuất nhập khẩu",
    description:
      lang === "en"
        ? "Flame agricultural is a brand created by PHUOC LINH Import Export Co., Ltd., specializing in providing agricultural products domestically and internationally."
        : "Nông sản Flame là thương hiệu được tạo bởi Công ty TNHH Xuất Nhập Khẩu PHƯỚC LINH, chuyên cung cấp các mặt hàng về nông sản trong và ngoài nước.",
    keywords: [
      "nông sản flame",
      "nong san",
      "nong san flame",
      "flame",
      "nong san phuoc linh",
      "flame agricultural"
    ],
    openGraph: {
      title:
        lang === "en"
          ? "Flame Agricultural | Agricultural products, import and export"
          : "Nông sản Flame | Sản phẩm nông sản và xuất nhập khẩu",
      images: "https://cdn.flameagricultural.com/Flame%20logo-1.png",
      url:
        lang === "en"
          ? "https://flameagricultural.com/en"
          : "https://flameagricultural.com",
      siteName: lang === "en" ? "Flame agricultural" : "Nông sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
      type: "website",
    },
  };
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
            <NextTopLoader
              color="#F7E509"
              initialPosition={0.3}
              showSpinner={false}
            />
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

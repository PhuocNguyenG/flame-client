import dynamic from "next/dynamic";
import NavBar from "@/components/header/nav";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProvider from "@/provider";
const Footer = dynamic(() => import("@/components/footer"));
import NextTopLoader from "nextjs-toploader";
const Toaster = dynamic(() => import("@/components/ui/toaster"));
const FloatButton = dynamic(
  () => import("@/components/button/group-float-button")
);
import { Locale } from "@/lib/i18n/setting";
import ScriptConfig from "@/script-config";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "en" }];
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  return {
    title: lang === "en" ? "Flame Agricultural" : "Nông sản Flame",
    description:
      lang === "en"
        ? "Flame agricultural | Specializing in providing domestic and international agricultural products. Flame brand is created by PHUOC LINH Import Export Company"
        : "Nông sản Flame | Chuyên cung cấp các sản phẩm về nông sản, xuất nhập khẩu trong và ngoài nước. Đồng thời là thương hiệu được tạo bởi Công ty TNHH Xuất Nhập Khẩu PHƯỚC LINH ",
    keywords: [
      "Nông sản flame",
      "nong san",
      "nong san flame",
      "flame",
      "nong san phuoc linh",
      "flame agricultural",
    ],
    metadataBase: new URL("https://flameagricultural.com"),
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title: lang === "en" ? "Flame Agricultural" : "Nông sản Flame",
      images: "https://cdn.flameagricultural.com/flame-simple.png",
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
    <>
      <head>
        <ScriptConfig />
      </head>
      <html lang={lang}>
        <body className={inter.className}>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MT9NB5T9"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
            }}
          />
          <RootProvider>
            <NextTopLoader
              color="#F89B06"
              initialPosition={0.3}
              showSpinner={false}
            />
            <NavBar lang={lang}>
              <main>{children}</main>
              <Toaster />
              <FloatButton />
              <Footer lang={lang} />
            </NavBar>
          </RootProvider>
        </body>
      </html>
    </>
  );
}

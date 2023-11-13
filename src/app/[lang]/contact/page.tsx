import { WhatsAppButton } from "@/components/button/whatsapp";
import { ZaloButton } from "@/components/button/zalo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  return {
    title: lang === "en" ? "Contact" : "Liên hệ",
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title: lang === "en" ? "Contact" : "Liên hệ - Nông sản Flame",
      url:
        lang === "en"
          ? "https://flameagricultural.com/en/contact"
          : "https://flameagricultural.com/lien-he",
      type: "article",
    },
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { t } = await useTransServer(lang);
  return (
    <div className="container flex flex-col flex-wrap my-2 h-auto min-h-[45vh]">
      <Breadcrumb data={[{ name: t("Contact"), href: "/contact" }]} />
      <div className="flex flex-row flex-wrap gap-6 w-full h-fit font-medium">
        <div className="flex flex-col gap-3 w-fit min-w-[300px]  border-l p-2">
          <div className="flex flex-col gap-1 [&_p]:text-primary/80 [&_a]:w-fit">
            <span className="text-lg font-semibold">{t("NameCompany")}</span>
            <p>
              {t("Tax_Code")}
              {t("TaxCompany")}
            </p>
            <p>
              {t("Address")}
              {t("AddressCompany")}
            </p>
            <p>
              {t("Phone_Number")}
              {t("PhoneCompany")}
            </p>
            <p>
              {t("Email")}
              {t("MailCompany")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-fit min-w-[300px] border-l p-2">
          <span className="text-lg font-semibold ">{t("SocietyNetwork")}</span>
          <div className="flex flex-row flex-wrap w-full gap-3">
            <WhatsAppButton />
            <ZaloButton />
          </div>
        </div>
      </div>
    </div>
  );
}

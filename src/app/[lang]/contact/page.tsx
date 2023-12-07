import { WhatsAppButton } from "@/components/button/whatsapp";
import { ZaloButton } from "@/components/button/zalo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
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
    description:
      lang === "en"
        ? "Contact Flame for discussions, clarification of inquiries, as well as to contribute user opinions aimed at improving the quality of service and products."
        : "Liên hệ với Nông sản Flame để trao đổi, giải đáp thắc mắc cũng như đóng góp ý kiến của người dùng nhằm nâng cao chất lượng dịch vụ, sản phẩm.",
    openGraph: {
      title: lang === "en" ? "Contact" : "Liên hệ - Nông sản Flame",
      description:
        lang === "en"
          ? "Contact Flame for discussions, clarification of inquiries, as well as to contribute user opinions aimed at improving the quality of service and products."
          : "Liên hệ với Nông sản Flame để trao đổi, giải đáp thắc mắc cũng như đóng góp ý kiến của người dùng nhằm nâng cao chất lượng dịch vụ, sản phẩm.",
      url:
        lang === "en"
          ? "https://flameagricultural.com/en/contact"
          : "https://flameagricultural.com/lien-he",
      siteName: lang === "en" ? "Flame Agricultural" : "Nông Sản Flame",
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
    <div className="container flex flex-col flex-wrap mb-5 h-auto min-h-[45vh]">
      <Breadcrumb data={[{ name: t("Contact"), href: "/contact" }]} />
      <div className="flex flex-row flex-wrap gap-6 w-full h-fit font-medium">
        <div className="flex flex-col gap-3 w-fit min-w-[300px]">
          <div className="flex flex-col gap-2 ">
            <span className="text-lg font-semibold text-[#ae6b00] relative block ml-2">
              {t("NameCompany")}
              <span className="absolute -left-4 top-0 h-full w-2 bg-logo rounded-[2px]"></span>
            </span>
            <div className="flex flex-col gap-1 [&_p]:text-primary/80 [&_a]:w-fit border-l pl-2">
              <p>
                <strong>{t("Tax_Code")}:&nbsp;</strong>
                {t("TaxCompany")}
              </p>
              <p>
                <strong>{t("Address")}:&nbsp;</strong>
                {t("AddressCompany")}
              </p>
              <p>
                <strong>{t("Phone_Number")}:&nbsp;</strong>
                {t("PhoneCompany")}
              </p>
              <p>
                <strong>{t("Email")}:&nbsp;</strong>
                {t("MailCompany")}
              </p>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-3 pl-2">
              <WhatsAppButton />
              <ZaloButton />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-lg font-semibold text-[#ae6b00] relative block ml-2">
              {t("ExperienceIssue")}{" "}
              <span className="absolute -left-4 top-0 h-full w-2 bg-logo rounded-[2px]"></span>
            </span>
            <div className="flex flex-col gap-1 [&_p]:text-primary/80 [&_a]:w-fit border-l pl-2">
              <p>
                <strong>{t("Phone_Number")}:&nbsp;</strong>
                {t("PhoneCompany")}&nbsp;-&nbsp;{t("Dev_Phone")}
              </p>
              <p>
                <strong>{t("Email")}:&nbsp;</strong>
                {t("MailCompany")}&nbsp;-&nbsp;{t("Dev_Email")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

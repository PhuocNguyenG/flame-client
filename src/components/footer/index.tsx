import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import { WhatsAppButton } from "../button/whatsapp";
import { ZaloButton } from "../button/zalo";
import { getListCateProduct } from "@/lib/api/server-side";
import { Separator } from "../ui/separator";

export default async function Footer({ lang }: { lang: Locale }) {
  const fetchData = await Promise.all([
    useTransServer(lang),
    getListCateProduct(),
  ]);
  const { t } = fetchData[0];
  const products = fetchData[1].Product;

  return (
    <footer className="flex flex-col w-full h-fit bg-[#140101f2] text-secondary-foreground !pt-5">
      <div className="w-full flex-row hidden md:!flex container [&_h2]:text-primary-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 mb-4">
        <div className="flex flex-col gap-1 max-w-[400px] w-1/3 [&_a]:text-secondary-foreground/80 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit">
          <h2>{t("Products")}</h2>
          {products?.map((item, idx) => {
            const href = lang === "en" ? item.enSlug : item.vnSlug;
            const name = lang === "en" ? item.en : item.vn;

            return (
              <Link href={`/product/${href}`} lang={lang} key={idx}>
                {name}
              </Link>
            );
          })}
          <Link href={"/export"} lang={lang}>
            {t("Export")}
          </Link>
        </div>
        <div className="max-w-[400px] w-1/3  [&_a]:text-secondary-foreground/70 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit">
          <h2>{t("Information")}</h2>
          <Link href={"/introduce"} lang={lang}>
            {t("Introduce")}
          </Link>
        </div>
        <div className="text-right ml-auto w-1/3 [&_a]:text-gray-400 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:w-fit">
          <h2>{t("ContactUs")}</h2>
          <div className="flex flex-row flex-wrap w-full justify-end gap-3">
            <WhatsAppButton />
            <ZaloButton />
          </div>
        </div>
      </div>

      <Accordion
        type="multiple"
        className="container w-full block md:hidden mb-3 [&_svg]:text-primary-foreground"
      >
        <AccordionItem value="AboutUs">
          <AccordionTrigger className="text-primary-foreground text-base uppercase">
            Về chúng tôi
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 text-base text-secondary-foreground/80">
              <Link href={"/introduce"} lang={lang} className="w-fit">
                {t("Introduce")}
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Menu">
          <AccordionTrigger className="text-primary-foreground text-base uppercase">
            Danh mục
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 text-base text-secondary-foreground/80 w-fit">
              {products?.map((item, idx) => {
                const href = lang === "en" ? item.enSlug : item.vnSlug;
                const name = lang === "en" ? item.en : item.vn;

                return (
                  <Link
                    href={`/product/${href}`}
                    lang={lang}
                    key={idx}
                    className="w-fit"
                  >
                    {name}
                  </Link>
                );
              })}
              <Link href={"/export"} lang={lang} className="w-fit">
                {t("Export")}
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="container hidden md:block bg-primary-foreground/40 m-auto my-3 w-10/12" />

      <div className="w-full flex-row flex container [&_h2]:text-primary-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-2 my-3">
        <div className="flex flex-col gap-1 [&_p]:text-secondary-foreground/80 [&_p]:text-sm [&_a]:w-fit">
          <h2>{t("NameCompany")}</h2>
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
      <div className="w-full flex-row hidden sm:flex container text-secondary-foreground/80 mb-2 justify-center">
        ©{new Date().getFullYear()} - {t("NameCompany")}
      </div>
    </footer>
  );
}

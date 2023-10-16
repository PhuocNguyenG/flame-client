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
      <Separator className="container bg-primary-foreground/40 m-auto mb-3" />
      <div className="w-full flex-row hidden md:!flex container [&_h2]:text-primary-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 mb-3">
        <div className="flex flex-col gap-1 [&_p]:text-secondary-foreground/80 [&_a]:w-fit">
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
      <div className="w-full flex-row hidden md:!flex container text-secondary-foreground/80 mb-2 justify-center">
        ©{new Date().getFullYear()} - {t("NameCompany")}
      </div>
      <Accordion type="multiple" className="w-full block md:hidden">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. s animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </footer>
  );
}

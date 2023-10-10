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
import { headers } from "next/headers";
import { WhatsAppButton } from "../button/whatsapp";
import { ZaloButton } from "../button/zalo";

export default async function Footer({ lang }: { lang: Locale }) {
  const headerList = headers();
  const pathname = headerList.get("x-invoke-path") || "";
  const { t } = await useTransServer(lang);

  return (
    <footer className="flex flex-col w-full h-[300px] bg-[#140101f2] mt-5 text-secondary-foreground !pt-5">
      <div className="w-full flex-row hidden md:!flex container [&_h2]:text-primary-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2">
        <div className="max-w-[400px] w-1/3 [&_a]:text-secondary-foreground/70 [&>a:hover]:text-secondary-foreground [&>a:hover]:ml-1 [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit">
          <h2>{t("Products")}</h2>
          <Link
            href={lang === "en" ? "/export" : "/xuat-khau"}
            pathName={pathname}
          >
            {t("Export")}
          </Link>
        </div>
        <div className="max-w-[400px] w-1/3  [&_a]:text-secondary-foreground/70 [&>a:hover]:text-secondary-foreground [&>a:hover]:ml-1 [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit">
          <h2>{t("Information")}</h2>
          <Link href={"/introduce"} pathName={pathname}>
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

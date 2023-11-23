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
import clsx from "clsx";

export default async function Footer({ lang }: { lang: Locale }) {
  const fetchData = await Promise.all([
    useTransServer(lang),
    getListCateProduct(),
  ]);
  const { t } = fetchData[0];
  const products = fetchData[1].Product;

  const informationList = [
    {
      href: "/introduce",
      nameTrans: "Introduce",
    },
    {
      href: "/privacy-policy",
      nameTrans: "PrivacyPolicy",
    },
  ];
  const serviceList = [
    {
      href: "/catering",
      nameTrans: "HomeCatering",
      noteTrans: "OnlyInVietnam",
    },
    // {
    //   href: "/present",
    //   nameTrans: "Present_Footer",
    //   noteTrans: "ComingSoon",
    // },
  ];

  return (
    <footer className="flex flex-col w-full h-fit bg-[#140101f2] text-secondary-foreground !pt-5">
      <div className="w-full flex-row hidden md:!flex container [&_h2]:text-primary-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 mb-4">
        <div className="flex flex-col gap-1 max-w-[400px] w-1/4 [&_a]:text-secondary-foreground/70 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit">
          <h2>{t("Information")}</h2>
          {informationList.map((item) => {
            return (
              <Link href={item.href} lang={lang} key={item.href}>
                {t(item.nameTrans)}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-1 max-w-[400px] w-1/4 [&_a]:text-secondary-foreground/80 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit">
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
          <Link href={lang === "en" ? "/en/export" : "/xuat-khau"} lang={lang}>
            {t("Export")}
          </Link>
        </div>

        <div className="flex flex-col gap-1 max-w-[400px] w-1/4 [&_a]:text-secondary-foreground/70 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:duration-300 [&_a]:w-fit [&_span]:text-secondary-foreground/70 [&_span]:text-[0.825rem] [&_span]:h-fit [&_span]:flex">
          <h2>{t("Services_Footer")}</h2>
          {serviceList.map((item) => {
            return (
              <div
                className={clsx(
                  "flex flex-row flex-wrap items-center gap-x-2 ",
                  {
                    ["[&_span]:opacity-80 [&_span]:leading-3"]: item.noteTrans,
                  }
                )}
                key={item.href}
              >
                <Link href={item.href} lang={lang}>
                  {t(item.nameTrans)}
                </Link>
                {t(item.noteTrans) != "" && <span>({t(item.noteTrans)})</span>}
              </div>
            );
          })}
        </div>

        <div className="text-right ml-auto w-fit [&_a]:text-gray-400 [&>a:hover]:text-secondary-foreground [&_a]:transition-all [&_a]:w-fit">
          <h2>{t("Contact")}</h2>
          <div className="flex flex-row flex-nowrap w-full justify-end gap-3">
            <WhatsAppButton />
            <ZaloButton />
          </div>
        </div>
      </div>
      <Accordion
        type="multiple"
        className="container w-full block md:hidden mb-3 [&_svg]:text-primary-foreground underline-offset-4"
      >
        <AccordionItem value="AboutUs">
          <AccordionTrigger className="text-primary-foreground text-base uppercase">
            {t("AboutUs")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 text-base text-secondary-foreground/80">
              {informationList.map((item) => {
                return (
                  <Link
                    href={item.href}
                    lang={lang}
                    key={item.href}
                    className="w-fit"
                  >
                    {t(item.nameTrans)}
                  </Link>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Menu">
          <AccordionTrigger className="text-primary-foreground text-base uppercase">
            {t("Categories")}
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
              <Link
                href={lang === "en" ? "/en/export" : "/xuat-khau"}
                lang={lang}
                className="w-fit"
              >
                {t("Export")}
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Services">
          <AccordionTrigger className="text-primary-foreground text-base uppercase">
            {t("Services_Footer")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 text-base text-secondary-foreground/80 [&_span]:text-[0.825rem] [&_span]:h-fit [&_span]:flex">
              {serviceList.map((item) => {
                return (
                  <div
                    className={clsx(
                      "flex flex-row flex-wrap items-center gap-x-2 ",
                      {
                        ["[&_span]:opacity-80 [&_span]:leading-3"]:
                          item.noteTrans,
                      }
                    )}
                    key={item.href}
                  >
                    <Link href={item.href} lang={lang}>
                      {t(item.nameTrans)}
                    </Link>
                    {t(item.noteTrans) != "" && (
                      <span>({t(item.noteTrans)})</span>
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="container hidden md:block bg-primary-foreground/20 m-auto my-3 w-10/12" />

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
      <Separator className="w-full bg-primary-foreground/10" />
      <div className="w-full flex-row hidden sm:flex container text-secondary-foreground/80 py-3 justify-center">
        ©{new Date().getFullYear()} - {t("NameCompany")}
      </div>
    </footer>
  );
}

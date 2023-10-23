import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import FlameLogoSimple from "@/assets/logo/flame-logo-simple.png";
import Image from "next/image";
import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useTransClient } from "@/lib/i18n/client";
import HotLine from "./hot-line";
import LogoHeader from "./logo-large";
import SwitchLanguage from "../button/switch-language";
import { useState } from "react";
import { TypeItemCategoryProduct } from "@/lib/type";

export const SideNav = ({
  lang,
  cateProduct,
  cateExport,
}: {
  lang: Locale;
  cateProduct: TypeItemCategoryProduct[];
  cateExport: TypeItemCategoryProduct[];
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTransClient(lang);

  return (
    <>
      <div className="flex flex-row gap-4 mr-1 overscroll-contain">
        <HamburgerMenuIcon
          className="text-primary-foreground min-w-[33px] h-full"
          onClick={() => setOpen(!open)}
        />
        <Link lang={lang} href={"/"} className="h-fit w-fit">
          <Image
            src={FlameLogoSimple}
            alt="Flame logo"
            sizes="45px"
            width={45}
            height={30}
            className="min-w-[45px]"
            unoptimized
          />
        </Link>
      </div>
      <div
        className="z-50 w-screen h-screen top-0 left-0 fixed opacity-0 bg-primary/0 hidden data-[state]:block overscroll-contain pointer-events-auto"
        {...(open ? { "data-state": true } : {})}
        onClick={() => setOpen(false)}
      />

      <div
        className={`flex flex-col z-50 bg-white w-[270px] h-screen p-3 border-r-0 transition-all duration-500 absolute top-0 left-0 px-5 gap-3 overflow-x-hidden overflow-y-scroll overscroll-contain`}
        style={{
          transform: open ? "translateX(0)" : "translateX(-101%)",
        }}
      >
        <LogoHeader lang={lang} className="min-w-[80px] max-w-[80px]" />

        <Accordion
          type="multiple"
          className="w-full h-full mt-1 [&>div]:border-primary  [&_[role=region]]:bg-green-100 [&_[role=region]]:px-0 [&_[role=region]]:rounded-sm [&_[role=region]]:pt-0 [&_[role=region]>div]:flex [&_[role=region]>div]:flex-col [&_[role=region]>div]:gap-0 [&_[role=region]>div]:pb-0 [&_[role=region]>div>a]:text-sm [&_[role=region]>div>a]:py-2 [&_[role=region]>div>a]:px-3 [&_[role=region]>div>a]:border-b [&_[role=region]>div>a:hover]:bg-primary/10 [&_[role=region]>div>a:hover]:rounded-sm [&_[id=simple]]:flex [&_[id=simple]_a]:w-full [&_[id=simple]]:py-3 [&_[id=simple]]:border-primary/10 [&_[id=simple]]:border-b  text-base font-medium"
        >
          <div id="simple">
            <Link href={"/"} lang={lang} onClick={() => setOpen(false)}>
              {t("Home")}
            </Link>
          </div>
          <div id="simple">
            <Link
              href={"/introduce"}
              lang={lang}
              onClick={() => setOpen(false)}
            >
              {t("Introduce")}
            </Link>
          </div>
          <AccordionItem value="Product">
            <AccordionTrigger>{t("Product")}</AccordionTrigger>
            <AccordionContent>
              <Link
                href={"/product"}
                lang={lang}
                onClick={() => setOpen(false)}
              >
                {t("All")}
              </Link>
              {cateProduct?.map((item, idx) => {
                const title = lang === "en" ? item.en : item.vn;
                const cate = lang === "en" ? item.enSlug : item.vnSlug;
                const href = `/product/${cate}`;
                return (
                  <Link
                    href={href}
                    lang={lang}
                    onClick={() => setOpen(false)}
                    key={idx}
                  >
                    {title}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Export">
            <AccordionTrigger>{t("Export")}</AccordionTrigger>
            <AccordionContent>
              <Link href={"/export"} lang={lang} onClick={() => setOpen(false)}>
                {t("All")}
              </Link>
              {cateExport?.map((item, idx) => {
                const title = lang === "en" ? item.en : item.vn;
                const cate = lang === "en" ? item.enSlug : item.vnSlug;
                const href = `/export/${cate}`;
                return (
                  <Link
                    href={href}
                    lang={lang}
                    onClick={() => setOpen(false)}
                    key={idx}
                  >
                    {title}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <div id="simple">
            <Link href={"/contact"} lang={lang} onClick={() => setOpen(false)}>
              {t("ContactUs")}
            </Link>
          </div>
        </Accordion>

        <SwitchLanguage className="flex flex-row w-full" />
        <HotLine lang={lang} />
      </div>
    </>
  );
};

"use client";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
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
import LogoHeader from "./logo-large";
import SwitchLanguage from "../button/switch-language";
import React, { useEffect, useState } from "react";
import { TypeItemCategoryProduct } from "@/lib/type";
import UserSideBarSection from "../user/side-bar-section";
import { usePathname, useSearchParams } from "next/navigation";

const SideNav = React.memo(function SideNav({
  lang,
  cateProduct = [],
  cateExport = [],
  callbackOpenLogin,
}: {
  lang: Locale;
  cateProduct: TypeItemCategoryProduct[];
  cateExport: TypeItemCategoryProduct[];
  callbackOpenLogin: (isOpen: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTransClient(lang);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
      document.getElementById("mask-side-bar")?.classList.add("!translate-x-0");
      document.getElementById("mask-side-bar")?.classList.add("!opacity-70");
    } else {
      document.body.style.overflowY = "unset";
      document.getElementById("mask-side-bar")?.classList.remove("!opacity-70");
      if (
        document
          .getElementById("mask-side-bar")
          ?.classList.contains("!translate-x-0")
      )
        setTimeout(() => {
          document
            .getElementById("mask-side-bar")
            ?.classList.remove("!translate-x-0");
        }, 500);
    }
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <div className="flex flex-row gap-4 mr-1 ">
        <HamburgerMenuIcon
          className="text-primary-foreground min-w-[33px] h-full"
          onClick={() => setOpen(true)}
        />
        <Link lang={lang} href={"/"} className="h-fit w-fit">
          <Image
            priority
            loading="eager"
            src={FlameLogoSimple}
            alt={"Flame logo"}
            sizes="45px"
            width={45}
            height={45}
            className="min-w-[45px] max-w-[45px]"
          />
        </Link>
      </div>
      <div
        id="mask-side-bar"
        className="z-50 w-screen h-full top-0 left-0 fixed opacity-0 bg-primary/50 translate-x-[-101vw] transition-opacity duration-500"
        onClick={() => setOpen(false)}
      />

      <div
        className={`flex flex-col z-50 bg-white w-[270px] h-full p-3 border-r-0 transition-all duration-500 fixed top-0 left-0 px-5 pb-5 gap-4 overflow-x-hidden overflow-y-scroll`}
        style={{
          transform: open ? "translateX(0)" : "translateX(-101%)",
        }}
      >
        <div className="flex flex-row gap-3">
          <LogoHeader lang={lang} className="min-w-[72px] max-w-[70 px]" />
          <div className="flex flex-col justify-center w-fit h-full font-bold text-green-600 leading-8">
            {lang === "en" ? (
              <>
                <p className="text-[2.125rem] text-logo">Flame</p>
                <p className="text-sm text-primary">Agricultural</p>
              </>
            ) : (
              <>
                <p className="text-base text-primary">Nông sản</p>
                <p className="text-[2.125rem] text-logo">Flame</p>
              </>
            )}
          </div>
          <Cross2Icon
            className="w-8 h-8 text-primary rounded-sm fixed top-3 right-3"
            onClick={() => setOpen(false)}
          />
        </div>

        <Accordion
          type="multiple"
          className="w-full h-full [&_button]:font-semibold [&>div]:border-primary [&_[role=region]]:bg-logo/10 [&_[role=region]]:px-0 [&_[role=region]]:rounded-sm [&_[role=region]]:pt-0 [&>[data-state=open]]:border-b-primary/0 [&>[data-state=open]]:transition-all [&>[data-state=open]]:duration-500 [&_[role=region]>div]:flex [&_[role=region]>div]:flex-col [&_[role=region]>div]:gap-0 [&_[role=region]>div]:pb-0 [&_[role=region]>div>a]:text-sm [&_[role=region]>div>a]:py-2 [&_[role=region]>div>a]:px-3 [&_[role=region]>div>a]:border-b last:[&_[role=region]>div>a]:border-none [&_[role=region]>div>a:hover]:bg-primary/10 [&_[role=region]>div>a:hover]:rounded-sm [&_[id=simple]]:flex [&_[id=simple]_a]:w-full [&_[id=simple]]:py-3 [&_[id=simple]]:border-primary/10 [&_[id=simple]]:border-b [&_[id=simple]]:font-semibold text-base font-medium"
        >
          <div id="simple">
            <Link href={"/"} lang={lang}>
              {t("Home")}
            </Link>
          </div>
          <div id="simple">
            <Link href={"/introduce"} lang={lang}>
              {t("Introduce")}
            </Link>
          </div>
          <AccordionItem value="Product">
            <AccordionTrigger>{t("Product")}</AccordionTrigger>
            <AccordionContent>
              <Link href={"/product"} lang={lang}>
                {t("All")}
              </Link>
              {cateProduct?.map((item, idx) => {
                const title = lang === "en" ? item.en : item.vn;
                const cate = lang === "en" ? item.enSlug : item.vnSlug;
                const href = `/product/${cate}`;
                return (
                  <Link href={href} lang={lang} key={idx}>
                    {title}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Export">
            <AccordionTrigger>{t("Export")}</AccordionTrigger>
            <AccordionContent>
              <Link href={"/export"} lang={lang}>
                {t("All")}
              </Link>
              {cateExport?.map((item, idx) => {
                const title = lang === "en" ? item.en : item.vn;
                const cate = lang === "en" ? item.enSlug : item.vnSlug;
                const href = `/export/${cate}`;
                return (
                  <Link href={href} lang={lang} key={idx}>
                    {title}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <div id="simple">
            <Link href={"/contact"} lang={lang}>
              {t("Contact")}
            </Link>
          </div>
        </Accordion>
        {/* <UserSideBarSection
          lang={lang}
          callbackOpenLogin={(isOpen) => callbackOpenLogin(isOpen)}
        /> */}
        <SwitchLanguage className="flex flex-row w-full" />
      </div>
    </>
  );
});

export default SideNav;

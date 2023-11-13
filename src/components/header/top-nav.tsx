"use client"

import Image from "next/image";
import React from "react";
import MapMarkedIcon from "@/assets/icon/map-marked.svg";
import { Separator } from "../ui/separator";
import { Locale } from "@/lib/i18n/setting";
import { useTransClient } from "@/lib/i18n/client";

export default function TopNav({ lang }: { lang: Locale }) {
  const { t } =  useTransClient(lang);
  return (
    <div className="h-[28px] w-full bg-primary max800:hidden">
      <div className="container h-full flex flex-row flex-wrap justify-between items-center text-secondary-foreground text-sm font-medium">
        <div className=""></div>
        <div className="flex flex-row flex-wrap h-full items-center justify-center gap-2 ">
          <Image
            loading="lazy"
            src={MapMarkedIcon}
            alt="Map marker"
            width={18}
            height={18}
            sizes="30"
            className="h-auto opacity-80"
            unoptimized
          />
          <p>{t("AddressDetail")}</p>
          <Separator
            orientation="vertical"
            className="bg-secondary-foreground h-4/6"
          />
        </div>
      </div>
    </div>
  );
}

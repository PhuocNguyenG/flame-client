"use client";
import Image from "next/image";
import React from "react";
import PhoneIcon from "@/assets/icon/phone-call.svg";
import { Locale } from "@/lib/i18n/setting";
import { useTransClient } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

function HotLine({
  lang,
  className,
}: {
  lang: Locale;
  className?: React.HTMLProps<HTMLElement>["className"];
}) {
  const { t } = useTransClient(lang);

  return (
    <div
      className={cn(
        "flex flex-row gap-2 justify-center items-center ",
        className
      )}
    >
      <div>
        <Image
          priority
          loading="eager"
          src={PhoneIcon}
          alt="Hỗ trợ khách hàng"
          sizes="30px"
          width={30}
          height={30}
          className="min-w-[30px]"
          unoptimized
        />
      </div>
      <div>
        <b className="text-[15px] whitespace-nowrap">{t("CustomerSupport")}</b>
        <p className="font-semibold text-[18px] text-red-600">
          {t("PhoneNumber")}
        </p>
      </div>
    </div>
  );
}

export default HotLine;

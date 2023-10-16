"use client";
import React from "react";
import basket from "@/assets/icon/basket.svg";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { useTransClient } from "@/lib/i18n/client";
import { getLangByPathname } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "../link";

const Basket = () => {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger className="transition-all duration-300 min-w-[23px] min-h-[23px]">
          <Link
            href={"/cart"}
            lang={lang}
            className="w-[25px] h-[25px] relative"
          >
            <Badge
              className={`absolute right-[-5px] bottom-[-10px] border border-primary-foreground`}
            >
              0
            </Badge>
            <Image src={basket} alt="Basket" className="w-[25px] h-[25px]" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{t("Basket")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Basket;

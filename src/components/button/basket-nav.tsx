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
import { selectBasket } from "@/lib/redux/slice/basket";
import { useAppSelector } from "@/lib/redux/store";

const Basket = () => {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);
  const counterBasket = useAppSelector(selectBasket).length;
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger
          className="transition-all duration-300 min-w-[23px] min-h-[23px] none-select-text"
          aria-label="0, basket-button"
        >
          <Link
            href={"/basket"}
            lang={lang}
            className="w-[25px] h-[25px] relative block"
          >
            <Badge
              className={`absolute right-[-5px] bottom-[-10px] border border-primary-foreground`}
            >
              {counterBasket}
            </Badge>
            <Image
              priority
              loading="eager"
              src={basket}
              alt="Basket"
              className="max-w-[25px] w-[25px] h-[25px]"
              width={25}
              height={25}
              unoptimized
            />
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

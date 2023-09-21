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
      <Tooltip >
        <TooltipTrigger className="hover:scale-105 transition-all duration-300 min-w-[23px] min-h-[23px]">
          <Link
            href={lang === "en" ? "/cart" : "/gio-hang"}
            pathName={pathname}
            className="w-[23px] h-[23px] relative"
          >
            <Badge className="absolute right-[-10px] bottom-[-10px]">19</Badge>
            <Image src={basket} alt="Basket" className="w-[23px] h-[23px]" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <div>{t("Basket")}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Basket;

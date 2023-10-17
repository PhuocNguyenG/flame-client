"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import WhatsApp from "@/assets/logo/whatsapp-logo.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { usePathname } from "next/navigation";
import { getLangByPathname } from "@/lib/utils";
import { useTransClient } from "@/lib/i18n/client";

export const WhatsAppButton = () => {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);
  return (
    <>
      <Button
        className="bg-[#16BE45]"
        size={"icon"}
        onClick={() => window.open(`https://wa.me/+84973912839`, "_blank")}
      >
        <Image src={WhatsApp} alt="Whatsapp Flame" width={27} height={27} unoptimized/>
      </Button>
    </>
  );
};

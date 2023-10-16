"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Zalo from "@/assets/logo/zalo-logo.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTransClient } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { getLangByPathname } from "@/lib/utils";

export const ZaloButton = () => {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);

  return (
    <>
      <Button
        className="bg-blue-200"
        size={"icon"}
        onClick={() => window.open(`https://zalo.me/0973912839`, "_blank")}
      >
        <Image
          src={Zalo}
          alt="Zalo Flame"
          width={30}
          height={30}
          className="w-full h-full"
        />
      </Button>
    </>
  );
};

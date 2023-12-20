"use client";

import { Button } from "@/components/ui/button";
import Link from "./link";
import { useTransClient } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { getLangByPathname } from "@/lib/utils";
export default function ComingSoon() {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);

  return (
    <div className="h-[500px] flex flex-col justify-center items-center gap-4">
      <div className="font-medium text-lg">{t("ComingSoon")}</div>
      <Button variant={"outline"}>
        <Link href="/" lang={lang} >
          {t("BackToHome")}
        </Link>
      </Button>
    </div>
  );
}

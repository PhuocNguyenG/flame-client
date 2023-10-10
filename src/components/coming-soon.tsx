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
      <h2 className="font-medium text-lg">{t("ComingSoon")}</h2>
      <Button asChild variant={"outline"}>
        <Link href="/" pathName={pathname}>
          {t("BackToHome")}
        </Link>
      </Button>
    </div>
  );
}

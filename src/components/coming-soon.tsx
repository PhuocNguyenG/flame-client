"use client";

import { Button } from "@/components/ui/button";
import Link from "./link";
import { useTransClient } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { getLangByPathname } from "@/lib/utils";
export default function ComingSoon() {
  const pathname = usePathname();
  const lng = getLangByPathname(pathname);
  const { t } = useTransClient(lng);

  return (
    <div className="h-[500px] flex flex-col justify-center items-center gap-4">
      <h2 className="font-medium text-lg">{t("ComingSoon")}</h2>
      <Button variant={"outline"}>
        <Link href="/" lng={lng}>
          {t("BackToHome")}
        </Link>
      </Button>
    </div>
  );
}

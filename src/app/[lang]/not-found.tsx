import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from "next/headers";
import { getLangByPathname } from "@/lib/utils";
import { useTransServer } from "@/lib/i18n/server";
export default async function NotFound() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const lang = getLangByPathname(pathname);
  const { t } = await useTransServer(lang);
  return (
    <div className="h-[500px] flex flex-col justify-center items-center gap-4">
      <h2 className="font-medium text-lg">{t("404")}</h2>
      <Button asChild>
        <Link href="/">{t("BackToHome")}</Link>
      </Button>
    </div>
  );
}

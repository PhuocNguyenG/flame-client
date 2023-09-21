import ExportItem from "@/components/export/item-list";
import LayoutCategory from "@/components/export/layout-list";
import Loading from "@/components/export/loading-item-list";
import { Locale } from "@/lib/i18n/setting";
import { store } from "@/lib/redux/store";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function Page({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return (
    <LayoutCategory lang={lang} pathname={pathname} category={category}>
      <Suspense fallback={<Loading />}>
        <ExportItem lang={lang} pathname={pathname} category={category} />
      </Suspense>
    </LayoutCategory>
  );
}

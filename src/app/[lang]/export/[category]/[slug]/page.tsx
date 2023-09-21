import Loading from "@/app/[lang]/loading";
import ItemDetailExport from "@/components/export/item-detail";
import { Locale } from "@/lib/i18n/setting";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function Page({
  params: { lang, category, slug },
}: {
  params: { lang: Locale; category: string; slug: string };
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ItemDetailExport lang={lang} category={category} slug={slug} />
      </Suspense>
    </>
  );
}

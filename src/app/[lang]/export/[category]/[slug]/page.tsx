import Loading from "@/components/loading/circle-loading";
import ItemDetailExport from "@/components/export/detail-item";
import { Locale } from "@/lib/i18n/setting";
import { Suspense } from "react";

export default function Page({
  params: { lang, category, slug },
}: {
  params: { lang: Locale; category: string; slug: string };
}) {
  return (
    <>
      <div className="container flex flex-col w-full h-full">
        <div className="flex flex-col w-full h-fit  ">
          <ItemDetailExport lang={lang} category={category} slug={slug} />
        </div>
      </div>
    </>
  );
}

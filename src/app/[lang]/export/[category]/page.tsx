import ExportItem from "@/components/export/list-item";
import LayoutCategory from "@/components/export/list-layout";
import { Locale } from "@/lib/i18n/setting";
import { Suspense } from "react";

export default function Page({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}) {

  return (
    <LayoutCategory lang={lang} category={category}>
      <ExportItem lang={lang} category={category} />
    </LayoutCategory>
  );
}

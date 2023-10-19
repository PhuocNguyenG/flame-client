import ExportItem from "@/components/export/list-item";
import LayoutCategory from "@/components/export/list-layout";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Suspense } from "react";
export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const cates = (await getListCateProduct()).Export;

  const result = cates.map((cate) => ({
    category: lang === "en" ? cate.enSlug : cate.vnSlug,
  }));
  return result;
}
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

import ItemDetailExport from "@/components/export/detail-item";
import { Locale } from "@/lib/i18n/setting";
import { Suspense } from "react";
import { getAllExportProduct, getListCateProduct } from "@/lib/api/server-side";

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const fetchData = await Promise.all([getListCateProduct(), getAllExportProduct()]);
  const cates = fetchData[0].Export;
  const exports = fetchData[1];

  const result = exports.map((item) => ({
    category:
      lang === "en"
        ? cates.find((x) => x.enSlug === item.productType)?.enSlug
        : cates.find((x) => x.enSlug === item.productType)?.vnSlug,
    slug: lang === "en" ? item.enSlug : item.vnSlug,
  }));

  return result;
}
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

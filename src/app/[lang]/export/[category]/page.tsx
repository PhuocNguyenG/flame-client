import ExportItem from "@/components/export/list-item";
import LayoutCategory from "@/components/export/list-layout";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
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

export async function generateMetadata({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}): Promise<Metadata> {
  const cates = (await getListCateProduct()).Export.find(
    (cate) => (lang === "en" ? cate.enSlug : cate.vnSlug) === category
  );
  if (!cates) {
    return { title: lang === "en" ? `Export products` : `Sản phẩm xuất khẩu` };
  }
  return {
    title: lang === "en" ? `${cates.en} export` : `${cates.vn} xuất khẩu`,
    description:
      lang === "en"
        ? `Export of ${cates.en.toLowerCase()} products`
        : `Sản phẩm ${cates.vn.toLowerCase()} xuất khẩu | Sản phẩm được chọn lọc và phân phối bởi Nông sản Flame`,
    keywords:
      lang === "en"
        ? `export of ${cates.en} products`
        : `sản phẩm ${cates.vn} xuất khẩu`,
  };
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

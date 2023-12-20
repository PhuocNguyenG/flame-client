import ExportItem from "@/components/pages/export/list-item";
import LayoutCategory from "@/components/pages/export/list-layout";
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
        ? `Export of ${cates.en.toLowerCase()} products | Products exported to countries around the world. Selected and distributed by Flame Agricultural.`
        : `Sản phẩm ${cates.vn.toLowerCase()} xuất khẩu | Sản phẩm xuất khẩu đi các nước trên thế giới. Được chọn lọc và phân phối bởi Nông sản Flame.`,
    keywords:
      lang === "en"
        ? `export of ${cates.en} products`
        : `sản phẩm ${cates.vn} xuất khẩu`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title:
        lang === "en"
          ? `${cates.en.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} export - Flame agricultural`
          : `${cates.vn.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} xuất khẩu - Nông sản Flame`,
      description:
        lang === "en"
          ? `Export of ${cates.en.toLowerCase()} products | Products exported to countries around the world. Selected and distributed by Flame Agricultural.`
          : `Sản phẩm ${cates.vn.toLowerCase()} xuất khẩu | Sản phẩm xuất khẩu đi các nước trên thế giới. Được chọn lọc và phân phối bởi Nông sản Flame.`,
          siteName: lang === "en" ? "Flame Agricultural" : "Nông Sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
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

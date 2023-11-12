import ExportItem from "@/components/pages/export/list-item";
import LayoutCategory from "@/components/pages/export/list-layout";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import { Suspense } from "react";
export async function generateStaticParams({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const cates = (await getListCateProduct()).Export;

  const result = cates.map((cate) => ({
    category: lng === "en" ? cate.enSlug : cate.vnSlug,
  }));
  return result;
}

export async function generateMetadata({
  params: { lng, category },
}: {
  params: { lng: Locale; category: string };
}): Promise<Metadata> {
  const cates = (await getListCateProduct()).Export.find(
    (cate) => (lng === "en" ? cate.enSlug : cate.vnSlug) === category
  );
  if (!cates) {
    return { title: lng === "en" ? `Export products` : `Sản phẩm xuất khẩu` };
  }
  return {
    title: lng === "en" ? `${cates.en} export` : `${cates.vn} xuất khẩu`,
    description:
      lng === "en"
        ? `Export of ${cates.en.toLowerCase()} products | Products exported to countries around the world. Selected and distributed by Flame Agricultural.`
        : `Sản phẩm ${cates.vn.toLowerCase()} xuất khẩu | Sản phẩm xuất khẩu đi các nước trên thế giới. Được chọn lọc và phân phối bởi Nông sản Flame.`,
    keywords:
      lng === "en"
        ? `export of ${cates.en} products`
        : `sản phẩm ${cates.vn} xuất khẩu`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title:
        lng === "en"
          ? `${cates.en.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} export - Flame agricultural`
          : `${cates.vn.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} xuất khẩu - Nông sản Flame`,
      description:
        lng === "en"
          ? `Export of ${cates.en.toLowerCase()} products | Products exported to countries around the world. Selected and distributed by Flame Agricultural.`
          : `Sản phẩm ${cates.vn.toLowerCase()} xuất khẩu | Sản phẩm xuất khẩu đi các nước trên thế giới. Được chọn lọc và phân phối bởi Nông sản Flame.`,
      siteName: lng === "en" ? "Flame agricultural" : "Nông sản Flame",
      locale: lng === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
  };
}

export default function Page({
  params: { lng, category },
}: {
  params: { lng: Locale; category: string };
}) {
  return (
    <LayoutCategory lng={lng} category={category}>
      <ExportItem lng={lng} category={category} />
    </LayoutCategory>
  );
}

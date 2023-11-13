import ExportItem from "@/components/pages/export/list-item";
import LayoutCategory from "@/components/pages/export/list-layout";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: lang === "en" ? `Agricultural exports` : `Nông sản xuất khẩu`,
    description:
      lang === "en"
        ? `Products exported to countries around the world. Selected and distributed by Flame Agricultural Products.`
        : `Các sản phẩm xuất khẩu đi các nước trên thế giới. Được chọn lọc và phân phối bởi Nông sản Flame.`,
    keywords:
      lang === "en"
        ? `export products, agricultural exports`
        : `sản phẩm xuất khẩu, nông sản xuất khẩu`,
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
        lang === "en"
          ? `Agricultural exports - Flame agricultural`
          : `Nông sản xuất khẩu - Nông sản Flame`,
      description:
        lang === "en"
          ? `Products exported to countries around the world. Selected and distributed by Flame Agricultural.`
          : `Các sản phẩm xuất khẩu đi các nước trên thế giới. Được chọn lọc và phân phối bởi Nông sản Flame.`,
      siteName: lang === "en" ? "Flame agricultural" : "Nông sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <LayoutCategory lang={lang}>
      <ExportItem lang={lang} />
    </LayoutCategory>
  );
}

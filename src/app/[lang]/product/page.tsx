import ProductItem from "@/components/pages/product/list-item";
import LayoutProductCategory from "@/components/pages/product/list-layout";
import Loading from "@/components/loading/loading-item-list";
import { Locale } from "@/lib/i18n/setting";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getListCateProduct } from "@/lib/api/server-side";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const cates = (await getListCateProduct()).Product.map((cate) =>
    lang === "en" ? cate.en : cate.vn
  ).join(", ");
  const urlP = `https://flameagricultural.com${
    lang === "en" ? `/en/product` : `/san-pham`
  }`;
  return {
    title: lang === "en" ? `Products` : `Sản phẩm`,
    description:
      lang === "en"
        ? `Agricultural products are provided by the Flame Agricultural brand`
        : `Sản phẩm nông sản được cung cấp bởi thương hiệu Nông sản Flame`,
    keywords: ["Agricultural products", "Sản phẩm nông sản"],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title:
        lang === "en"
          ? `Products - Flame agricultural`
          : `Sản phẩm - Nông sản Flame`,
      description:
        lang === "en"
          ? `All agricultural products are selected and distributed by Flame Agricultural. | ${cates} |`
          : `Tất cả các sản phẩm về nông sản | ${cates} |. Được chọn lọc và phân phối bởi Nông sản Flame.`,
      url: urlP,
      modifiedTime: new Date().toISOString(),
      type: "article",
    },
  };
}

export default function ProductByCate({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <LayoutProductCategory lang={lang} category={"all"}>
      <ProductItem lang={lang} category={"all"} />
    </LayoutProductCategory>
  );
}

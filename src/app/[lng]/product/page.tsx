import ProductItem from "@/components/pages/product/list-item";
import LayoutProductCategory from "@/components/pages/product/list-layout";
import Loading from "@/components/loading/loading-item-list";
import { Locale } from "@/lib/i18n/setting";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getListCateProduct } from "@/lib/api/server-side";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: Locale };
}): Promise<Metadata> {
  const cates = (await getListCateProduct()).Product.map((cate) =>
    lng === "en" ? cate.en : cate.vn
  ).join(", ");
  const urlP = `https://flameagricultural.com${
    lng === "en" ? `/en/product` : `/san-pham`
  }`;
  return {
    title: lng === "en" ? `Products` : `Sản phẩm`,
    description:
      lng === "en"
        ? `Agricultural products are provided by the Flame Agricultural brand`
        : `Sản phẩm nông sản được cung cấp bởi thương hiệu Nông sản Flame`,
    keywords: ["Agricultural products", "Sản phẩm nông sản"],
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
          ? `Products - Flame agricultural`
          : `Sản phẩm - Nông sản Flame`,
      description:
        lng === "en"
          ? `All agricultural products are selected and distributed by Flame Agricultural. | ${cates} |`
          : `Tất cả các sản phẩm về nông sản | ${cates} |. Được chọn lọc và phân phối bởi Nông sản Flame.`,
      url: urlP,
      modifiedTime: new Date().toISOString(),
      type: "article",
    },
  };
}

export default function ProductByCate({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  return (
    <LayoutProductCategory lng={lng} category={"all"}>
      <ProductItem lng={lng} category={"all"} />
    </LayoutProductCategory>
  );
}

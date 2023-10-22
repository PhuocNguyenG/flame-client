import ProductItem from "@/components/product/list-item";
import LayoutProductCategory from "@/components/product/list-layout";
import Loading from "@/components/loading/loading-item-list";
import { Locale } from "@/lib/i18n/setting";
import React, { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: lang === "en" ? `Products` : `Sản phẩm`,
    description:
      lang === "en"
        ? `Agricultural products are provided by the Flame Agricultural brand`
        : `Sản phẩm nông sản được cung cấp bởi thương hiệu Nông sản Flame`,
    keywords: [
      "Agricultural products",
      "Sản phẩm nông sản",
      "san pham nong san",
    ],
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

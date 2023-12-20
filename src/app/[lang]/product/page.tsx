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
        ? `Flame agricultural products provide agricultural products such as ${cates}.`
        : `Nông sản Flame chuyên cung cấp sản phẩm về nông sản như ${cates}.`,
    keywords: ["Agricultural products", "San pham nong san"],
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
          ? `Flame agricultural products provide agricultural products such as ${cates}.`
          : `Nông sản Flame chuyên cung cấp sản phẩm về nông sản như ${cates}.`,
      url: urlP,
      modifiedTime: new Date().toISOString(),
      siteName: lang === "en" ? "Flame Agricultural" : "Nông Sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
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

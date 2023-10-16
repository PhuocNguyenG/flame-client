import ProductItem from "@/components/product/list-item";
import LayoutProductCategory from "@/components/product/list-layout";
import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import React, { Suspense } from "react";

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const cates = (await getListCateProduct()).Product;

  const result = cates.map((cate) => ({
    category: lang === "en" ? cate.enSlug : cate.vnSlug,
  }));
  return result;
}

export default function ProductByCate({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}) {
  return (
    <LayoutProductCategory lang={lang} category={category}>
      <ProductItem lang={lang} category={category} />
    </LayoutProductCategory>
  );
}

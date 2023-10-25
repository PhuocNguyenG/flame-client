import ProductItem from "@/components/product/list-item";
import LayoutProductCategory from "@/components/product/list-layout";
import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
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

export async function generateMetadata({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}): Promise<Metadata> {
  const cates = (await getListCateProduct()).Product.find(
    (cate) => (lang === "en" ? cate.enSlug : cate.vnSlug) === category
  );
  if (!cates) {
    return { title: lang === "en" ? `Products` : `Sản phẩm` };
  }
  return {
    title: lang === "en" ? `${cates.en} products` : `Sản phẩm ${cates.vn}`,
    description:
      lang === "en"
        ? `${cates.en} products | Provided by Flame Agricultural`
        : `Sản phẩm ${cates.vn.toLowerCase()} | Sản phẩm được chọn lọc và phân phối bởi Nông sản Flame`,
    keywords: lang === "en" ? `${cates.en} products` : `Sản phẩm ${cates.vn}`,
  };
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

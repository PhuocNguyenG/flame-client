import ProductItem from "@/components/pages/product/list-item";
import LayoutProductCategory from "@/components/pages/product/list-layout";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import React from "react";

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const cates = (await getListCateProduct()).Product;

  return cates.map((cate) => ({
    category: lang === "en" ? cate.enSlug : cate.vnSlug,
  }));
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

  const urlP = `https://flameagricultural.com${
    lang === "en" ? `/en/product/${cates.enSlug}` : `/san-pham/${cates.vnSlug}`
  }`;

  return {
    title: lang === "en" ? `${cates.en} products` : `Sản phẩm ${cates.vn}`,
    description:
      lang === "en"
        ? `${cates.en} products | Provided by Flame Agricultural`
        : `Sản phẩm ${cates.vn.toLowerCase()} | Sản phẩm được chọn lọc và phân phối bởi Nông sản Flame`,
    robots: {
      index: true,
      follow: true,
    },
    keywords:
      lang === "en"
        ? `${cates.en} products flame agricultural`
        : `Sản phẩm ${cates.vn} nông sản flame`,
    openGraph: {
      title:
        lang === "en"
          ? `${cates.en} products - Flame agricultural`
          : `Sản phẩm ${cates.vn.toLowerCase()} - Nông sản Flame`,
      description:
        lang === "en"
          ? `${cates.en} products | Provided by Flame Agricultural`
          : `Sản phẩm ${cates.vn.toLowerCase()} | Sản phẩm được chọn lọc và phân phối bởi Nông sản Flame`,
      siteName: lang === "en" ? "Flame Agricultural" : "Nông Sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
      url: urlP,
      type: "article",
    },
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

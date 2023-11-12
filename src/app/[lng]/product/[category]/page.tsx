import ProductItem from "@/components/pages/product/list-item";
import LayoutProductCategory from "@/components/pages/product/list-layout";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import React from "react";

export async function generateStaticParams({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const cates = (await getListCateProduct()).Product;

  return cates.map((cate) => ({
    category: lng === "en" ? cate.enSlug : cate.vnSlug,
  }));
}

export async function generateMetadata({
  params: { lng, category },
}: {
  params: { lng: Locale; category: string };
}): Promise<Metadata> {
  const cates = (await getListCateProduct()).Product.find(
    (cate) => (lng === "en" ? cate.enSlug : cate.vnSlug) === category
  );
  if (!cates) {
    return { title: lng === "en" ? `Products` : `Sản phẩm` };
  }

  const urlP = `https://flameagricultural.com${
    lng === "en" ? `/en/product/${cates.enSlug}` : `/san-pham/${cates.vnSlug}`
  }`;

  return {
    title: lng === "en" ? `${cates.en} products` : `Sản phẩm ${cates.vn}`,
    description:
      lng === "en"
        ? `${cates.en} products | Provided by Flame Agricultural`
        : `Sản phẩm ${cates.vn.toLowerCase()} | Sản phẩm được chọn lọc và phân phối bởi Nông sản Flame`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    keywords:
      lng === "en"
        ? `${cates.en} products flame agricultural`
        : `Sản phẩm ${cates.vn}  nông sản flame`,
    openGraph: {
      title:
        lng === "en"
          ? `${cates.en} products - Flame agricultural`
          : `Sản phẩm ${cates.vn.toLowerCase()} - Nông sản Flame`,
      description:
        lng === "en"
          ? `${cates.en} products | Provided by Flame Agricultural`
          : `Sản phẩm ${cates.vn.toLowerCase()} | Sản phẩm được chọn lọc và phân phối bởi Nông sản Flame`,
      url: urlP,
      type: "article",
    },
  };
}

export default function ProductByCate({
  params: { lng, category },
}: {
  params: { lng: Locale; category: string };
}) {
  return (
    <LayoutProductCategory lng={lng} category={category}>
      <ProductItem lng={lng} category={category} />
    </LayoutProductCategory>
  );
}

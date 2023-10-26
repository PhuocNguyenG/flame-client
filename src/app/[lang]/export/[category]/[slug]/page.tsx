import ItemDetailExport from "@/components/export/detail-item";
import { Locale } from "@/lib/i18n/setting";
import { Suspense } from "react";
import {
  getAllExportProduct,
  getDetailExportProduct,
  getListCateProduct,
} from "@/lib/api/server-side";
import { Metadata } from "next";

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const fetchData = await Promise.all([
    getListCateProduct(),
    getAllExportProduct(),
  ]);
  const cates = fetchData[0].Export;
  const exports = fetchData[1];

  const result = exports.map((item) => ({
    category:
      lang === "en"
        ? cates.find((x) => x.enSlug === item.productType)?.enSlug
        : cates.find((x) => x.enSlug === item.productType)?.vnSlug,
    slug: lang === "en" ? item.enSlug : item.vnSlug,
  }));

  return result;
}

export async function generateMetadata({
  params: { lang, category, slug },
}: {
  params: { lang: Locale; category: string; slug: string };
}): Promise<Metadata> {
  const fetchData = await Promise.all([
    getDetailExportProduct(slug, lang),
    getListCateProduct(),
  ]);
  const product = fetchData[0];
  const cates = fetchData[1].Export;

  if (!product) {
    return {};
  }

  const urlP = `https://flameagricultural.com${
    lang === "en"
      ? `/en/export/${
          cates.find((x) => x.enSlug === product.productType)?.enSlug
        }/${product.enSlug}`
      : `/xuat-khau/${
          cates.find((x) => x.enSlug === product.productType)?.vnSlug
        }/${product.vnSlug}`
  }`;

  const listImg = product.listImages
    ? product.listImages.concat(product.banner)
    : [product.banner];

  const listImgResult = listImg.map((img) => {
    return {
      url: img,
    };
  });

  return {
    title: lang === "en" ? product.en.name : product.vn.name,
    description:
      lang === "en"
        ? product.en.description.replace(/<[^>]+>/g, "")
        : product.vn.description.replace(/<[^>]+>/g, ""),
    keywords: [lang === "en" ? product.en.name : product.vn.name],
    openGraph: {
      title: lang === "en" ? product.en.name : product.vn.name,
      description:
        lang === "en"
          ? product.en.description.replace(/<[^>]+>/g, "")
          : product.vn.description.replace(/<[^>]+>/g, ""),
      url: urlP,
      siteName: lang === "en" ? "Flame agricultural" : "Nông sản Flame",
      images: listImgResult,
      locale: lang === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
  };
}

export default function Page({
  params: { lang, category, slug },
}: {
  params: { lang: Locale; category: string; slug: string };
}) {
  return (
    <>
      <div className="container flex flex-col w-full h-full">
        <div className="flex flex-col w-full h-fit  ">
          <ItemDetailExport lang={lang} category={category} slug={slug} />
        </div>
      </div>
    </>
  );
}

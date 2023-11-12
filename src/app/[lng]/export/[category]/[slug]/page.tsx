import ItemDetailExport from "@/components/pages/export/detail-item";
import { Locale } from "@/lib/i18n/setting";
import { Suspense } from "react";
import {
  getAllExportProduct,
  getDetailExportProduct,
  getListCateProduct,
} from "@/lib/api/server-side";
import { Metadata } from "next";

export async function generateStaticParams({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const fetchData = await Promise.all([
    getListCateProduct(),
    getAllExportProduct(),
  ]);
  const cates = fetchData[0].Export;
  const exports = fetchData[1];

  const result = exports.map((item) => ({
    category:
      lng === "en"
        ? cates.find((x) => x.enSlug === item.productType)?.enSlug
        : cates.find((x) => x.enSlug === item.productType)?.vnSlug,
    slug: lng === "en" ? item.enSlug : item.vnSlug,
  }));

  return result;
}

export async function generateMetadata({
  params: { lng, category, slug },
}: {
  params: { lng: Locale; category: string; slug: string };
}): Promise<Metadata> {
  const fetchData = await Promise.all([
    getDetailExportProduct(slug, lng),
    getListCateProduct(),
  ]);
  const product = fetchData[0];
  const cates = fetchData[1].Export;

  if (!product) {
    return {};
  }

  const urlP = `https://flameagricultural.com${
    lng === "en"
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
    title:
      lng === "en"
        ? product.en.name.replace(/[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g, "")
        : product.vn.name.replace(/[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g, ""),
    description:
      lng === "en"
        ? product.en.description.replace(/<[^>]+>/g, "")
        : product.vn.description.replace(/<[^>]+>/g, ""),
    keywords: [lng === "en" ? product.en.name : product.vn.name],
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
          ? `${product.en.name.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} export - Flame agricultural`
          : `${product.vn.name.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} xuất khẩu - Nông sản Flame`,
      description:
        lng === "en"
          ? product.en.description.replace(/<[^>]+>/g, "")
          : product.vn.description.replace(/<[^>]+>/g, ""),
      url: urlP,
      siteName: lng === "en" ? "Flame agricultural" : "Nông sản Flame",
      images: listImgResult,
      locale: lng === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
  };
}

export default function Page({
  params: { lng, category, slug },
}: {
  params: { lng: Locale; category: string; slug: string };
}) {
  return (
    <>
      <div className="container flex flex-col w-full h-full">
        <div className="flex flex-col w-full h-fit  ">
          <ItemDetailExport lng={lng} category={category} slug={slug} />
        </div>
      </div>
    </>
  );
}

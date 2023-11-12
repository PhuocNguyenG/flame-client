import ItemProductDetail from "@/components/pages/product/detail-item";
import {
  getAllProduct,
  getDetailProduct,
  getListCateProduct,
} from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";

export async function generateStaticParams({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const fetchData = await Promise.all([getListCateProduct(), getAllProduct()]);
  const cates = fetchData[0].Product;
  const products = fetchData[1];

  const result = products.map((item) => ({
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
    getDetailProduct(slug, lng),
    getListCateProduct(),
  ]);
  const product = fetchData[0];
  const cates = fetchData[1].Product;

  if (!product) {
    return {};
  }

  const urlP = `https://flameagricultural.com${
    lng === "en"
      ? `/en/product/${
          cates.find((x) => x.enSlug === product.productType)?.enSlug
        }/${product.enSlug}`
      : `/san-pham/${
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
    title: lng === "en" ? product.en.name : product.vn.name,
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
            )} - Flame agricultural`
          : `${product.vn.name.replace(
              /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/g,
              ""
            )} - Nông sản Flame`,
      description:
        lng === "en"
          ? product.en.description.replace(/<[^>]+>/g, "")
          : product.vn.description.replace(/<[^>]+>/g, ""),
      url: urlP,
      images: listImgResult,
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
        <div className=" flex flex-col w-full h-fit">
          <ItemProductDetail lng={lng} category={category} slug={slug} />
        </div>
      </div>
    </>
  );
}

import ItemProductDetail from "@/components/product/detail-item";
import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const fetchData = await Promise.all([getListCateProduct(), getAllProduct()]);
  const cates = fetchData[0].Product;
  const products = fetchData[1];

  const result = products.map((product) => ({
    category:
      lang === "en"
        ? cates.find((x) => x.enSlug === product.productType)?.enSlug
        : cates.find((x) => x.enSlug === product.productType)?.vnSlug,
    slug: lang === "en" ? product.enSlug : product.vnSlug,
  }));

  return result;
}

export default function Page({
  params: { lang, category, slug },
}: {
  params: { lang: Locale; category: string; slug: string };
}) {
  return (
    <>
      <div className="container flex flex-col w-full h-full">
        <div className=" flex flex-col w-full h-fit">
          <ItemProductDetail lang={lang} category={category} slug={slug} />
        </div>
      </div>
    </>
  );
}

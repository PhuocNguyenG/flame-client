import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import { getAllExportProduct, getListCateProduct } from "@/lib/api/server-side";
import Image from "next/image";
import { RootState, store } from "@/lib/redux/store";
import { setSlugProductDetailTrans } from "@/lib/redux/slice/router";
import { useTransServer } from "@/lib/i18n/server";
import { Badge } from "../ui/badge";

export default async function ExportItem({
  lang,
  category = "all",
}: {
  lang: Locale;
  category?: string;
}) {
  const transText = useTransServer(lang);
  const fetchCategory = getListCateProduct();
  const fetchAllProduct = getAllExportProduct();
  const fetchData = await Promise.all([
    fetchCategory,
    fetchAllProduct,
    transText,
  ]);

  const dataCategory = fetchData[0].Export;
  const product = fetchData[1];
  const { t } = fetchData[2];

  const cateSearch = dataCategory.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  })?.enSlug;

  const result =
    category !== "all"
      ? product.filter((item) => item.productType === cateSearch)
      : product;

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 list-none p-0 m-0 ">
        {result?.map((item, idx) => {
          const detail = lang === "en" ? item.en : item.vn;
          const cateObject = dataCategory.find(
            (cate) => cate.enSlug === item.productType
          );
          const categoryName = lang === "en" ? cateObject?.en : cateObject?.vn;

          const href = `/export/${
            lang === "en"
              ? `${cateObject?.enSlug}/${item.enSlug}`
              : `${cateObject?.vnSlug}/${item.vnSlug}`
          }`;
          return (
            <li className="flex h-[340px]" key={idx}>
              <div className="w-full h-full">
                <div className="bg-white rounded-md hover:shadow-md flex flex-col overflow-hidden w-full h-full [&_a:hover]:cursor-pointer border border-transparent hover:border-primary transition-all duration-500 group">
                  <Link
                    href={href}
                    lang={lang}
                    className="w-full min-h-[240px] max-h-[240px] p-3 rounded-md"
                  >
                    <Image
                      loading="lazy"
                      src={item.banner}
                      alt={detail.name}
                      className="w-full h-full object-contain rounded-md duration-500"
                      width={200}
                      height={150}
                    />
                  </Link>

                  <div className="flex-1 px-3 py-1 text-secondary">
                    <div className="flex flex-row flex-wrap text-sm leading-tight font-normal my-1">
                      <Badge
                        variant={"outline"}
                        className="bg-secondary/80 text-secondary-foreground text-[0.8125rem]"
                      >
                        {categoryName}
                      </Badge>
                    </div>
                    <Link
                      href={href}
                      lang={lang}
                      className="flex w-full text-lg font-bold tracking-wide capitalize m-0 line-clamp-2"
                    >
                      {detail.name}
                    </Link>
                    <div className="flex items-center text-lg font-semibold h-8 w-full text-red-500">
                      <div className="text-sm">{t("ContactForPrice")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

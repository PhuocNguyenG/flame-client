import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useTransServer } from "@/lib/i18n/server";

export default async function ProductItem({
  lang,
  category,
}: {
  lang: Locale;
  category: string;
}) {
  const transText = useTransServer(lang);
  const fetchCategory = getListCateProduct();
  const fetchAllProduct = getAllProduct();
  const fetchData = await Promise.all([
    fetchCategory,
    fetchAllProduct,
    transText,
  ]);

  const dataCategory = fetchData[0].Product;
  const product = fetchData[1];
  const { t } = fetchData[2];

  const cateSearch = dataCategory?.find((item) => {
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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3 sm:gap-5 list-none p-0 m-0">
        {result?.map((item, idx) => {
          const cateObject = dataCategory.find(
            (cate) => cate.enSlug === item.productType
          );

          const detail = lang === "en" ? item.en : item.vn;
          const categoryName = lang === "en" ? cateObject?.en : cateObject?.vn;

          const href = `/product/${
            lang === "en"
              ? `${cateObject?.enSlug}/${item.enSlug}`
              : `${cateObject?.vnSlug}/${item.vnSlug}`
          }`;

          return (
            <li
              className="bg-white rounded-md hover:shadow-md flex flex-col overflow-hidden w-full h-full [&_a:hover]:cursor-pointer border border-transparent hover:border-primary transition-all duration-500 group "
              key={idx}
            >
              <Link
                href={href}
                lang={lang}
                className="flex items-center h-full w-full p-3 rounded-md"
              >
                <Image
                  loading="lazy"
                  src={item.banner}
                  alt={detail.name}
                  className="w-full min-h-[160px] h-fit max-h-[220px] object-contain rounded-md duration-500"sizes="(max-width: 800px) 50vw, (max-width: 1060px) 33vw, 25vw"
                  width={200}
                  height={200}
                />
              </Link>
              <div className="flex flex-col justify-between px-3 py-1 text-black">
                <div className="flex flex-row flex-wrap text-sm leading-tight font-normal my-1">
                  <Badge
                    variant={"outline"}
                    className="bg-secondary/70 text-secondary-foreground text-[0.8125rem]"
                  >
                    {categoryName}
                  </Badge>
                </div>
                <Link
                  href={href}
                  lang={lang}
                  className="line-clamp-2 w-full text-base !leading-5 sm:text-lg font-semibold tracking-wide m-0 min-h-[48px] max-h-[48px]"
                >
                  {detail.name}
                </Link>
                <div className="flex items-center text-base  sm:text-base font-semibold h-fit w-full italic">
                  {item.price && item.price > 0 ? (
                    <Link
                      href={href}
                      lang={lang}
                      className="text-price [text-shadow:0px_0px_black]"
                    >
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/gm, ".")}{" "}
                      đ
                    </Link>
                  ) : (
                    <div className="text-price [text-shadow:0px_0px_black]">
                      {t("ContactForPrice")}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

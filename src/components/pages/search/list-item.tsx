"use client";

import { Locale } from "@/lib/i18n/setting";
import Link from "../../link";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { QueryApiSearchByKey } from "@/lib/api/client-side";
import { useTransClient } from "@/lib/i18n/client";
import { TypeItemCategoryProduct } from "@/lib/type";
import { useSearchParams } from "next/navigation";
import LeftFilterProduct from "./left-filter";
import nProgress from "nprogress";

export default function SearchItem({
  lang,
  categories,
}: {
  lang: Locale;
  categories: TypeItemCategoryProduct[];
}) {
  const searchParams = useSearchParams();
  const keyParams = searchParams.get("s") || "";
  const cateParams = searchParams.get("c");

  const { t } = useTransClient(lang);
  const { data = [], isFetching } = QueryApiSearchByKey(keyParams, lang);

  const cateSearch = categories?.find((item) => {
    if (item.vnSlug === cateParams || item.enSlug === cateParams) {
      return item;
    }
  })?.enSlug;

  const result = cateParams
    ? data.filter((item) => item.productType === cateSearch)
    : data;

  /**
   * List cate used in all product fetched
   */
  const cateUsed = [...new Set(data.map(({ productType }) => productType))];

  const cateFilter = categories.filter((item) => {
    return cateUsed.includes(item.enSlug);
  });

  nProgress.done();

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold leading-none tracking-tight text-gray-900 ">
        {t("FindProductWithKey")}
        <span className="font-bold">&quot;{keyParams}&quot;</span>
      </h2>
      <div className="flex flex-row w-full flex-wrap min801:flex-nowrap h-full gap-5">
        <div className="!sticky top-[60px] min-w-[200px] h-fit hidden min801:block ">
          <LeftFilterProduct
            categories={cateFilter}
            category={cateSearch || ""}
            lang={lang}
          />
        </div>
        <section className="w-full">
          <h2 className="mb-5 text-xl font-bold leading-none tracking-tight text-gray-900 ">
            {t("ProductList")}
          </h2>
          <div className="w-full">
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3 sm:gap-5 list-none p-0 m-0">
              {result?.map((item, idx) => {
                const cateObject = categories?.find(
                  (cate) => cate.enSlug === item.productType
                );

                const detail = lang === "en" ? item.en : item.vn;
                const categoryName =
                  lang === "en" ? cateObject?.en : cateObject?.vn;

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
                        className="w-full min-h-[160px] h-fit max-h-[220px] object-contain rounded-md duration-500"
                        sizes="(max-width: 800px) 50vw, (max-width: 1060px) 33vw, 25vw"
                        width={200}
                        height={200}
                      />
                    </Link>
                    <div className="flex flex-col justify-between px-3 py-1 text-black gap-1 min-h-[105px]">
                      <div className="w-full h-fit">
                        <div className="flex flex-row flex-wrap text-sm leading-tight font-normal h-[20px]">
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
                          className="line-clamp-2 w-full text-base sm:text-lg font-semibold tracking-wide capitalize m-0 min-h-[30px] h-fit max-h-[50px]"
                        >
                          {detail.name}
                        </Link>
                      </div>
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
                            {lang === "en" ? "VND" : "đ"}
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
          </div>
        </section>
      </div>
    </>
  );
}

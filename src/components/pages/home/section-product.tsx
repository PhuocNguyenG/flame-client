import {
  getAllExportProduct,
  getAllProduct,
  getListCateProduct,
} from "@/lib/api/server-side";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import Link from "../../link";
import Image from "next/image";
import { Separator } from "../../ui/separator";

export const ProductByCate = async ({ lang }: { lang: Locale }) => {
  const fetchData = await Promise.all([
    useTransServer(lang),
    getListCateProduct(),
    getAllProduct(),
    getAllExportProduct(),
  ]);
  const { t } = fetchData[0];
  const productCates = fetchData[1].Product;
  const exportCates = fetchData[1].Export;
  const productItems = fetchData[2];
  const exportItems = fetchData[3].slice(0, 5);

  return (
    <>
      <div className="relative flex flex-col w-full justify-center items-center overflow-hidden mb-5">
        <div className="relative w-fit h-full rounded-md bg-primary text-primary-foreground px-6 py-1.5 z-[1] font-bold text-lg before:absolute before:top-0 before:-right-[1rem] before:bg-primary before:rounded-md before:h-[37px] before:w-[37px] before:-z-[1] before:rotate-45 after:absolute after:top-0 after:-left-[1rem] after:bg-primary after:rounded-md after:h-[37px] after:w-[37px] after:-z-[1] after:rotate-45">
          {t("Product")}
        </div>
        <div className="absolute top-[calc(48%-1px)] w-full sm:w-2/3 h-1 bg-primary rounded-md transition-all duration-500  "></div>
      </div>
      {productCates?.map((cate, idx) => {
        const cateName = lang === "en" ? cate.en : cate.vn;
        const cateHref = `/product/${
          lang === "en" ? cate.enSlug : cate.vnSlug
        }`;
        const listProduct = productItems?.filter(
          (item) => item.productType === cate.enSlug
        );

        return (
          listProduct?.length >= 1 && (
            <section className="flex flex-col w-full h-fit pb-14 " key={idx}>
              <div className="flex flex-row justify-between items-center w-full border-b-4 border-primary">
                <div className="relative w-fit text-primary-foreground bg-primary px-4 py-1.5 md:py-2.5 text-lg font-bold rounded-t-md before:absolute before:top-0 before:-right-[1.2rem] before:bg-primary before:rounded-tr-sm before:h-[calc(100%)] before:w-3/4 before:skew-x-[40deg] before:z-[1] ">
                  <Link
                    href={cateHref}
                    lang={lang}
                    className="z-[2] relative inline-block"
                  >
                    {cateName}
                  </Link>
                </div>
                {listProduct?.length >= 4 && (
                  <div className="hover:underline hover:underline-offset-2 ">
                    <Link href={cateHref} lang={lang}>
                      {t("More")} {"->"}
                    </Link>
                  </div>
                )}
              </div>
              <div className="h-fit py-4 sm:p-5">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3 sm:gap-5 list-none p-0 m-0">
                  {listProduct?.map((item, idx) => {
                    const detail = lang === "en" ? item.en : item.vn;
                    const price = `${item.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/gm, ".")} đ`;

                    const href = `/product/${
                      lang === "en"
                        ? `${cate?.enSlug}/${item.enSlug}`
                        : `${cate?.vnSlug}/${item.vnSlug}`
                    }`;
                    return (
                      <div
                        className="bg-transparent rounded-md border border-primary/0 hover:border-green-900 flex flex-col justify-between overflow-hidden w-full h-full [&_a:hover]:cursor-pointer shadow-[0px_1px_4px_0px_#0000005d] sm:shadow-[0px_1px_5px_1px_#0000003d] transition-all min-h-[260px] duration-500 group"
                        key={idx}
                      >
                        <Link
                          href={href}
                          lang={lang}
                          className="flex items-center h-full w-full p-3 rounded-md"
                        >
                          <Image
                            priority
                            src={item.banner}
                            alt={detail.name}
                            loading="eager"
                            className="w-full min-h-[160px] h-fit max-h-[220px] object-contain rounded-md duration-500"
                            sizes="(max-width: 800px) 40vw, (max-width: 1060px) 30vw, 20vw"
                            width={200}
                            height={200}
                          />
                        </Link>
                        <div className="flex flex-col justify-between min-h-[85px] px-3 py-1 text-black relative">
                          <Link
                            href={href}
                            lang={lang}
                            className="line-clamp-2 w-full text-base sm:text-lg font-semibold tracking-wide capitalize m-0 min-h-[30px] max-h-[50px]"
                          >
                            {detail.name}
                          </Link>
                          <div className="flex items-center text-base sm:text-base font-semibold h-fit w-full text-price [text-shadow:0px_0px_black] italic">
                            {item.price && item.price > 0 ? (
                              <Link
                                href={href}
                                lang={lang}
                                className="text-price [text-shadow:0px_0px_black]"
                              >
                                {price}
                              </Link>
                            ) : (
                              <>{t("ContactForPrice")}</>
                            )}
                          </div>
                          <div
                            className="absolute w-full rounded-md transition-all bottom-0 left-0 bg-price h-0 group-hover:h-1 duration-200"
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )
        );
      })}
      {exportItems?.length >= 1 && (
        <section className="flex flex-col w-full h-fit pb-14 ">
          <div className="flex flex-row items-center w-full h-full border-b-4 border-primary">
            <div className="relative w-fit text-primary-foreground bg-primary px-4 py-1.5 md:py-2.5 text-lg font-bold rounded-t-md before:absolute before:top-0 before:-right-[1.2rem] before:bg-primary before:rounded-tr-sm before:h-[calc(100%)] before:w-3/4 before:skew-x-[40deg] before:z-[1] h-full">
              <Link
                href={`/export`}
                lang={lang}
                className="z-[2] relative inline-block"
              >
                {t("Export")}
              </Link>
            </div>
            <div className="flex flex-row flex-wrap ml-auto h-full gap-2 w-fit">
              <div className="flex flex-row flex-wrap gap-2 w-fit max480:hidden">
                {exportCates?.slice(0, 2).map((cate, idx) => {
                  const cateName = lang === "en" ? cate.en : cate.vn;
                  const cateHref = `/export/${
                    lang === "en" ? cate.enSlug : cate.vnSlug
                  }`;
                  return (
                    <Link
                      href={cateHref}
                      lang={lang}
                      key={idx}
                      className="hover:underline hover:underline-offset-2 bg-[#dceebf] px-1 rounded-md transition-all"
                    >
                      {cateName}
                    </Link>
                  );
                })}
                {exportCates.length > 2 ? <div>...</div> : ""}
              </div>
              {exportItems?.length >= 4 && (
                <>
                  <Separator
                    orientation={"vertical"}
                    className="bg-primary h-[unset] w-[2px] max480:hidden"
                  />

                  <Link
                    href={`/export`}
                    lang={lang}
                    className="hover:underline hover:underline-offset-2"
                  >
                    {t("More")} {"->"}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="h-fit py-4 sm:p-5">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3 sm:gap-5 list-none p-0 m-0">
              {exportItems?.map((item, idx) => {
                const detail = lang === "en" ? item.en : item.vn;
                const cate = exportCates?.find(
                  (x) => x.enSlug === item.productType
                );
                const href = `/export/${
                  lang === "en"
                    ? cate?.enSlug + "/" + item.enSlug
                    : cate?.vnSlug + "/" + item.vnSlug
                }`;
                return (
                  <div
                    className="bg-transparent rounded-md border border-primary/0 hover:border-primary/60 flex flex-col justify-between overflow-hidden w-full h-full [&_a:hover]:cursor-pointer shadow-[0px_1px_4px_0px_#0000005d] sm:shadow-[0px_1px_5px_1px_#0000003d] transition-all min-h-[260px] group"
                    key={idx}
                  >
                    <Link
                      href={href}
                      lang={lang}
                      className="flex justify-center items-center h-full w-full rounded-md relative p-3"
                    >
                      <Image
                        priority
                        loading="eager"
                        src={item.banner}
                        alt={detail.name}
                        sizes="(max-width: 800px) 40vw, (max-width: 1060px) 30vw, 20vw"
                        className="w-full h-full object-contain rounded-md duration-500"
                        width={200}
                        height={200}
                      />
                    </Link>
                    <div className="flex flex-col justify-between min-h-[85px] px-3 py-1 text-black relative">
                      <Link
                        href={href}
                        lang={lang}
                        className="line-clamp-2 w-full text-base sm:text-lg font-semibold tracking-wide capitalize m-0 min-h-[30px] max-h-[50px]"
                      >
                        {detail.name}
                      </Link>
                      <div className="flex items-center text-base sm:text-base font-semibold h-fit w-full text-price [text-shadow:0px_0px_black] italic">
                        {t("ContactForPrice")}
                      </div>
                      <div
                            className="absolute w-full rounded-md transition-all bottom-0 left-0 bg-price h-0 group-hover:h-1 duration-200"
                          ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

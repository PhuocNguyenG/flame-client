import {
  getAllExportProduct,
  getAllProduct,
  getListCateProduct,
} from "@/lib/api/server-side";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import Image from "next/image";
import { Separator } from "../ui/separator";

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
        <div className="relative w-fit h-full rounded-md bg-primary text-primary-foreground px-6 py-2 z-[1] font-bold text-lg before:absolute before:top-0 before:-right-[1rem] before:bg-primary before:rounded-md before:h-[45px] before:w-[45px] before:-z-[1] before:rotate-45 after:absolute after:top-0 after:-left-[1rem] after:bg-primary after:rounded-md after:h-[45px] after:w-[45px] after:-z-[1] after:rotate-45">
          {t("Product")}
        </div>
        <div className="absolute top-[calc(48%-1px)] w-1/2 h-1 bg-primary rounded-md "></div>
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
            <section className="flex flex-col w-full h-fit mb-14 " key={idx}>
              <div className="flex flex-row justify-between items-center w-full border-b-4 border-primary">
                <div className="relative w-fit text-primary-foreground bg-primary px-4 py-2.5 text-lg font-bold rounded-t-md !before:content-none before:absolute before:top-0 before:-right-[1.2rem] before:bg-primary before:rounded-tr-sm before:h-[calc(100%)] before:w-3/4 before:skew-x-[40deg] before:z-[1] ">
                  <Link
                    href={cateHref}
                    lang={lang}
                    className="z-[2] relative inline-block"
                  >
                    {cateName}
                  </Link>
                </div>
                <div className="hover:underline hover:underline-offset-2 ">
                  <Link href={cateHref} lang={lang}>
                    Xem tất cả {"->"}
                  </Link>
                </div>
              </div>
              <div className="h-fit  p-5">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 list-none p-0 m-0">
                  {listProduct?.map((item, idx) => {
                    const detail = lang === "en" ? item.en : item.vn;
                    const price = `${item.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/gm, ".")} đ`;

                    const href =
                      lang === "en"
                        ? "/product/" + cate?.enSlug + "/" + item.enSlug
                        : "/san-pham/" + cate?.vnSlug + "/" + item.vnSlug;
                    return (
                      <div
                        className="bg-white rounded-md hover:shadow-lg flex flex-col overflow-hidden w-full h-full [&_a:hover]:cursor-pointer border-2 border-primary transition-all"
                        key={idx}
                      >
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
                          <Link
                            href={href}
                            lang={lang}
                            className="flex w-full text-lg font-bold tracking-wide capitalize m-0"
                          >
                            {detail.name}
                          </Link>
                          <div className="flex items-center text-lg font-semibold h-8 w-full text-red-500">
                            {item.price && item.price > 0 ? (
                              <Link href={href} lang={lang} className="">
                                {price}
                              </Link>
                            ) : (
                              <div className="text-sm">
                                {t("ContactForPrice")}
                              </div>
                            )}
                          </div>
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
        <section className="flex flex-col w-full h-fit mb-14 ">
          <div className="flex flex-row items-center w-full h-full border-b-4 border-primary">
            <div className="relative w-fit text-primary-foreground bg-primary px-4 py-2.5 text-lg font-bold rounded-t-md !before:content-none before:absolute before:top-0 before:-right-[1.2rem] before:bg-primary before:rounded-tr-sm before:h-[calc(100%)] before:w-3/4 before:skew-x-[40deg] before:z-[1] h-full">
              <Link
                href={`/export`}
                lang={lang}
                className="z-[2] relative inline-block"
              >
                {t("Export")}
              </Link>
            </div>
            <div className="flex flex-row flex-wrap ml-auto h-full gap-2">
              {exportCates?.map((cate, idx) => {
                const cateName = lang === "en" ? cate.en : cate.vn;
                const cateHref = `/export/${
                  lang === "en" ? cate.enSlug : cate.vnSlug
                }`;
                return (
                  <Link
                    href={cateHref}
                    lang={lang}
                    key={idx}
                    className="hover:underline hover:underline-offset-2 bg-slate-100 px-1 rounded-md transition-all"
                  >
                    {cateName}
                  </Link>
                );
              })}
              <Separator
                orientation={"vertical"}
                className="bg-primary h-[unset] w-[2px]"
              />
              <Link
                href={`/export`}
                lang={lang}
                className="hover:underline hover:underline-offset-2"
              >
                Xem tất cả {"->"}
              </Link>
            </div>
          </div>
          <div className="h-fit  p-5">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 list-none p-0 m-0">
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
                    className="bg-white rounded-md hover:shadow-lg flex flex-col overflow-hidden w-full h-full [&_a:hover]:cursor-pointer border-2 border-primary hover:scale-[1.03] transition-all"
                    key={idx}
                  >
                    <Link
                      href={href}
                      lang={lang}
                      className="w-full min-h-[240px] max-h-[240px] p-3 rounded-md"
                    >
                      <Image
                        loading="eager"
                        src={item.banner}
                        alt={detail.name}
                        className="w-full h-full object-contain rounded-md duration-500"
                        width={200}
                        height={150}
                      />
                    </Link>
                    <div className="flex-1 px-3 py-1 text-secondary">
                      <Link
                        href={href}
                        lang={lang}
                        className="flex w-full text-lg font-bold tracking-wide capitalize m-0"
                      >
                        {detail.name}
                      </Link>
                      <div className="flex items-center text-lg font-semibold h-8 w-full text-red-500">
                        <div className="text-sm">{t("ContactForPrice")}</div>
                      </div>
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

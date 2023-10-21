import { getDetailProduct, getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { setSlugProductDetailTrans } from "@/lib/redux/slice/router";
import { store } from "@/lib/redux/store";
import { BreadcrumbProduct } from "./breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import { CarouselDetailItem } from "./carousel-item-detail";
import { SetStateToClient } from "../set-state-client";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { WhatsAppButton } from "../button/whatsapp";
import { ZaloButton } from "../button/zalo";

export default async function ItemProductDetail({
  lang,
  category,
  slug,
}: {
  lang: Locale;
  category: string;
  slug: string;
}) {
  const transText = useTransServer(lang);
  const fetchCategory = getListCateProduct();
  const fetchProductDetail = getDetailProduct(slug, lang);
  const fetchData = await Promise.all([
    transText,
    fetchProductDetail,
    fetchCategory,
  ]);

  const { t } = fetchData[0];
  const data = fetchData[1];

  if (!data) {
    notFound();
  }
  const categoryObject = fetchData[2].Product.find(
    (cate) => cate.enSlug === data.productType
  );
  const slugExportTrans = {
    en: data.en.name,
    enSlug: data.enSlug,
    vnSlug: data.vnSlug,
    vn: data.vn.name,
  };
  const name = lang === "en" ? data.en.name : data.vn.name;
  const categoryName = lang === "en" ? categoryObject?.en : categoryObject?.vn;
  const origin = lang === "en" ? data.en.origin : data.vn.origin;
  const ingredients = lang === "en" ? data.en.ingredients : data.vn.ingredients;
  const weight = lang === "en" ? data.weight : data.weight;
  const storage = lang === "en" ? data.en.storage : data.vn.storage;
  const howToUse = lang === "en" ? data.en.howToUse : data.vn.howToUse;
  const description = lang === "en" ? data.en.description : data.vn.description;

  return (
    <>
      <SetStateToClient
        dispatch={setSlugProductDetailTrans([slugExportTrans])}
      />
      <BreadcrumbProduct
        lang={lang}
        category={category}
        detailData={slugExportTrans}
      />

      <div className="flex flex-row flex-wrap w-full h-full gap-5 mt-10 mb-10">
        <div className="flex-[1_1_400px] w-1/2 h-fit">
          <CarouselDetailItem
            data={[data.banner].concat(data.listImages || [])}
            alt={name}
          />
        </div>
        <div className="flex-[1_1_300px] w-1/2 h-fit">
          <article className="flex flex-col flex-wrap h-fit w-full">
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 ml-0">
              {name}
            </h2>
            <table className="table-auto text-base font-normal w-full [&_tr]:flex [&_tr]:mb-3 first:[&_tr>td]:font-semibold first:[&_tr>td]:max-w-[140px] first:[&_tr>td]:text-gray-700 first:[&_tr>td]:w-full">
              <tbody>
                {categoryObject && (
                  <tr>
                    <td>{t("Category")}:</td>
                    <td>{categoryName}</td>
                  </tr>
                )}
                <tr>
                  <td>{t("Origin")}:</td>
                  <td>{origin}</td>
                </tr>
                <tr>
                  <td>{t("Ingredients")}:</td>
                  <td>{ingredients}</td>
                </tr>
                {weight && (
                  <tr>
                    <td>{t("Weight")}:</td>
                    <td>{weight}</td>
                  </tr>
                )}
                {data.available && (
                  <tr>
                    <td>{t("Status")}:</td>
                    <td>
                      {data.available ? t("InStock") : t("ProductComing")}
                    </td>
                  </tr>
                )}
                {storage && (
                  <tr>
                    <td>{t("Preserve")}:</td>
                    <td>
                      <div
                        className=" inline-block"
                        dangerouslySetInnerHTML={{ __html: storage }}
                      />
                    </td>
                  </tr>
                )}
                {howToUse && (
                  <tr>
                    <td>{t("HowToUse")}:</td>
                    <td>
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{ __html: howToUse }}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {data?.price > 0 && (
              <div className="flex flex-row items-center">
                {t("Price")}:&nbsp;
                <div className="font-semibold text-xl">
                  {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/gm, ".")}{" "}
                  đ
                </div>
              </div>
            )}
            <div className="flex flex-row flex-wrap w-full mt-5">
              {data?.price > 0 ? (
                // <Button variant={"default"}>
                //   Thêm vào giỏ
                // </Button>
                <div className="flex flex-wrap items-center">
                  <Popover>
                    <PopoverTrigger className="bg-primary text-primary-foreground rounded-md px-2 py-1 font-medium">
                      {t("ContactUs")}
                    </PopoverTrigger>
                    <PopoverContent className="bg-primary">
                      <div className="flex flex-row flex-wrap w-fit gap-3 ">
                        <WhatsAppButton />
                        <ZaloButton />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <div className="flex flex-wrap items-center">
                  <Popover>
                    <PopoverTrigger className="bg-primary text-primary-foreground rounded-md px-2 py-1 font-medium">
                      {t("ContactUs")}
                    </PopoverTrigger>
                    <PopoverContent className="bg-primary">
                      <div className="flex flex-row flex-wrap w-fit gap-3 ">
                        <WhatsAppButton />
                        <ZaloButton />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
      <div className="mx-auto w-full lg:w-4/5 mb-10">
        <h2 className="text-xl">{t("Description")}:</h2>
        <div
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </>
  );
}

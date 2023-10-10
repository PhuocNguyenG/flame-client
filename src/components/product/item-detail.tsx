import { getDetailProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { setSlugProductDetailTrans } from "@/lib/redux/slice/router";
import { store } from "@/lib/redux/store";
import { BreadcrumbProduct } from "./breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import { CarouselDetailItem } from "./carousel-item-detail";
import { SetStateToClient } from "../set-state-client";

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
  const fetchExportDetail = getDetailProduct(slug, lang);
  const fetchData = await Promise.all([transText, fetchExportDetail]);

  const { t } = fetchData[0];
  const data = fetchData[1];
  if (!data) {
    notFound();
  }
  const exportSlugExportTrans = {
    en: data.en.name,
    enSlug: data.enSlug,
    vnSlug: data.vnSlug,
    vn: data.vn.name,
  };
  const name = lang === "en" ? data.en.name : data.vn.name;
  const origin = lang === "en" ? data.en.origin : data.vn.origin;
  const ingredients = lang === "en" ? data.en.ingredients : data.vn.ingredients;
  const storage = lang === "en" ? data.en.storage : data.vn.storage;
  const howToUse = lang === "en" ? data.en.howToUse : data.vn.howToUse;
  const description = lang === "en" ? data.en.description : data.vn.description;

  return (
    <>
      <SetStateToClient
        dispatch={setSlugProductDetailTrans([exportSlugExportTrans])}
      />
      <div className="ml-4">
        <BreadcrumbProduct
          lang={lang}
          category={category}
          detailData={exportSlugExportTrans}
        />
      </div>

      <div className="flex flex-row flex-wrap w-full h-full gap-5 mt-10 mb-10">
        <div className="flex-[1_1_400px] w-1/2 h-fit">
          <CarouselDetailItem
            data={[data.banner].concat(data.listImages || [])}
            alt={name}
          />
        </div>
        <div className="flex-[1_1_300px] w-1/2 h-fit">
          <article className="flex flex-col flex-wrap h-fit w-full">
            <h2 className="mb-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 text-center ml-0">
              {name}
            </h2>

            <p className="text-base">
              {t("Origin")}:&nbsp;&nbsp;{origin}
            </p>

            <p className="text-base">
              {t("Ingredients")}:&nbsp;&nbsp;
              {ingredients}
            </p>

            {storage && (
              <div className="text-base">
                {t("Preserve")}:&nbsp;&nbsp;
                <div
                  className=" inline-block"
                  dangerouslySetInnerHTML={{ __html: storage }}
                />
              </div>
            )}
            {howToUse && (
              <div className="text-base">
                {t("HowToUse")}:&nbsp;&nbsp;
                <div
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: howToUse }}
                />
              </div>
            )}
          </article>
        </div>
      </div>
      <div className="mx-auto w-full lg:w-4/5">
        <h2 className="text-xl">{t("Description")}:</h2>
        <div
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </>
  );
}

import { getDetailExportProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { setSlugExportTrans } from "@/lib/redux/slice/router";
import { store } from "@/lib/redux/store";
import { BreadcrumbExport } from "./breadcrumb";
import { useTransServer } from "@/lib/i18n/server";

export default async function ItemDetailExport({
  lang,
  category,
  slug,
}: {
  lang: Locale;
  category: string;
  slug: string;
}) {
  const transText = useTransServer(lang);
  const fetchExportDetail = getDetailExportProduct(slug, lang);
  const fetchData = await Promise.all([transText, fetchExportDetail]);

  const { t } = fetchData[0];
  const data = fetchData[1];
  const exportRouterTrans = {
    en: data?.en.name,
    enSlug: data?.enSlug,
    vnSlug: data?.vnSlug,
    vn: data?.vn.name,
  };
  store.dispatch(setSlugExportTrans([exportRouterTrans]));

  return (
    <>
      <BreadcrumbExport
        lang={lang}
        category={category}
        detailData={exportRouterTrans}
      />

      {/* <h2 className="mb-5 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl text-center ml-0 min-[850px]:ml-[180px] ">
        {t("ExportProduct")}
      </h2> */}
      <div className="flex flex-row w-full h-full">
        <div className="w-full h-full pl-3"></div>
      </div>
    </>
  );
}
